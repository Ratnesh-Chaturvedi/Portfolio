import test from 'node:test';
import assert from 'node:assert/strict';
import { createGrowthField } from '../src/components/blossom/growthField.js';

test('growth follows forks in different directions after their parent arrives',()=>{
 const width=110,height=110,pixels=new Uint8ClampedArray(width*height*4);
 const bark=(x,y)=>{pixels[(y*width+x)*4+3]=255;};
 for(let x=0;x<=55;x++) for(let y=83;y<=87;y++) bark(x,y);
 for(let y=25;y<=85;y++) for(let x=53;x<=57;x++) bark(x,y);
 for(let x=55;x<=98;x++) for(let y=83;y<=87;y++) bark(x,y);
 const field=createGrowthField(pixels,width,height);
 const at=(x,y)=>field.times[y*width+x];
 assert.ok(at(30,85)<at(55,85),'trunk reaches the fork before its children');
 assert.ok(at(55,75)<at(55,40),'vertical offshoot grows upward despite identical x coordinates');
 assert.ok(at(55,85)<at(90,85),'horizontal offshoot grows from its attachment');
 assert.ok(at(90,85)<at(55,25),'each limb has its own path-length timing');
 assert.equal(field.unreachable,0);
});

test('disconnected background never receives a zero-time growth seed',()=>{
 const width=50,height=50,pixels=new Uint8ClampedArray(width*height*4);
 for(let x=0;x<40;x++) pixels[(40*width+x)*4+3]=255;
 const field=createGrowthField(pixels,width,height);
 const n=5*width+30;
 assert.equal(field.times[n],Infinity);
 assert.equal(field.encoded[n*4],255);
 assert.equal(field.encoded[n*4+1],255);
});
