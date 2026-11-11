import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { motion, AnimatePresence } from "motion/react";
import { CONTINENTS_DATA, getContinentAt } from "../assets/data/continentSkillsData";

const RADIUS = 82;
const DOT_SIZE = 1.9;

const MotionDiv = motion.div;

/**
 * Converts latitude and longitude in degrees to a 3D Vector3 on a sphere of radius R.
 */
function latLonToVector3(lat, lon, r = RADIUS) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(latRad) * Math.sin(lonRad),
    r * Math.sin(latRad),
    r * Math.cos(latRad) * Math.cos(lonRad)
  );
}

/**
 * Recovers { lat, lon } from a 3D point on a sphere of radius R.
 */
function vector3ToLatLon(v, r = RADIUS) {
  const lat = Math.asin(Math.max(-1, Math.min(1, v.y / r))) * (180 / Math.PI);
  const lon = Math.atan2(v.x, v.z) * (180 / Math.PI);
  return { lat, lon };
}

/**
 * Calculates smooth interpolated rotation along the geographical sequence of continents.
 */
function getScrollInterpolatedRotation(progress) {
  const total = CONTINENTS_DATA.length - 1;
  const scaled = Math.max(0, Math.min(total, progress * total));
  const idx = Math.min(total - 1, Math.floor(scaled));
  const f = scaled - idx;
  const s = f * f * (3 - 2 * f); // Smoothstep

  const c1 = CONTINENTS_DATA[idx];
  const c2 = CONTINENTS_DATA[Math.min(total, idx + 1)];

  return {
    rotX: c1.rotX + (c2.rotX - c1.rotX) * s,
    rotY: c1.rotY + (c2.rotY - c1.rotY) * s,
    activeContinent: CONTINENTS_DATA[Math.min(total, Math.round(scaled))],
  };
}

/**
 * Computes responsive positions for skill logos across Desktop, Tablet & Mobile.
 */
function computeSkillPositions(count, width, height) {
  const isDesktop = width >= 1180;
  const isTablet = width >= 768 && width < 1180;
  const cx = width / 2;
  const cy = height / 2;

  if (isDesktop) {
    // Large Desktop: Crescent arc on right side of centered globe
    const arcRadius = 220;
    const angleSpan = count === 2 ? 48 : count === 3 ? 72 : count === 4 ? 92 : 106;
    const startAngle = -angleSpan / 2;
    const step = count > 1 ? angleSpan / (count - 1) : 0;

    return Array.from({ length: count }, (_, i) => {
      const angleDeg = count === 1 ? 0 : startAngle + i * step;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + arcRadius * Math.cos(angleRad) * 1.08;
      const y = cy + arcRadius * Math.sin(angleRad);
      return { x, y, isDesktop: true, isTablet: false };
    });
  } else if (isTablet) {
    // Tablet: Compact crescent arc preventing any right-edge overflow
    const arcRadius = 168;
    const angleSpan = count === 2 ? 40 : count === 3 ? 62 : count === 4 ? 80 : 94;
    const startAngle = -angleSpan / 2;
    const step = count > 1 ? angleSpan / (count - 1) : 0;

    return Array.from({ length: count }, (_, i) => {
      const angleDeg = count === 1 ? 0 : startAngle + i * step;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + arcRadius * Math.cos(angleRad) * 1.04;
      const y = cy + arcRadius * Math.sin(angleRad);
      return { x, y, isDesktop: true, isTablet: true };
    });
  } else {
    // Mobile: Skills positioned neatly below the upper-centered globe
    const startY = Math.min(270, height * 0.54);

    return Array.from({ length: count }, (_, i) => {
      if (count <= 3) {
        const stepX = Math.min(96, (width - 32) / count);
        const startX = cx - ((count - 1) * stepX) / 2;
        return {
          x: startX + i * stepX,
          y: startY + 20,
          isDesktop: false,
          isTablet: false,
        };
      } else {
        const countRow0 = count === 4 ? 2 : 3;
        const countRow1 = count - countRow0;
        const row = i < countRow0 ? 0 : 1;
        const col = i < countRow0 ? i : i - countRow0;
        const countInRow = row === 0 ? countRow0 : countRow1;

        const stepX = Math.min(92, (width - 32) / countInRow);
        const startX = cx - ((countInRow - 1) * stepX) / 2;

        return {
          x: startX + col * stepX,
          y: startY + row * 76,
          isDesktop: false,
          isTablet: false,
        };
      }
    });
  }
}

const InteractiveGlobe = ({
  activeContinent,
  onSelectContinent,
  scrollProgress = 0,
}) => {
  const mountRef = useRef(null);
  const globeGroupRef = useRef(null);
  const coreSphereRef = useRef(null);
  const instancedMeshRef = useRef(null);
  const dotContinentMapRef = useRef([]);
  const dotCountRef = useRef(0);
  const animationFrameRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  // Mesh handles for exact 3D beacon tracking
  const beaconMeshesRef = useRef({});
  const activeContinentRef = useRef(activeContinent);
  const currentActiveIdRef = useRef(activeContinent?.id);

  // Screen-projected continent marker positions
  const [projectedMarkers, setProjectedMarkers] = useState([]);
  const [activeBeaconPos, setActiveBeaconPos] = useState({ x: 0, y: 0, isFacing: true });
  const beaconRef = useRef({ x: 0, y: 0 });

  // Stage dimensions tracking for SVG alignment
  const [dimensions, setDimensions] = useState({ width: 900, height: 560 });

  // Drag & Click interaction state
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const hasMovedSignificantlyRef = useRef(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isTransitioningRef = useRef(false);

  const currentIndex = CONTINENTS_DATA.findIndex((c) => c.id === activeContinent?.id);
  const total = CONTINENTS_DATA.length;

  // Keep activeContinentRef in sync and immediately calculate new beacon position
  useEffect(() => {
    activeContinentRef.current = activeContinent;
    if (!activeContinent) return;

    currentActiveIdRef.current = activeContinent.id;
    const mesh = beaconMeshesRef.current[activeContinent.id];
    if (mesh && cameraRef.current) {
      const v = new THREE.Vector3();
      mesh.getWorldPosition(v);
      const isFacing = v.z > -10;
      v.project(cameraRef.current);
      const curW = dimensions.width;
      const curH = dimensions.height;
      const sx = (v.x * 0.5 + 0.5) * curW;
      const sy = (-(v.y * 0.5) + 0.5) * curH;
      beaconRef.current = { x: sx, y: sy };
      setActiveBeaconPos({ x: sx, y: sy, isFacing });
    }
  }, [activeContinent, dimensions.width, dimensions.height]);

  // Update dot colors when active continent changes
  const updateDotColors = useCallback(() => {
    const mesh = instancedMeshRef.current;
    if (!mesh || !mesh.instanceColor) return;

    const activeId = activeContinent?.id;
    const activeColorObj = activeId
      ? new THREE.Color(activeContinent?.color || 0xffffff)
      : null;
    const defaultWhite = new THREE.Color(0xf5f5ff);
    const dimmedWhite = new THREE.Color(0x282836);

    for (let i = 0; i < dotCountRef.current; i++) {
      const cId = dotContinentMapRef.current[i];
      if (activeId) {
        if (cId === activeId) {
          mesh.setColorAt(i, activeColorObj);
        } else {
          mesh.setColorAt(i, dimmedWhite);
        }
      } else {
        mesh.setColorAt(i, defaultWhite);
      }
    }
    mesh.instanceColor.needsUpdate = true;
  }, [activeContinent]);

  // Synchronize dot colors
  useEffect(() => {
    updateDotColors();
  }, [updateDotColors]);

  // Interpolate rotation smoothly as the user scrolls through all 8 domains
  useEffect(() => {
    if (isDraggingRef.current || isTransitioningRef.current || !globeGroupRef.current) return;

    const { rotX, rotY } = getScrollInterpolatedRotation(scrollProgress);
    gsap.to(globeGroupRef.current.rotation, {
      x: rotX,
      y: rotY,
      duration: 0.35,
      ease: "power1.out",
      overwrite: "auto",
    });
  }, [scrollProgress]);

  // Handle direct continent selection via click
  useEffect(() => {
    if (!activeContinent || !globeGroupRef.current) return;

    isTransitioningRef.current = true;
    const targetX = activeContinent.rotX;
    const targetY = activeContinent.rotY;

    const currentY = globeGroupRef.current.rotation.y;
    const twoPi = Math.PI * 2;
    let diffY = (targetY - currentY) % twoPi;
    if (diffY > Math.PI) diffY -= twoPi;
    if (diffY < -Math.PI) diffY += twoPi;
    const finalY = currentY + diffY;

    gsap.to(globeGroupRef.current.rotation, {
      x: targetX,
      y: finalY,
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });
  }, [activeContinent]);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;
    setDimensions({ width, height });

    const isMob = width < 768;
    const isTablet = width >= 768 && width < 1180;

    // 1. Scene & Camera (Responsive Z-distance and Y-offset)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const initialCameraZ = isMob ? 320 : isTablet ? 275 : 255;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, initialCameraZ);
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Globe Container Group (Offset vertically on mobile)
    const globeGroup = new THREE.Group();
    globeGroup.position.y = isMob ? 26 : 0;
    globeGroup.rotation.x = CONTINENTS_DATA[0].rotX;
    globeGroup.rotation.y = CONTINENTS_DATA[0].rotY;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 4. Dark Obsidian Core Sphere
    const coreSphereGeo = new THREE.SphereGeometry(RADIUS * 0.992, 48, 48);
    const coreSphereMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreSphereRef.current = coreSphere;
    globeGroup.add(coreSphere);

    // 5. Generate Procedural Dotted Continents matching reference image
    const dotsData = [];
    for (let lat = 82; lat >= -82; lat -= 2.5) {
      const cosLat = Math.cos((lat * Math.PI) / 180);
      const step = Math.max(2.5, 2.5 / (cosLat || 0.1));
      for (let lon = -180; lon < 180; lon += step) {
        const continent = getContinentAt(lat, lon);
        if (continent) {
          dotsData.push({
            pos: latLonToVector3(lat, lon, RADIUS),
            continentId: continent.id,
          });
        }
      }
    }

    const totalDots = dotsData.length;
    dotCountRef.current = totalDots;
    dotContinentMapRef.current = dotsData.map((d) => d.continentId);

    const dotGeo = new THREE.PlaneGeometry(DOT_SIZE, DOT_SIZE);
    const dotMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.96,
    });
    const instancedMesh = new THREE.InstancedMesh(dotGeo, dotMat, totalDots);
    instancedMeshRef.current = instancedMesh;

    const dummy = new THREE.Object3D();
    const whiteColor = new THREE.Color(0xf8f8ff);

    for (let i = 0; i < totalDots; i++) {
      const { pos } = dotsData[i];
      dummy.position.copy(pos);
      dummy.lookAt(pos.clone().multiplyScalar(2));
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, whiteColor);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.instanceColor.needsUpdate = true;
    globeGroup.add(instancedMesh);

    // 6. 3D Continent Beacons (Clean subtle glowing dots)
    const beaconsGroup = new THREE.Group();
    globeGroup.add(beaconsGroup);

    CONTINENTS_DATA.forEach((c) => {
      const pos = latLonToVector3(c.center.lat, c.center.lon, RADIUS * 1.015);
      
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(1.8, 16, 16),
        new THREE.MeshBasicMaterial({ color: c.color })
      );
      dot.position.copy(pos);
      beaconsGroup.add(dot);
      beaconMeshesRef.current[c.id] = dot;

      const ringGeo = new THREE.RingGeometry(2.2, 3.4, 20);
      const ringMat = new THREE.MeshBasicMaterial({
        color: c.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.002));
      ring.lookAt(pos.clone().multiplyScalar(2));
      beaconsGroup.add(ring);
    });

    // 7. Outer Atmospheric Rim Glow
    const haloGeo = new THREE.SphereGeometry(RADIUS * 1.035, 40, 40);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.8);
          gl_FragColor = vec4(0.85, 0.90, 1.0, 1.0) * intensity * 0.42;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // 8. Animation & Screen Projection Loop
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Inertia when dragging
      if (isDraggingRef.current && globeGroup) {
        globeGroup.rotation.x += velocityRef.current.x;
        globeGroup.rotation.y += velocityRef.current.y;
      }

      renderer.render(scene, camera);

      // Project 3D continent marker positions into 2D screen space
      const currentWidth = container.clientWidth || width;
      const currentHeight = container.clientHeight || height;
      const markers = [];
      const currentActive = activeContinentRef.current;
      let activeBeacon = null;

      CONTINENTS_DATA.forEach((c) => {
        const mesh = beaconMeshesRef.current[c.id];
        if (!mesh) return;

        mesh.getWorldPosition(tempVec);
        const isFacing = tempVec.z > -12;

        if (isFacing) {
          tempVec.project(camera);
          const screenX = (tempVec.x * 0.5 + 0.5) * currentWidth;
          const screenY = (-(tempVec.y * 0.5) + 0.5) * currentHeight;

          if (currentActive && c.id === currentActive.id) {
            activeBeacon = { x: screenX, y: screenY, isFacing: true };
          }

          markers.push({
            id: c.id,
            name: c.name,
            color: c.color,
            x: screenX,
            y: screenY,
            continent: c,
          });
        }
      });

      // Synchronize active continent's beacon position
      if (activeBeacon) {
        if (
          currentActive?.id !== currentActiveIdRef.current ||
          Math.hypot(activeBeacon.x - beaconRef.current.x, activeBeacon.y - beaconRef.current.y) > 0.4
        ) {
          currentActiveIdRef.current = currentActive?.id;
          beaconRef.current = { x: activeBeacon.x, y: activeBeacon.y };
          setActiveBeaconPos(activeBeacon);
        }
      }

      setProjectedMarkers(markers);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // 9. Resize Observer for dynamic multi-breakpoint responsive adaptation
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW && newH && rendererRef.current && cameraRef.current) {
          setDimensions({ width: newW, height: newH });

          const mob = newW < 768;
          const tab = newW >= 768 && newW < 1180;

          if (globeGroupRef.current) {
            globeGroupRef.current.position.y = mob ? 26 : 0;
          }
          if (cameraRef.current) {
            cameraRef.current.position.z = mob ? 320 : tab ? 275 : 255;
            cameraRef.current.aspect = newW / newH;
            cameraRef.current.updateProjectionMatrix();
          }
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreSphereGeo.dispose();
      coreSphereMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
    };
  }, []);

  // Raycast on direct 3D globe click
  const handleGlobeClick = (e) => {
    if (hasMovedSignificantlyRef.current) return;
    const container = mountRef.current;
    if (!container || !cameraRef.current || !coreSphereRef.current || !globeGroupRef.current) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const intersects = raycaster.intersectObject(coreSphereRef.current);

    if (intersects.length > 0) {
      const hitPoint = intersects[0].point.clone();
      hitPoint.applyEuler(
        new THREE.Euler(-globeGroupRef.current.rotation.x, -globeGroupRef.current.rotation.y, 0, "YXZ")
      );

      const { lat, lon } = vector3ToLatLon(hitPoint);
      const continent = getContinentAt(lat, lon);

      if (continent) {
        onSelectContinent(continent);
      } else {
        let nearestContinent = null;
        let minDistance = 32;
        CONTINENTS_DATA.forEach((c) => {
          const dLat = c.center.lat - lat;
          const dLon = c.center.lon - lon;
          const dist = Math.hypot(dLat, dLon);
          if (dist < minDistance) {
            minDistance = dist;
            nearestContinent = c;
          }
        });
        if (nearestContinent) {
          onSelectContinent(nearestContinent);
        }
      }
    }
  };

  // Pointer Handlers for 3D rotation
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    isTransitioningRef.current = false;
    hasMovedSignificantlyRef.current = false;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !globeGroupRef.current) return;

    const totalDist = Math.hypot(
      e.clientX - dragStartPosRef.current.x,
      e.clientY - dragStartPosRef.current.y
    );
    if (totalDist > 6) {
      hasMovedSignificantlyRef.current = true;
    }

    const deltaX = e.clientX - previousPointerPosRef.current.x;
    const deltaY = e.clientY - previousPointerPosRef.current.y;
    previousPointerPosRef.current = { x: e.clientX, y: e.clientY };

    const rotSpeed = 0.005;
    globeGroupRef.current.rotation.y += deltaX * rotSpeed;
    globeGroupRef.current.rotation.x = Math.max(
      -Math.PI / 2.3,
      Math.min(Math.PI / 2.3, globeGroupRef.current.rotation.x + deltaY * rotSpeed)
    );

    velocityRef.current = { x: deltaY * rotSpeed * 0.5, y: deltaX * rotSpeed * 0.5 };
  };

  const handlePointerUp = (e) => {
    if (isDraggingRef.current && !hasMovedSignificantlyRef.current) {
      handleGlobeClick(e);
    }
    isDraggingRef.current = false;
  };

  // Skill positions calculation for active continent
  const skillPositions = useMemo(() => {
    if (!activeContinent?.skills) return [];
    return computeSkillPositions(
      activeContinent.skills.length,
      dimensions.width,
      dimensions.height
    );
  }, [activeContinent, dimensions.width, dimensions.height]);

  // Precise connection origin coordinates from active continent beacon
  const originX = activeBeaconPos.x || dimensions.width / 2;
  const originY = activeBeaconPos.y || dimensions.height / 2;

  return (
    <div
      className="relative w-full h-[470px] xs:h-[500px] sm:h-[540px] md:h-[580px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden touch-none mx-auto"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 1. 3D WebGL Globe Canvas (Centered / Responsive) */}
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* 2. Ambient Atmosphere Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(139,92,246,0.05)_40%,transparent_75%)] pointer-events-none -z-10 blur-2xl" />

      {/* =========================================================================
          3. CLEAN CONTINENT BEACON DOTS ON 3D GLOBE (Zero Pills, Zero Cards)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {projectedMarkers.map((marker) => {
          const isActive = activeContinent?.id === marker.id;

          return (
            <button
              key={marker.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectContinent(marker.continent);
              }}
              style={{
                left: `${marker.x}px`,
                top: `${marker.y}px`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer transition-transform duration-200 hover:scale-130"
              title={`${marker.name} - Click to focus`}
            >
              <span
                className={`absolute -inset-1 rounded-full animate-ping ${
                  isActive ? "opacity-90" : "opacity-40 group-hover:opacity-80"
                }`}
                style={{ backgroundColor: marker.color }}
              />

              <div
                className={`relative rounded-full border border-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all ${
                  isActive ? "w-3 h-3 scale-110" : "w-2.5 h-2.5 opacity-85 group-hover:opacity-100"
                }`}
                style={{ backgroundColor: marker.color }}
              >
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          4. DOMAIN INFO PANEL (Left Side on Desktop/Tablet, Top Badge on Mobile)
          ========================================================================= */}
      {/* Desktop & Tablet Left Panel */}
      <div className="hidden md:flex absolute left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 top-1/2 -translate-y-1/2 max-w-[210px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-[300px] flex-col items-start text-left pointer-events-none z-20">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase font-semibold"
            style={{ color: activeContinent?.color }}
          >
            0{currentIndex + 1} / 0{total} • {activeContinent?.name}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: activeContinent?.color }}
          />
        </div>

        <h3 className="font-[tango] text-xl md:text-2xl lg:text-3xl text-white tracking-wide leading-tight mb-2">
          {activeContinent?.domain}
        </h3>

        <p className="text-xs lg:text-sm text-neutral-400 font-medium leading-relaxed mb-4 line-clamp-3">
          {activeContinent?.tagline}
        </p>

        {/* 8-Step Continental Domain Progress Indicators */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {CONTINENTS_DATA.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onSelectContinent(c)}
              className="h-1 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === currentIndex ? "22px" : "6px",
                backgroundColor: i === currentIndex ? activeContinent?.color : "rgba(255,255,255,0.2)",
              }}
              title={c.domain}
            />
          ))}
        </div>
      </div>

      {/* Mobile Top Domain Header & Progress Dots */}
      <div className="md:hidden absolute top-1 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20 w-full px-3">
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span
            className="text-[9px] font-mono tracking-[0.16em] uppercase font-semibold"
            style={{ color: activeContinent?.color }}
          >
            0{currentIndex + 1} / 0{total} • {activeContinent?.name}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: activeContinent?.color }}
          />
        </div>
        <h3 className="font-[tango] text-base xs:text-lg text-white tracking-wide leading-tight">
          {activeContinent?.domain}
        </h3>

        {/* Mobile 8-step progress dots */}
        <div className="flex items-center justify-center gap-1 mt-1 pointer-events-auto">
          {CONTINENTS_DATA.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onSelectContinent(c)}
              className="h-1 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === currentIndex ? "18px" : "4px",
                backgroundColor: i === currentIndex ? activeContinent?.color : "rgba(255,255,255,0.25)",
              }}
              title={c.domain}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          5. ANIMATED SVG CONSTELLATION CONNECTION LINES
          Curves directly from the continent beacon on the 3D globe to each skill logo
          ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-15"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`beamGlow-${activeContinent?.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render animated curved branches from continent beacon to each skill */}
        {activeContinent?.skills?.map((_, i) => {
          const target = skillPositions[i];
          if (!target) return null;

          const isDesktop = target.isDesktop;
          let cp1x, cp1y, cp2x, cp2y;

          if (isDesktop) {
            const deltaX = target.x - originX;
            const deltaY = target.y - originY;
            cp1x = originX + deltaX * 0.45;
            cp1y = originY + deltaY * 0.08;
            cp2x = originX + deltaX * 0.75;
            cp2y = target.y;
          } else {
            const deltaX = target.x - originX;
            const deltaY = target.y - originY;
            cp1x = originX + deltaX * 0.12;
            cp1y = originY + deltaY * 0.45;
            cp2x = target.x;
            cp2y = originY + deltaY * 0.85;
          }

          const pathD = `M ${originX} ${originY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${target.x} ${target.y}`;

          return (
            <g key={`svg-branch-${activeContinent?.id}-${i}`}>
              {/* Outer soft glowing beam */}
              <motion.path
                key={`glow-${activeContinent?.id}-${i}`}
                d={pathD}
                fill="none"
                stroke={activeContinent?.color}
                strokeWidth="3.2"
                strokeOpacity="0.22"
                filter={`url(#beamGlow-${activeContinent?.id})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.22 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              />

              {/* Crisp core laser beam */}
              <motion.path
                key={`core-${activeContinent?.id}-${i}`}
                d={pathD}
                fill="none"
                stroke={activeContinent?.color}
                strokeWidth="1.6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              />

              {/* Traveling animated pulse dot along the path */}
              <motion.path
                key={`pulse-${activeContinent?.id}-${i}`}
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="6 26"
                animate={{ strokeDashoffset: [-64, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />

              {/* Terminal target ring on the skill contact edge */}
              <motion.circle
                key={`circ-inner-${activeContinent?.id}-${i}`}
                cx={target.x}
                cy={target.y}
                r="3.5"
                fill={activeContinent?.color}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.3 }}
              />
              <motion.circle
                key={`circ-outer-${activeContinent?.id}-${i}`}
                cx={target.x}
                cy={target.y}
                r="6.5"
                fill="none"
                stroke={activeContinent?.color}
                strokeWidth="1.2"
                strokeOpacity="0.6"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.6, 1] }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
              />
            </g>
          );
        })}

        {/* Emitter anchor rings at the continent beacon origin on the 3D globe */}
        <circle cx={originX} cy={originY} r="3.5" fill={activeContinent?.color} />
        <circle
          cx={originX}
          cy={originY}
          r="7.5"
          fill="none"
          stroke={activeContinent?.color}
          strokeWidth="1.4"
          strokeOpacity="0.6"
        />
      </svg>

      {/* =========================================================================
          6. PURE FLOATING TECH LOGOS & NAMES (Zero Cards, Zero Box Containers)
          ========================================================================= */}
      <AnimatePresence mode="wait">
        <MotionDiv
          key={activeContinent?.id}
          className="absolute inset-0 pointer-events-none z-20"
        >
          {activeContinent?.skills?.map((skill, i) => {
            const target = skillPositions[i];
            if (!target) return null;

            const isDesktop = target.isDesktop;
            const isTablet = target.isTablet;

            return (
              <motion.div
                key={`${activeContinent?.id}-${skill.name}`}
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: isDesktop ? -18 : 0,
                  y: isDesktop ? 0 : -18,
                }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.16 + i * 0.06,
                  ease: [0.34, 1.56, 0.64, 1], // Spring bounce
                }}
                style={{
                  position: "absolute",
                  left: `${target.x}px`,
                  top: `${target.y}px`,
                  transform: isDesktop ? "translate(0, -50%)" : "translate(-50%, 0)",
                }}
                className={`group flex ${
                  isDesktop ? "flex-row items-center gap-2.5 sm:gap-3" : "flex-col items-center gap-1"
                } cursor-default select-none pointer-events-auto`}
              >
                {/* Tech Logo with Colored Glow Halo (No Card Container) */}
                <div
                  className={`relative flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 shrink-0 ${
                    isDesktop
                      ? isTablet
                        ? "w-11 h-11 p-2"
                        : "w-12 h-12 lg:w-14 lg:h-14 p-2 sm:p-2.5"
                      : "w-10 h-10 xs:w-11 xs:h-11 p-1.5"
                  }`}
                  style={{
                    boxShadow: `0 0 18px -2px ${activeContinent?.glowColor}`,
                    borderColor: `${activeContinent?.color}50`,
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                    style={{
                      filter: `drop-shadow(0 0 6px ${activeContinent?.glowColor})`,
                    }}
                  />
                </div>

                {/* Skill Name & Subtitle Tag */}
                <div className={`flex flex-col ${isDesktop ? "text-left" : "text-center items-center"}`}>
                  <span
                    className={`font-semibold text-white tracking-wide group-hover:text-[#f05038] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                      isDesktop
                        ? isTablet
                          ? "text-xs max-w-[130px] truncate"
                          : "text-xs sm:text-sm whitespace-nowrap"
                        : "text-[10px] xs:text-[11px] leading-tight max-w-[80px] xs:max-w-[88px] truncate"
                    }`}
                  >
                    {skill.name}
                  </span>
                  <span
                    className={`font-mono uppercase tracking-wider text-neutral-400 ${
                      isDesktop
                        ? isTablet
                          ? "text-[8px] max-w-[130px] truncate"
                          : "text-[9px] sm:text-[10px] whitespace-nowrap"
                        : "text-[7.5px] xs:text-[8px] max-w-[80px] xs:max-w-[88px] truncate"
                    }`}
                  >
                    {skill.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default InteractiveGlobe;
