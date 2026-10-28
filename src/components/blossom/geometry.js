import { BufferGeometry, DoubleSide, Float32BufferAttribute, MeshStandardMaterial, MeshPhysicalMaterial, Vector2, Vector3 } from 'three';
import { curvePoint } from './tree.js';

export function branchGeometry(branch,segments=branch.parent===-1 ? 54 : 30,sides=18) {
  const positions=[],normals=[],uvs=[],fractions=[],angles=[],indices=[];
  for(let row=0;row<=segments;row++) {
    const t=row/segments,p=curvePoint(branch.points,t);
    const before=new Vector3(...curvePoint(branch.points,Math.max(0,t-.001)));
    const after=new Vector3(...curvePoint(branch.points,Math.min(1,t+.001)));
    const tangent=after.sub(before).normalize();
    const n=new Vector3().crossVectors(new Vector3(0,0,1),tangent).normalize();
    const b=new Vector3().crossVectors(tangent,n).normalize();
    const radius=branch.radius[0]*(1-t)+branch.radius[1]*t;
    for(let side=0;side<=sides;side++) {
      const angle=side/sides*Math.PI*2;
      const outward=n.clone().multiplyScalar(Math.cos(angle)).addScaledVector(b,Math.sin(angle));
      positions.push(p[0]+outward.x*radius,p[1]+outward.y*radius,p[2]+outward.z*radius);
      normals.push(outward.x,outward.y,outward.z);uvs.push(side/sides,t);
      fractions.push(t);angles.push(angle);
      if(row<segments && side<sides) {
        const a=row*(sides+1)+side,c=a+sides+1;
        indices.push(a,a+1,c,c,a+1,c+1);
      }
    }
  }
  const geometry=new BufferGeometry();
  geometry.setAttribute('position',new Float32BufferAttribute(positions,3));
  geometry.setAttribute('normal',new Float32BufferAttribute(normals,3));
  geometry.setAttribute('uv',new Float32BufferAttribute(uvs,2));
  geometry.setAttribute('aFraction',new Float32BufferAttribute(fractions,1));
  geometry.setAttribute('aAngle',new Float32BufferAttribute(angles,1));
  geometry.setIndex(indices);geometry.computeBoundingSphere();
  return geometry;
}

export function branchMaterial(branch, maps={}) {
  const material=new MeshStandardMaterial({color:maps.color ? 0x54433b : 0x30241f,roughness:.92,envMapIntensity:.22,metalness:0,map:maps.color ?? null,normalMap:maps.normal ?? null,roughnessMap:maps.roughness ?? null,normalScale:new Vector2(.65,.65)});
  const growth={value:0},windTime={value:0};material.userData.growth=growth;material.userData.windTime=windTime;
  material.onBeforeCompile=(shader)=>{
    Object.assign(shader.uniforms,{
      uGrowth:growth,uWindTime:windTime,uBaseTaper:{value:branch.parent===-1 ? 1 : 0},uRadius:{value:new Vector2(...branch.radius)},
      uP0:{value:new Vector3(...branch.points[0])},uP1:{value:new Vector3(...branch.points[1])},
      uP2:{value:new Vector3(...branch.points[2])},uP3:{value:new Vector3(...branch.points[3])},
    });
    shader.vertexShader=shader.vertexShader.replace('#include <common>', `
      #include <common>
      attribute float aFraction;
      attribute float aAngle;
      uniform float uGrowth;
      uniform float uBaseTaper;
      uniform float uWindTime;
      uniform vec2 uRadius;
      uniform vec3 uP0,uP1,uP2,uP3;
      varying vec2 vBarkUv;
    `).replace('#include <beginnormal_vertex>', `
      float bt = aFraction * uGrowth;
      float bu = 1.0 - bt;
      vec3 centre = bu*bu*bu*uP0 + 3.0*bu*bu*bt*uP1 + 3.0*bu*bt*bt*uP2 + bt*bt*bt*uP3;
      float branchLength = length(uP3-uP0);
      float bow = branchLength*0.035;
      centre.y += bow*sin(3.14159265*bt)*(0.6*sin(16.0*bt)+0.4*sin(7.0*bt));
      centre.z += branchLength*0.01*sin(3.14159265*bt)*sin(9.0*bt);
      vec3 derivative=3.0*bu*bu*(uP1-uP0)+6.0*bu*bt*(uP2-uP1)+3.0*bt*bt*(uP3-uP2);
      derivative.y += bow*(3.14159265*cos(3.14159265*bt)*(0.6*sin(16.0*bt)+0.4*sin(7.0*bt))
        +sin(3.14159265*bt)*(9.6*cos(16.0*bt)+2.8*cos(7.0*bt)));
      derivative.z += branchLength*0.01*(3.14159265*cos(3.14159265*bt)*sin(9.0*bt)+9.0*sin(3.14159265*bt)*cos(9.0*bt));
      vec3 tangent=normalize(derivative);
      vec3 basisN = normalize(cross(vec3(0.0,0.0,1.0),tangent));
      vec3 basisB = normalize(cross(tangent,basisN));
      vec3 outward = cos(aAngle)*basisN + sin(aAngle)*basisB;
      vec3 objectNormal = outward;
    `).replace('#include <begin_vertex>', `
      float radial = mix(uRadius.x,uRadius.y,pow(bt,0.85));
      radial *= mix(1.0,smoothstep(0.0,0.065,bt),uBaseTaper);
      radial *= smoothstep(0.0,0.22,uGrowth) * (1.0-smoothstep(0.88,1.0,aFraction));
      radial *= 1.0 + 0.065*sin(aAngle*5.0+bt*18.0) + 0.025*sin(aAngle*11.0-bt*42.0);
      float knot=exp(-pow((bt-0.29)*42.0,2.0)-pow(sin(aAngle-1.2)*3.0,2.0));
      knot+=0.65*exp(-pow((bt-0.56)*48.0,2.0)-pow(sin(aAngle+0.6)*3.0,2.0));
      radial *= 1.0+knot*0.32;
      if (uWindTime >= 0.0) {
        float windWeight=smoothstep(-7.0,5.0,centre.x);
        centre.y += 0.045*windWeight*sin(uWindTime*0.8+centre.x*0.7);
        centre.z += 0.065*windWeight*sin(uWindTime*0.55+centre.x*0.5);
      }
      vec3 transformed = centre + outward*radial;
      vBarkUv = vec2(aAngle / 6.283185, bt*length(uP3-uP0));
    `);
    // Follow the growing centreline: bark retains its scale as each limb extends.
    shader.vertexShader=shader.vertexShader.replace('#include <uv_vertex>', `
      #include <uv_vertex>
      vec2 woodUv=vec2(uv.x, aFraction*uGrowth*length(uP3-uP0)*0.8);
      #ifdef USE_MAP
        vMapUv=woodUv;
      #endif
      #ifdef USE_NORMALMAP
        vNormalMapUv=woodUv;
      #endif
      #ifdef USE_ROUGHNESSMAP
        vRoughnessMapUv=woodUv;
      #endif
    `);
  };
  material.customProgramCacheKey=()=> 'growing-wood-pbr-v4';
  return material;
}

// Several botanical petal shapes share the same surface material, avoiding cloned flowers.
export function petalGeometry(variant=0) {
  const positions=[],uvs=[],indices=[];
  const across=24,along=28;
  const skew=Math.sin(variant*2.7)*.035;
  for(let row=0;row<=along;row++) for(let col=0;col<=across;col++) {
    const v=row/along,u=col/across*2-1;
    // Broad shoulders and a shallow apical notch, with a narrow attachment neck.
    const width=Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(v,.78))),.64)*(.44+variant*.018);
    const x=u*width*(1+.025*Math.sin(v*7+variant))+skew*v*v;
    const cleft=.055*Math.exp(-u*u*28)*Math.pow(v,9);
    const y=v-cleft+.008*Math.sin(u*5+variant)*v;
    const cup=.08+variant*.018;
    const z=cup*v*v+.07*u*u*Math.sin(Math.PI*v)-.025*Math.sin(Math.PI*v)
      +.010*Math.sin(v*9+u*3+variant)*v+.008*Math.sin(u*7+variant)*v*v;
    positions.push(x,y,z);
    // Project the scanned tissue without squeezing the vein pattern along every row.
    uvs.push(.5+x/1.05,Math.max(0,Math.min(1,y)));
    if(row<along && col<across) {
      const a=row*(across+1)+col,b=a+across+1;
      indices.push(a,a+1,b,a+1,b+1,b);
    }
  }
  const geometry=new BufferGeometry();
  geometry.setAttribute('position',new Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new Float32BufferAttribute(uvs,2));
  geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
export function petalMaterial(map=null) {
  const material=new MeshPhysicalMaterial({color:map ? 0xf0bacd : 0xf3becf,map,roughness:.63,
    side:DoubleSide,metalness:0,sheen:.18,sheenColor:0xffe7ee,sheenRoughness:.85,
    specularIntensity:.28,envMapIntensity:.35});
  material.onBeforeCompile=(shader)=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 vPetalUv;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\nvPetalUv=uv;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vPetalUv;')
      .replace('#include <color_fragment>', `
        #include <color_fragment>
        #ifndef USE_MAP
          diffuseColor.rgb *= mix(vec3(0.70,0.36,0.48),vec3(1.0),smoothstep(0.0,0.48,vPetalUv.y));
        #endif
      `).replace('#include <opaque_fragment>', `
        // Thin tissue transmits a broad lobe from lights behind it. Unlike an emissive
        // edge glow this follows the real scene lights and the flower's orientation.
        #if NUM_DIR_LIGHTS > 0
          vec3 viewDirection=normalize(vViewPosition);
          for(int lightIndex=0;lightIndex<NUM_DIR_LIGHTS;lightIndex++) {
            vec3 scatteringDirection=normalize(directionalLights[lightIndex].direction+normal*0.35);
            float scatter=pow(max(0.0,dot(viewDirection,-scatteringDirection)),3.0);
            float thinness=mix(0.28,0.75,smoothstep(0.1,0.8,vPetalUv.y));
            outgoingLight+=diffuseColor.rgb*directionalLights[lightIndex].color*scatter*thinness*0.16;
          }
        #endif
        #include <opaque_fragment>
      `);
  };
  material.customProgramCacheKey=()=> 'sakura-physical-tissue-v4';return material;
}
