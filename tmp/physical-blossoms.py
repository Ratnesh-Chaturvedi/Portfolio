from pathlib import Path
p=Path('src/components/blossom/geometry.js');s=p.read_text().replace('MeshStandardMaterial, Vector2','MeshStandardMaterial, MeshPhysicalMaterial, Vector2').replace('sides=12','sides=18').replace('0x514139','0x786356').replace('roughness:.92,metalness:0','roughness:.92,envMapIntensity:.22,metalness:0');a=s.index('export function petalGeometry()');s=s[:a]+'''// Several botanical petal shapes share the same surface material, avoiding cloned flowers.
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
  const material=new MeshPhysicalMaterial({color:map ? 0xffffff : 0xf3becf,map,roughness:.63,
    side:DoubleSide,metalness:0,sheen:.18,sheenColor:0xffe7ee,sheenRoughness:.85,
    specularIntensity:.28,envMapIntensity:.35});
  material.onBeforeCompile=(shader)=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\\nvarying vec2 vPetalUv;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\\nvPetalUv=uv;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\\nvarying vec2 vPetalUv;')
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
            outgoingLight+=diffuseColor.rgb*directionalLights[lightIndex].color*scatter*thinness*0.28;
          }
        #endif
        #include <opaque_fragment>
      `);
  };
  material.customProgramCacheKey=()=> 'sakura-physical-tissue-v4';return material;
}
''';p.write_text(s)
p=Path('src/components/blossom/scene.js');s=p.read_text().replace('TextureLoader, RepeatWrapping,','TextureLoader, RepeatWrapping, PMREMGenerator, PCFSoftShadowMap,');s=s.replace("import { branchGeometry", "import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';\nimport { branchGeometry");s=s.replace('renderer.toneMappingExposure=1.05','renderer.toneMappingExposure=.95');s=s.replace('  const tree=new Group();scene.add(tree);','''  const pmrem=new PMREMGenerator(renderer),room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;
  room.dispose();pmrem.dispose();
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=PCFSoftShadowMap;
  const tree=new Group();scene.add(tree);''')
s=s.replace('0xfff2ed,0x16191e,.65','0xfff2ed,0x16191e,.32').replace('0xfff2e9,1.85','0xfff2e9,2.7').replace('key.position.set(-3,6,8);scene.add(key);','''key.position.set(-2,5,8);scene.add(key);
  key.castShadow=true;key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera,{left:-8,right:8,top:6,bottom:-6,near:.5,far:25});
  key.shadow.bias=-.0004;key.shadow.normalBias=.012;''')
s=s.replace('0xffd6de,1.1','0xffe0e8,2.1');s=s.replace('mesh.frustumCulled=false;mesh.visible=false;','mesh.frustumCulled=false;mesh.visible=false;mesh.receiveShadow=true;')
s=s.replace('  const petalMesh=new InstancedMesh(petalGeometry(),petalMaterial(),count*5);','''  let petalTexture=null;
  try {petalTexture=await loader.loadAsync('/loader/materials/sakura-tissue.webp');
    petalTexture.colorSpace=SRGBColorSpace;petalTexture.anisotropy=4;} catch { /* Use pink tissue fallback. */ }
  const tissue=petalMaterial(petalTexture);
  const petalMeshes=Array.from({length:5},(_,variant)=>{
    const mesh=new InstancedMesh(petalGeometry(variant),tissue,count);
    mesh.castShadow=true;mesh.receiveShadow=true;return mesh;
  });''')
s=s.replace('SphereGeometry(.056,10,6)','SphereGeometry(.045,12,8)').replace('CylinderGeometry(.008,.004,1,5)','CylinderGeometry(.0045,.003,1,5)').replace('count*12','count*24').replace('SphereGeometry(.017,7,5)','SphereGeometry(.012,7,5)').replace('color:0xe9b752','color:0xc5a482').replace('const instanced=[petalMesh,','const instanced=[...petalMeshes,').replace('i<12','i<24').replace('i/12','i/24');s=s.replace('petalMesh.setColorAt(i*5+petal,new Color().setRGB(1,.91+(i%4)*.025,.94+(petal%3)*.02));','petalMeshes[petal].setColorAt(i,new Color().setRGB(1,.94+(i%4)*.017,.97+(petal%3)*.01));');s=s.replace('Math.sin(i*2.8+petal)*.055','Math.sin(i*2.8+petal)*.10').replace('(1-bloom)*1.28-.10+Math.sin(i*4.1+petal)*.16','(1-bloom)*1.28-.035+Math.sin(i*4.1+petal)*.085').replace('petalMesh.setMatrixAt(i*5+petal,matrix)','petalMeshes[petal].setMatrixAt(i,matrix)').replace('stamen<12','stamen<24').replace('i*12+stamen','i*24+stamen');s=s.replace('textures.forEach(texture=>texture?.dispose());','textures.forEach(texture=>texture?.dispose());petalTexture?.dispose();environment.dispose();key.shadow.dispose();');p.write_text(s)
p=Path('src/App.jsx');p.write_text(p.read_text().replace('natural-3d-v7','natural-3d-v8'))
