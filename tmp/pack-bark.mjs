import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
for(const name of ['color','normal','roughness']) {
 const bytes=await fs.readFile(`public/loader/materials/bark-${name}.jpg`);
 const result=await page.evaluate(async ({base64,name})=>{
  const img=new Image();img.src=`data:image/jpeg;base64,${base64}`;await img.decode();
  const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;canvas.getContext('2d').drawImage(img,0,0);
  return canvas.toDataURL('image/webp',name==='normal' ? .92 : .84).split(',')[1];
 },{base64:bytes.toString('base64'),name});
 await fs.writeFile(`public/loader/materials/bark-${name}.webp`,Buffer.from(result,'base64'));
}
await browser.close();
