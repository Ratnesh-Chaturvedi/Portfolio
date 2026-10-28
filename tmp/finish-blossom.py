from pathlib import Path
p=Path('src/components/blossom/scene.js');s=p.read_text();renderer="  const renderer=new WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});\n";s=s.replace(renderer,'');s=s.replace('  const loader=new TextureLoader();',renderer+'  const loader=new TextureLoader();');s=s.replace('bark-${name}.jpg','bark-${name}.webp').replace('SphereGeometry(.023,7,5)','SphereGeometry(.017,7,5)');p.write_text(s)
p=Path('src/components/blossom/geometry.js');s=p.read_text().replace('.025*Math.sin(u*13+v*8)*v*v','.008*Math.sin(u*9+v*8)*v*v').replace('.018*Math.sin(v*11+u*5)*v','.009*Math.sin(v*11+u*5)*v');p.write_text(s)
p=Path('src/components/blossom/README.md');p.write_text('''# 3D blossom loader

The branch and blossoms are actual Three.js geometry: tapered curved tubes, five individually curved petals per flower, stems, calyx, fine filaments and pollen anthers. No branch photographs or flower billboards are rendered.

Branches use locally hosted bark color, OpenGL normal and roughness maps from [Poly Haven Bark Brown 01](https://polyhaven.com/a/bark_brown_01), distributed under [CC0](https://polyhaven.com/license). The 1K source maps are packed as WebP in `public/loader/materials/`; all limbs share these textures. UV coordinates follow the growing centreline, keeping the bark scale stable during extension. These are surface maps on real 3D tubes, not a substitute for branch geometry. Failed texture requests fall back to an untextured wood material.

Petals have asymmetrical curvature, a notched edge, subtle rippling, pink basal pigmentation, fine veins and tissue grain. Directional key and rim lighting plus an inexpensive scattering approximation soften the opaque appearance without a transmission render pass. Flower size, orientation, opening, petal angle and stamen height vary.

Each limb grows independently; forks begin when the parent reaches their attachment point. After page load, fonts and hero decoding complete, bloomed flowers detach at staggered times, accelerating downward with drag and independent sway, drift, rocking and rotation. Breeze positions remain continuous at release. Flowers leave the viewport before the bare branch scene fades to the homepage.

The intro dynamically loads Three.js, uses shared instanced flowers, caps pixel ratio and releases textures, meshes and its WebGL context after completion. It supports reduced motion, session skipping, a skip button, `?intro=replay`, and a homepage fallback when WebGL is unavailable.

Run `npm run test:loader` for attachment timing, curved mesh geometry, shared material maps and continuous falling motion. Browser checks cover desktop/mobile rendering, reduced motion, delayed page assets, skipping and unavailable WebGL. Device performance determines the actual frame rate.
''')
