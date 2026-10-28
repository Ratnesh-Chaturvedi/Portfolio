import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
const bytes=await fs.readFile('tmp/sakura-tissue.png');
const result=await page.evaluate(async base64=>{
 const img=new Image();img.src=`data:image/png;base64,${base64}`;await img.decode();
 const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;canvas.getContext('2d').drawImage(img,0,0);
 return canvas.toDataURL('image/webp',.86).split(',')[1];
},bytes.toString('base64'));
await fs.writeFile('public/loader/materials/sakura-tissue.webp',Buffer.from(result,'base64'));
await browser.close();
