import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import { createGrowthField } from '../src/components/blossom/growthField.js';
import { flowers } from '../src/components/blossom/flowers.js';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 const page=await browser.newPage();
 const data=await fs.readFile('public/loader/cherry-branch.webp');
 const result=await page.evaluate(async({data,algorithm,flowers})=>{
  const image=new Image();image.src=`data:image/webp;base64,${data}`;await image.decode();
  const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
  const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);
  const build=new Function(`return (${algorithm});`)();
  const field=build(ctx.getImageData(0,0,image.width,image.height).data,image.width,image.height,2.8);
  const flowerAnchors=flowers.map(([x,y])=>field.anchor(x,y));
  const bloomTimes=flowerAnchors.map(({time})=>time+.15);
  ctx.putImageData(new ImageData(field.encoded,image.width,image.height),0,0);
  return {png:canvas.toDataURL('image/png').split(',')[1],bloomTimes,flowerAnchors,reachable:field.reachable,unreachable:field.unreachable,duration:field.duration};
 },{data:data.toString('base64'),algorithm:createGrowthField.toString(),flowers});
 await fs.writeFile('public/loader/branch-growth.png',Buffer.from(result.png,'base64'));
 const {png,...timing}=result;
 await fs.writeFile('src/components/blossom/growthTiming.json',JSON.stringify(timing,null,2)+'\n');
 console.log(timing);
} finally {await browser.close();}

