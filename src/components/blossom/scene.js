import {
  ACESFilmicToneMapping, Color, CylinderGeometry, DirectionalLight, Euler,
  Group, HemisphereLight, InstancedMesh, Matrix4, Mesh, MeshStandardMaterial,
  PerspectiveCamera, Quaternion, Scene, SphereGeometry, SRGBColorSpace,
  Vector3, WebGLRenderer, DynamicDrawUsage, TextureLoader, RepeatWrapping, PMREMGenerator, PCFSoftShadowMap,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { branchGeometry, branchMaterial, petalGeometry, petalMaterial } from './geometry.js';
import { breezeOffset, createTree, fallDuration, flowerMotion, smooth } from './tree.js';

export async function createBlossomScene(canvas) {
  const renderer=new WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
  const loader=new TextureLoader();
  const petalPromise=loader.loadAsync('/loader/materials/sakura-tissue.webp').catch(()=>null);
  const textures=await Promise.all(['color','normal','roughness'].map(async name=>{
    try {
      const texture=await loader.loadAsync(`/loader/materials/bark-${name}.webp`);
      texture.wrapS=texture.wrapT=RepeatWrapping;
      if(name==='color') texture.colorSpace=SRGBColorSpace;
      texture.anisotropy=4;
      return texture;
    } catch { return null; }
  }));
  const maps={color:textures[0],normal:textures[1],roughness:textures[2]};
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,window.innerWidth<600 ? 1.25 : 1.5));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=SRGBColorSpace;
  renderer.toneMapping=ACESFilmicToneMapping;renderer.toneMappingExposure=.85;
  const scene=new Scene(),camera=new PerspectiveCamera(36,1,.1,100);
  const pmrem=new PMREMGenerator(renderer),room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.25;
  room.dispose();pmrem.dispose();
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=PCFSoftShadowMap;
  const tree=new Group();scene.add(tree);
  scene.add(new HemisphereLight(0xfff2ed,0x16191e,.32));
  const key=new DirectionalLight(0xfff2e9,1.9);key.position.set(-2,5,8);scene.add(key);
  key.castShadow=true;key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera,{left:-8,right:8,top:6,bottom:-6,near:.5,far:25});
  key.shadow.bias=-.0004;key.shadow.normalBias=.012;
  const rim=new DirectionalLight(0xffe0e8,1.25);rim.position.set(5,3,-3);scene.add(rim);
  const fill=new DirectionalLight(0xc2cfff,.35);fill.position.set(-6,-2,3);scene.add(fill);
  const model=createTree();
  const branches=model.branches.map(branch=>{
    const material=branchMaterial(branch,maps),geometry=branchGeometry(branch);
    const mesh=new Mesh(geometry,material);tree.add(mesh);
    mesh.frustumCulled=false;mesh.visible=false;mesh.receiveShadow=true;
    return {mesh,branch};
  });
  const count=model.blooms.length;
  const petalTexture=await petalPromise;
  if(petalTexture) {petalTexture.colorSpace=SRGBColorSpace;petalTexture.anisotropy=4;}
  const tissue=petalMaterial(petalTexture);
  const petalMeshes=Array.from({length:5},(_,variant)=>{
    const mesh=new InstancedMesh(petalGeometry(variant),tissue,count);
    mesh.castShadow=true;mesh.receiveShadow=true;return mesh;
  });
  const heartMesh=new InstancedMesh(new SphereGeometry(.045,12,8),new MeshStandardMaterial({color:0x98604e,roughness:.78}),count);
  const calyxMesh=new InstancedMesh(new SphereGeometry(.115,10,6),new MeshStandardMaterial({color:0x76454a,roughness:.85}),count);
  const filamentMesh=new InstancedMesh(new CylinderGeometry(.0045,.003,1,5),new MeshStandardMaterial({color:0xf1c2ba,roughness:.7}),count*24);
  const antherMesh=new InstancedMesh(new SphereGeometry(.012,7,5),new MeshStandardMaterial({color:0xc5a482,roughness:.65}),count*24);
  const stemMesh=new InstancedMesh(new CylinderGeometry(.018,.013,.22,6),new MeshStandardMaterial({color:0x794855,roughness:.88}),count);
  const instanced=[...petalMeshes,heartMesh,calyxMesh,filamentMesh,antherMesh,stemMesh];
  instanced.forEach(mesh=>{
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);mesh.frustumCulled=false;tree.add(mesh);
  });
  // Geometry is shared across flowers; only transforms change each frame.
  const stamenMatrices=[],antherMatrices=[];
  for(let i=0;i<24;i++) {
    const angle=i/24*Math.PI*2;
    const start=new Vector3(0,0,.04);
    const end=new Vector3(Math.cos(angle)*(.105+(i%4)*.013),Math.sin(angle)*(.105+(i%4)*.013),.13+(i%3)*.033);
    const direction=end.clone().sub(start),length=direction.length();
    const rotation=new Quaternion().setFromUnitVectors(new Vector3(0,1,0),direction.clone().normalize());
    stamenMatrices.push(new Matrix4().compose(start.clone().add(end).multiplyScalar(.5),rotation,new Vector3(1,length,1)));
    antherMatrices.push(new Matrix4().makeTranslation(end.x,end.y,end.z));
  }
  const actors=model.blooms.map((flower,i)=>{
    for(let petal=0;petal<5;petal++) {
      petalMeshes[petal].setColorAt(i,new Color().setRGB(1,.94+(i%4)*.017,.97+(petal%3)*.01));
    }
    return {flower,position:new Vector3(),rotation:new Euler(),quaternion:new Quaternion(),matrix:new Matrix4()};
  });
  const scale=new Vector3(),matrix=new Matrix4(),local=new Matrix4(),turn=new Matrix4(),petalScale=new Matrix4();
  const heartLocal=new Matrix4().makeTranslation(0,0,.055);
  const calyxLocal=new Matrix4().makeScale(1,1,.55);calyxLocal.setPosition(0,0,-.025);
  const stemLocal=new Matrix4().makeRotationX(Math.PI/2);stemLocal.setPosition(0,0,-.13);
  let bottom=-5,exitDuration=4,cameraDistance=15;
  function resize() {
    const width=window.innerWidth,height=window.innerHeight,aspect=width/height;
    const worldWidth=aspect<.8 ? 9.4 : Math.max(14.2,8.7*aspect);
    const worldHeight=worldWidth/aspect;
    cameraDistance=worldHeight/(2*Math.tan(Math.PI/10));
    camera.aspect=aspect;camera.position.set(0,.15,cameraDistance);
    camera.lookAt(0,.15,0);camera.updateProjectionMatrix();
    tree.scale.setScalar(aspect<.8 ? .78 : 1);
    tree.position.x=aspect<.8 ? -.8 : -.2;
    bottom=.15-worldHeight/2;
    exitDuration=fallDuration(model.blooms,bottom/tree.scale.y)+.25;
    renderer.setSize(width,height,false);
  }
  resize();window.addEventListener('resize',resize);
  let previousTime,frameSum=0,frameSamples=0,qualityChanges=0;
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
    }
    camera.position.z=cameraDistance*(1-(reduced ? 0 : .018*smooth(elapsed/model.duration)));
    camera.position.x=reduced ? 0 : Math.sin(elapsed*.23)*.08;
    camera.lookAt(0,.15,0);
    branches.forEach(({mesh,branch})=>{
      const progress=reduced ? 1 : smooth((elapsed-branch.start)/branch.duration);
      mesh.visible=progress>.002;mesh.material.userData.growth.value=progress;mesh.material.userData.windTime.value=reduced ? -1 : elapsed;
    });
    actors.forEach(({flower,position,rotation,quaternion,matrix:actor},i)=>{
      const bloom=(reduced ? 1 : smooth((elapsed-flower.delay)/.8))*flower.openness;
      const motion=flowerMotion(flower,fallTime ?? -1);
      const wind=reduced ? [0,0,0] : breezeOffset(flower.position,elapsed-motion.age);
      const breeze=reduced ? 0 : Math.sin(elapsed*1.2+flower.phase)*.045;
      position.set(flower.position[0]+motion.offset[0],flower.position[1]+motion.offset[1]+wind[1],flower.position[2]+.1+motion.offset[2]+wind[2]);
      rotation.set(flower.tilt[0]+motion.rotation[0],flower.tilt[1]+motion.rotation[1],flower.tilt[2]+motion.rotation[2]+breeze);
      quaternion.setFromEuler(rotation);
      scale.setScalar(flower.size*Math.max(.0001,bloom));actor.compose(position,quaternion,scale);
      for(let petal=0;petal<5;petal++) {
        const angle=petal*Math.PI*2/5+Math.sin(i*2.8+petal)*.10;
        local.makeRotationZ(angle);
        turn.makeRotationX((1-bloom)*1.28-.035+Math.sin(i*4.1+petal)*.085);
        petalScale.makeScale(.94+Math.sin(i*3.7+petal)*.07,.96+Math.cos(i*1.9+petal)*.08,1);
        local.multiply(turn).multiply(petalScale);matrix.multiplyMatrices(actor,local);
        petalMeshes[petal].setMatrixAt(i,matrix);
      }
      heartMesh.setMatrixAt(i,matrix.multiplyMatrices(actor,heartLocal));
      calyxMesh.setMatrixAt(i,matrix.multiplyMatrices(actor,calyxLocal));
      stemMesh.setMatrixAt(i,matrix.multiplyMatrices(actor,stemLocal));
      for(let stamen=0;stamen<24;stamen++) {
        filamentMesh.setMatrixAt(i*24+stamen,matrix.multiplyMatrices(actor,stamenMatrices[stamen]));
        antherMesh.setMatrixAt(i*24+stamen,matrix.multiplyMatrices(actor,antherMatrices[stamen]));
      }
    });
    instanced.forEach(mesh=>{mesh.instanceMatrix.needsUpdate=true;});
    renderer.render(scene,camera);
  }
  return {
    duration:model.duration,
    get exitDuration(){return exitDuration;},
    render,
    dispose() {
      window.removeEventListener('resize',resize);
      branches.forEach(({mesh})=>{mesh.geometry.dispose();mesh.material.dispose();});
      instanced.forEach(mesh=>{mesh.geometry.dispose();if(mesh.material!==tissue)mesh.material.dispose();mesh.dispose();});
      tissue.dispose();
      textures.forEach(texture=>texture?.dispose());petalTexture?.dispose();environment.dispose();key.shadow.dispose();
      renderer.dispose();renderer.forceContextLoss();
    },
  };
}
