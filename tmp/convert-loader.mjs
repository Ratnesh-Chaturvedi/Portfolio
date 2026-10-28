import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage();
for(const name of ['cherry-branch','cherry-blossom']) {
 const data=await fs.readFile(`public/loader/${name}.png`);
 const result=await page.evaluate(async(data)=>{
  const image=new Image();image.src=`data:image/png;base64,${data}`;await image.decode();
  const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
  const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);
  const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let transparent=0;for(let i=3;i<pixels.length;i+=4) if(pixels[i]<10) transparent++;
  return {width:image.width,height:image.height,transparent,corner:Array.from(pixels.slice(0,4)),webp:canvas.toDataURL('image/webp',.9).split(',')[1]};
 },data.toString('base64'));
 const {webp,...stats}=result;console.log(name,stats);
 await fs.writeFile(`public/loader/${name}.webp`,Buffer.from(webp,'base64'));
}
await browser.close();
