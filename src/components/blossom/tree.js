export const clamp = (v) => Math.max(0, Math.min(1, v));
export const smooth = (v) => {const t=clamp(v);return t*t*(3-2*t);};
export function seededRandom(seed) {
  return () => {
    seed |= 0;seed=seed+0x6D2B79F5|0;
    let t=Math.imul(seed^seed>>>15,1|seed);
    t=t+Math.imul(t^t>>>7,61|t)^t;
    return ((t^t>>>14)>>>0)/4294967296;
  };
}
export function curvePoint(points,t) {
  const u=1-t;
  const p=[0,1,2].map(i=>u*u*u*points[0][i]+3*u*u*t*points[1][i]+3*u*t*t*points[2][i]+t*t*t*points[3][i]);
  const length=Math.hypot(...points[3].map((v,i)=>v-points[0][i]));
  p[1]+=length*.035*Math.sin(Math.PI*t)*(.6*Math.sin(16*t)+.4*Math.sin(7*t));
  p[2]+=length*.01*Math.sin(Math.PI*t)*Math.sin(9*t);
  return p;
}
export function inverseSmooth(value) {
  let low=0,high=1;
  for(let i=0;i<20;i++) {const middle=(low+high)/2;if(smooth(middle)<value)low=middle;else high=middle;}
  return (low+high)/2;
}
export function createTree(seed=3917) {
  const random=seededRandom(seed),branches=[];
  const trunk={points:[[-2.8,-1.4,-.3],[-1.15,-1.1,.1],[2.25,.9,-.25],[5.5,2.1,-.6]],radius:[.035,.13],start:0,duration:1.8,parent:-1,attach:0};
  branches.push(trunk);
  function limb(parentIndex,attach,tip,radius,duration) {
    const parent=branches[parentIndex],anchor=curvePoint(parent.points,attach);
    const end=anchor.map((v,i)=>v+tip[i]);
    const sideways=(random()-.5)*.9;
    const points=[anchor,
      anchor.map((v,i)=>v+tip[i]*.26+(i===0 ? sideways : i===2 ? .12 : 0)),
      anchor.map((v,i)=>v+tip[i]*.74+(i===0 ? -sideways : i===2 ? -.15 : 0)),end];
    const result={points,radius:[radius,.006],start:parent.start+inverseSmooth(attach)*parent.duration+.035,duration,parent:parentIndex,attach};
    branches.push(result);return branches.length-1;
  }
  const main=[
    [.20,[-.40,.42,.35],.025], [.36,[-.10,.7,.60],.035],
    [.49,[.15,-1.2,.8],.047], [.56,[.18,1.3,.15],.055],
    [.66,[1.0,-.45,.7],.041], [.76,[-.45,1.05,.6],.049],
    [.85,[.65,.7,.1],.035], [.94,[-.15,.95,.2],.029],
  ];
  const primary=main.map(([attach,tip,radius])=>limb(0,attach,tip,radius,.70+Math.hypot(...tip)*.11));
  primary.forEach((id,i)=>{
    const upward=main[i][1][1]>0;
    limb(id,.48,[-.35+(i%3)*.13,upward ? .20+random()*.35 : -.20-random()*.3,(random()-.5)*.75],branches[id].radius[0]*.42,.65);
    limb(id,.78,[.35,upward ? .1+random()*.3 : -.1-random()*.3,(random()-.5)*.7],branches[id].radius[0]*.28,.57);
  });
  // Minor irregular twigs make the silhouette airy instead of symmetrical.
  limb(primary[0],.72,[-.35,.45,-.25],.016,.65);
  limb(primary[2],.62,[-.25,-.45,.15],.016,.63);
  limb(primary[4],.65,[.7,.2,.35],.014,.55);
  const blooms=[];
  function blossom(branch,t,size,bud=false) {
    const position=curvePoint(branch.points,t);
    const delay=branch.start+inverseSmooth(t)*branch.duration+.08;
    blooms.push({position,delay,size,
      openness:bud ? .18+random()*.18 : .88+random()*.12,
      tilt:[(random()-.5)*1.6,(random()-.5)*1.45,random()*Math.PI*2],
      release:random()*.85,phase:random()*Math.PI*2,sway:.22+random()*.40,
      frequency:2.1+random()*1.6,wind:(random()-.5)*.45,
      terminal:4.8+random()*1.6,drag:1.6+random()*.6,
      spin:(random()-.5)*1.6,depth:(random()-.5)*.45,
    });
  }
  branches.forEach((branch,i)=>{
    if(i===0) return;
    const t=i<=8 ? .72+random()*.18 : .78+random()*.20;
    blossom(branch,t,i===4 || i===6 ? .48+random()*.12 : i<=8 ? .28+random()*.16 : .15+random()*.16);
    // Irregular clusters grow at nodes, not a matching flower at every tip.
    if(i%3===1) blossom(branch,Math.max(.42,t-.19),.19+random()*.14);
    if(i%5===2) blossom(branch,.98,.15+random()*.10,true);
  });  return {branches,blooms,duration:Math.max(...blooms.map(b=>b.delay))+.8};
}

// Air drag limits downward speed; lateral flutter starts continuously from
// the attachment point instead of jumping to a random sine-wave position.
export function flowerMotion(flower,fallTime) {
  const t=Math.max(0,fallTime-flower.release);
  const ramp=1-Math.exp(-2.2*t);
  const flutter=flower.sway*(Math.sin(flower.frequency*t+flower.phase)-Math.sin(flower.phase))*ramp;
  const drop=flower.terminal*(t-(1-Math.exp(-flower.drag*t))/flower.drag);
  return {
    age:t,
    offset:[flower.wind*t+flutter,-drop,flower.depth*t+Math.sin(t*1.8+flower.phase)*.1*ramp],
    rotation:[Math.sin(t*2.5+flower.phase)*.32*ramp,Math.sin(t*1.7+flower.phase)*.45*ramp,flower.spin*t+Math.sin(t*flower.frequency)*.18*ramp],
  };
}
export function fallDuration(blooms,bottom) {
  return Math.max(...blooms.map(flower=>{
    let t=0;
    while(t<8 && flower.position[1]+flowerMotion(flower,t).offset[1]>bottom-1.5) t+=.04;
    return t;
  }));
}


export function breezeOffset(position,time) {
  const weight=smooth((position[0]+7)/12);
  return [0,.045*weight*Math.sin(time*.8+position[0]*.7),.065*weight*Math.sin(time*.55+position[0]*.5)];
}
