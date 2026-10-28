// Build a travel-time field from the actual bark silhouette. Propagation can
// only move along connected branch pixels, so offshoots inherit their parent's
// arrival time and then grow independently in their own direction.
export function createGrowthField(pixels,width,height,duration=3) {
  const length=width*height;
  const mask=new Uint8Array(length), radius=new Float32Array(length);
  const times=new Float32Array(length);times.fill(Infinity);
  for(let y=1;y<height-1;y++) for(let x=1;x<width-1;x++) {
    const n=y*width+x;
    if(pixels[n*4+3]<16) continue;
    // Bridge only subpixel alpha gaps, not the spaces between separate twigs.
    for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) mask[n+dy*width+dx]=1;
  }
  for(let n=0;n<length;n++) radius[n]=mask[n] ? 1000 : 0;
  for(let y=1;y<height-1;y++) for(let x=1;x<width-1;x++) {
    const n=y*width+x;
    if(mask[n]) radius[n]=Math.min(radius[n],radius[n-1]+1,radius[n-width]+1,radius[n-width-1]+1.414,radius[n-width+1]+1.414);
  }
  for(let y=height-2;y>0;y--) for(let x=width-2;x>0;x--) {
    const n=y*width+x;
    if(mask[n]) radius[n]=Math.min(radius[n],radius[n+1]+1,radius[n+width]+1,radius[n+width+1]+1.414,radius[n+width-1]+1.414);
  }
  let heapSize=0;
  let heapIndices=new Uint32Array(65536),heapCosts=new Float32Array(65536);
  function push(index,cost) {
    if(heapSize===heapIndices.length) {
      const nextIndices=new Uint32Array(heapSize*2),nextCosts=new Float32Array(heapSize*2);
      nextIndices.set(heapIndices);nextCosts.set(heapCosts);heapIndices=nextIndices;heapCosts=nextCosts;
    }
    let at=heapSize++;
    while(at>0) {
      const parent=(at-1)>>1;
      if(heapCosts[parent]<=cost) break;
      heapIndices[at]=heapIndices[parent];heapCosts[at]=heapCosts[parent];at=parent;
    }
    heapIndices[at]=index;heapCosts[at]=cost;
  }
  function pop() {
    const result=heapIndices[0],lastIndex=heapIndices[--heapSize],lastCost=heapCosts[heapSize];
    let at=0;
    while(at*2+1<heapSize) {
      let child=at*2+1;
      if(child+1<heapSize && heapCosts[child+1]<heapCosts[child]) child++;
      if(heapCosts[child]>=lastCost) break;
      heapIndices[at]=heapIndices[child];heapCosts[at]=heapCosts[child];at=child;
    }
    heapIndices[at]=lastIndex;heapCosts[at]=lastCost;
    return result;
  }
  let rootX=width;
  for(let y=Math.floor(height*.6);y<height-1;y++) for(let x=0;x<width;x++) {
    if(mask[y*width+x]) {rootX=Math.min(rootX,x);break;}
  }
  for(let y=Math.floor(height*.6);y<height-1;y++) for(let x=rootX;x<=rootX+2;x++) {
    const n=y*width+x;
    if(mask[n]) {times[n]=0;push(n,0);}
  }
  const visited=new Uint8Array(length);
  const neighbors=[[-1,-1,1.414],[0,-1,1],[1,-1,1.414],[-1,0,1],[1,0,1],[-1,1,1.414],[0,1,1],[1,1,1.414]];
  while(heapSize) {
    const n=pop();if(visited[n]) continue;visited[n]=1;
    const x=n%width,y=Math.floor(n/width);
    for(const [dx,dy,distance] of neighbors) {
      const nx=x+dx,ny=y+dy;
      if(nx<0 || nx>=width || ny<0 || ny>=height) continue;
      const next=ny*width+nx;
      if(!mask[next] || visited[next]) continue;
      // Thick supporting wood advances faster than fine terminal twigs.
      // Each limb's shape and thickness therefore produce a distinct speed.
      const speed=100+Math.min(28,(radius[n]+radius[next])*.5)*22;
      const cost=times[n]+distance/speed;
      if(cost<times[next]) {times[next]=cost;push(next,cost);}
    }
  }
  let maxTime=0,reachable=0,unreachable=0;
  for(let n=0;n<length;n++) if(pixels[n*4+3]>16) {
    if(Number.isFinite(times[n])) {maxTime=Math.max(maxTime,times[n]);reachable++;}
    else unreachable++;
  }
  // A few isolated alpha flecks can occur in compressed photographic cutouts.
  // Attach them to nearby bark's arrival time; never reveal them at time zero.
  if(unreachable) for(let y=0;y<height;y++) for(let x=0;x<width;x++) {
    const n=y*width+x;
    if(pixels[n*4+3]<=16 || Number.isFinite(times[n])) continue;
    let nearest=Infinity,best=maxTime;
    for(let dy=-24;dy<=24;dy++) for(let dx=-24;dx<=24;dx++) {
      const nx=x+dx,ny=y+dy;
      if(nx<0 || nx>=width || ny<0 || ny>=height) continue;
      const next=ny*width+nx,d=dx*dx+dy*dy;
      if(d<nearest && visited[next]) {nearest=d;best=times[next]+Math.sqrt(d)/150;}
    }
    times[n]=best;
  }
  for(let n=0;n<length;n++) if(Number.isFinite(times[n])) times[n]=Math.min(duration,times[n]/maxTime*duration);
  const encoded=new Uint8ClampedArray(length*4);
  for(let n=0;n<length;n++) {
    const value=Math.round((Number.isFinite(times[n]) ? times[n]/duration : 1)*65535);
    encoded[n*4]=value>>8;encoded[n*4+1]=value&255;encoded[n*4+3]=255;
  }
  function anchor(nx,ny) {
    const x=Math.round(nx*(width-1)),y=Math.round(ny*(height-1));
    let nearest=Infinity,time=duration,anchorX=x,anchorY=y;
    for(let dy=-100;dy<=100;dy++) for(let dx=-100;dx<=100;dx++) {
      const px=x+dx,py=y+dy;
      if(px<0 || px>=width || py<0 || py>=height) continue;
      const n=py*width+px,d=dx*dx+dy*dy;
      if(d<nearest && pixels[n*4+3]>100 && Number.isFinite(times[n])) {nearest=d;time=times[n];anchorX=px;anchorY=py;}
    }
    return {x:anchorX/(width-1),y:anchorY/(height-1),time};
  }
  return {encoded,times,anchor,arrival:(x,y)=>anchor(x,y).time,reachable,unreachable,duration};
}
