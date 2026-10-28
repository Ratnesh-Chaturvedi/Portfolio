import test from 'node:test';
import { Texture } from 'three';
import assert from 'node:assert/strict';
import { createTree, curvePoint, flowerMotion, fallDuration, smooth } from '../src/components/blossom/tree.js';
import { branchGeometry, branchMaterial, petalGeometry, petalMaterial } from '../src/components/blossom/geometry.js';

test('branches are rooted in their parent and start when it reaches the fork',()=>{
 const tree=createTree();
 tree.branches.forEach(branch=>{
  if(branch.parent<0)return;
  const parent=tree.branches[branch.parent];
  assert.deepEqual(branch.points[0],curvePoint(parent.points,branch.attach));
  assert.ok(smooth((branch.start-parent.start)/parent.duration)>=branch.attach);
 });
 assert.ok(tree.branches.length>20);
 assert.ok(new Set(tree.branches.map(b=>b.start)).size>20);
});
test('petals and bark retain curved mesh geometry and accept shared PBR surface maps',()=>{
 const branch=createTree().branches[0];
 const limb=branchGeometry(branch),petal=petalGeometry();
 assert.ok(limb.getAttribute('position').count>500);
 assert.ok(petal.getAttribute('position').count>100);
 assert.ok(new Set(Array.from(petal.getAttribute('position').array).filter((_,i)=>i%3===2)).size>20,'petals curve in depth');
 for(const geometry of [limb,petal]) {
  assert.ok(Array.from(geometry.getAttribute('normal').array).every(Number.isFinite));geometry.dispose();
 }
 for(const material of [branchMaterial(branch),petalMaterial()]) {
  assert.equal(material.bumpMap,null);material.dispose();
 }
 const maps={color:new Texture(),normal:new Texture(),roughness:new Texture()};
 const wood=branchMaterial(branch,maps);
 assert.equal(wood.map,maps.color);assert.equal(wood.normalMap,maps.normal);assert.equal(wood.roughnessMap,maps.roughness);
  const blossom=petalMaterial(maps.color);
 assert.equal(blossom.map,maps.color);assert.equal(blossom.isMeshPhysicalMaterial,true);
 const variants=Array.from({length:5},(_,variant)=>petalGeometry(variant));
 assert.equal(new Set(variants.map(g=>JSON.stringify(Array.from(g.getAttribute('position').array)))).size,5);
 variants.forEach(g=>g.dispose());blossom.dispose();
 wood.dispose();Object.values(maps).forEach(map=>map.dispose());
});
test('detachment is continuous, staggered, and accelerates downward with drag',()=>{
 const {blooms}=createTree();
 blooms.forEach(flower=>{
  assert.ok(flowerMotion(flower,flower.release).offset.every(value=>Math.abs(value)<1e-12));
  const a=flowerMotion(flower,flower.release+.5),b=flowerMotion(flower,flower.release+1),c=flowerMotion(flower,flower.release+1.5);
  assert.ok(a.offset[1]>b.offset[1] && b.offset[1]>c.offset[1]);
  assert.ok(b.offset[1]-c.offset[1]>a.offset[1]-b.offset[1]);
 });
 assert.ok(new Set(blooms.map(f=>f.release)).size===blooms.length);
 assert.ok(new Set(blooms.map(f=>f.spin)).size===blooms.length);
 const end=fallDuration(blooms,-5);
 assert.ok(blooms.every(f=>f.position[1]+flowerMotion(f,end).offset[1]<-6.4));
});
