from pathlib import Path
p=Path('src/components/blossom/scene.js');s=p.read_text().replace("powerPreference:'low-power'","powerPreference:'high-performance'").replace('  const textures=await Promise.all','  const petalPromise=loader.loadAsync(\'/loader/materials/sakura-tissue.webp\').catch(()=>null);\n  const textures=await Promise.all');s=s.replace("  let petalTexture=null;\n  try {petalTexture=await loader.loadAsync('/loader/materials/sakura-tissue.webp');\n    petalTexture.colorSpace=SRGBColorSpace;petalTexture.anisotropy=4;} catch { /* Use pink tissue fallback. */ }","  const petalTexture=await petalPromise;\n  if(petalTexture) {petalTexture.colorSpace=SRGBColorSpace;petalTexture.anisotropy=4;}")
s=s.replace('  function render(elapsed,fallTime,reduced) {','''  let previousTime,frameSum=0,frameSamples=0,qualityChanges=0;
  function render(elapsed,fallTime,reduced) {
    // Lower fill cost when the real device cannot keep pace. Ignore long tab stalls.
    const frameMs=previousTime===undefined ? 0 : (elapsed-previousTime)*1000;
    previousTime=elapsed;
    if(!reduced && frameMs>0 && frameMs<150 && qualityChanges<2) {
      frameSum+=frameMs;frameSamples++;
      if(frameSamples>=48) {
        if(frameSum/frameSamples>28) {
          renderer.setPixelRatio(Math.max(.85,renderer.getPixelRatio()*.75));
          renderer.setSize(window.innerWidth,window.innerHeight,false);qualityChanges++;
        }
        frameSum=0;frameSamples=0;
      }
    }''')
# Dispose the shared petal material only once.
s=s.replace('instanced.forEach(mesh=>{mesh.geometry.dispose();mesh.material.dispose();mesh.dispose();});','instanced.forEach(mesh=>{mesh.geometry.dispose();if(mesh.material!==tissue)mesh.material.dispose();mesh.dispose();});\n      tissue.dispose();')
p.write_text(s)
p=Path('scripts/blossom-model.test.mjs');s=p.read_text().replace('wood.dispose();Object.values(maps).forEach(map=>map.dispose());',''' const blossom=petalMaterial(maps.color);
 assert.equal(blossom.map,maps.color);assert.equal(blossom.isMeshPhysicalMaterial,true);
 const variants=Array.from({length:5},(_,variant)=>petalGeometry(variant));
 assert.equal(new Set(variants.map(g=>JSON.stringify(Array.from(g.getAttribute('position').array)))).size,5);
 variants.forEach(g=>g.dispose());blossom.dispose();
 wood.dispose();Object.values(maps).forEach(map=>map.dispose());''');p.write_text(s)
p=Path('src/components/blossom/README.md');s=p.read_text().replace('Direction','Direction');s=s.replace('an inexpensive scattering approximation','a light-dependent scattering approximation').replace('Flower size, orientation, opening, petal angle and stamen height vary.','Five different curved petal meshes share a generated botanical tissue map and MeshPhysicalMaterial with subtle sheen. Twenty-four fine stamens model each flower center. Studio environment reflections, a directional key, a rear rim and a 1K soft shadow map provide depth between overlapping petals. Flower size, orientation, opening, petal angle and stamen height vary.');s+='''
## Generated material asset

`public/loader/materials/sakura-tissue.webp` was generated with the built-in imagegen tool and packaged as WebP. It is an opaque surface color map projected onto individual curved petals, never a flower sprite or scene image. The source PNG is retained in the Codex generated-images directory; the runtime asset is committed with the project.

Final prompt:

> Use case: photorealistic-natural. Asset type: opaque square albedo surface texture for a real curved 3D cherry blossom petal, NOT a flower picture or scene. Create a flat evenly lit macro scan of pale pink sakura petal tissue filling the entire square edge to edge. No silhouette, no background, no object edges. Base of the petal is the bottom center of the image: deeper dusty rose pigment only in the lowest 18 percent, softly fading into delicate blush pink translucent-looking tissue above. Extremely fine irregular branching capillary veins fan from bottom center outward toward top and sides, subtle biological cellular grain, faint natural uneven pigment, soft ivory pink at upper edge. Real botanical photographic detail, no painted or illustrated texture, no hard dark lines, no directional highlights, no shadows, no text, no borders, no stamens. Full-bleed tissue color map for physically based rendering.

Texture requests run concurrently. Shared meshes and materials limit draw calls; runtime frame sampling can lower pixel ratio twice when a device averages above 28 ms per frame. Texture loading, simulation and lighting remain independent of homepage scrolling. The new material plus existing bark maps total about 1.16 MB. Frame rate depends on browser and hardware.
''';s=s.replace('The runtime asset is committed with the project.','The runtime asset is included in the project.').replace('the runtime asset is committed with the project.','the runtime asset is included in the project.');p.write_text(s)
