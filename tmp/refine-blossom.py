from pathlib import Path
p=Path('src/components/blossom/geometry.js')
s=p.read_text().replace('export function branchMaterial(branch) {','export function branchMaterial(branch, maps={}) {').replace('color:0x584438,roughness:.86,metalness:0','color:maps.color ? 0xb9a799 : 0x584438,roughness:.92,metalness:0,map:maps.color ?? null,normalMap:maps.normal ?? null,roughnessMap:maps.roughness ?? null,normalScale:new Vector2(.65,.65)')
a=s.index('    shader.fragmentShader=shader.fragmentShader.replace',s.index('export function branchMaterial'))
b=s.index('\n  };',a)
s=s[:a]+'''    // Follow the growing centreline: bark retains its scale as each limb extends.
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
    `);'''+s[b:]
s=s.replace("'growing-wood-3d-v2'","'growing-wood-pbr-v3'")
s=s.replace('Math.sin(Math.PI*v*.89),.52)*.45','Math.sin(Math.PI*v*.92),.68)*.48')
s=s.replace('(.17*u*u+.065*Math.exp(-u*u*45))','(.12*u*u+.11*Math.exp(-u*u*60))')
s=s.replace('const z=.045*v*v+.055*u*u*Math.sin(Math.PI*v)+.012*Math.sin(v*11+u*5)*v+.015*Math.sin(u*13+v*8)*v*v;','const z=.14*v*v-.075*Math.sin(Math.PI*v)+.12*u*u*Math.sin(Math.PI*v)+.018*Math.sin(v*11+u*5)*v+.025*Math.sin(u*13+v*8)*v*v;')
s=s.replace('color:0xffd1df,roughness:.82','color:0xffe3e9,roughness:.72')
s=s.replace('vec3(0.82,0.46,0.58),vec3(1.04,1.0,1.0)','vec3(0.66,0.25,0.38),vec3(1.0,0.97,0.94)')
s=s.replace('float veins = pow(abs(sin((vPetalUv.x-0.5)*47.0+sin(vPetalUv.y*6.0)*2.0)),24.0);\n        diffuseColor.rgb *= 1.0-veins*0.045;','''float veinCoordinate=(vPetalUv.x-0.5)*(38.0+vPetalUv.y*12.0)+sin(vPetalUv.y*9.0)*0.35;
        float veins=pow(abs(sin(veinCoordinate)),32.0);
        float tissue=sin(vPetalUv.x*211.0+sin(vPetalUv.y*79.0))*sin(vPetalUv.y*187.0);
        diffuseColor.rgb *= 1.0-veins*0.085+tissue*0.018;''')
s=s.replace('      `);\n  };\n  material.customProgramCacheKey=()=> \'curved', '''      `).replace('#include <opaque_fragment>', `
        // Thin petal tissue scatters the rim light instead of looking like opaque plastic.
        float edgeGlow=pow(1.0-abs(dot(normal,normalize(vViewPosition))),2.0);
        outgoingLight+=diffuseColor.rgb*(0.10+edgeGlow*0.19);
        #include <opaque_fragment>
      `);
  };
  material.customProgramCacheKey=()=> 'curved''')
s=s.replace('curved-sakura-petal-3d-v2','curved-sakura-tissue-v3')
p.write_text(s)
p=Path('src/components/blossom/scene.js');s=p.read_text().replace('Vector3, WebGLRenderer, DynamicDrawUsage,','Vector3, WebGLRenderer, DynamicDrawUsage, TextureLoader, RepeatWrapping,')
s=s.replace('export function createBlossomScene(canvas) {','''export async function createBlossomScene(canvas) {
  const loader=new TextureLoader();
  const textures=await Promise.all(['color','normal','roughness'].map(async name=>{
    try {
      const texture=await loader.loadAsync(`/loader/materials/bark-${name}.jpg`);
      texture.wrapS=texture.wrapT=RepeatWrapping;
      if(name==='color') texture.colorSpace=SRGBColorSpace;
      texture.anisotropy=4;
      return texture;
    } catch { return null; }
  }));
  const maps={color:textures[0],normal:textures[1],roughness:textures[2]};''')
s=s.replace('branchMaterial(branch)','branchMaterial(branch,maps)')
s=s.replace('0xffe5ef,0x1e151b,1.65','0xfff2ed,0x16191e,.65').replace('0xffeee1,2.2','0xfff2e9,2.8').replace('0xf8d7e8,1.2','0xffd6de,2.0').replace('0xc2cfff,.55','0xc2cfff,.35')
s=s.replace('renderer.dispose();renderer.forceContextLoss();','textures.forEach(texture=>texture?.dispose());\n      renderer.dispose();renderer.forceContextLoss();')
s=s.replace('new SphereGeometry(.088,10,6)','new SphereGeometry(.056,10,6)').replace('color:0xad4768','color:0x98604e')
s=s.replace('(1-bloom)*1.28-.025+Math.sin(i*4.1+petal)*.055','(1-bloom)*1.28-.10+Math.sin(i*4.1+petal)*.16')
s=s.replace('Math.cos(angle)*.14,Math.sin(angle)*.14,.18+(i%3)*.025','Math.cos(angle)*(.105+(i%4)*.013),Math.sin(angle)*(.105+(i%4)*.013),.13+(i%3)*.033')
p.write_text(s)
p=Path('src/components/BlossomLoader.jsx');s=p.read_text().replace('.then(module=>{','.then(async module=>{').replace('try {scene=module.createBlossomScene(canvasRef.current);}','try {scene=await module.createBlossomScene(canvasRef.current);if(disposed){scene.dispose();return;}}');p.write_text(s)
p=Path('src/App.jsx');p.write_text(p.read_text().replace('natural-3d-v5','natural-3d-v6'))
p=Path('scripts/blossom-model.test.mjs');s=p.read_text().replace("import test from 'node:test';","import test from 'node:test';\nimport { Texture } from 'three';").replace('petals and bark are genuine mesh geometry with no image maps','petals and bark retain curved mesh geometry and accept shared PBR surface maps');s=s.replace('assert.equal(material.map,null);assert.equal(material.bumpMap,null);material.dispose();','assert.equal(material.bumpMap,null);material.dispose();');s=s.replace("});\ntest('detachment",''' const maps={color:new Texture(),normal:new Texture(),roughness:new Texture()};
 const wood=branchMaterial(branch,maps);
 assert.equal(wood.map,maps.color);assert.equal(wood.normalMap,maps.normal);assert.equal(wood.roughnessMap,maps.roughness);
 wood.dispose();Object.values(maps).forEach(map=>map.dispose());
});
test('detachment''');p.write_text(s)
p=Path('tmp/check-pure3d.mjs');p.write_text(p.read_text().replace('errors.length || assetRequests.length','errors.length || assetRequests.some(url=>!url.includes(\'/materials/\'))'))
