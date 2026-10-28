from pathlib import Path
p=Path('src/components/blossom/tree.js');s=p.read_text();s=s.replace("[[-7.1,-2.5,-.5],[-4.8,-1.9,.1],[-.6,-.25,-.5],[5.3,2.55,-.6]],radius:[.23,.032]","[[-2.8,-1.65,-.3],[-.9,-1.05,.1],[2.0,.5,-.25],[5.5,2.1,-.6]],radius:[.085,.14]")
a=s.index('  const main=[');b=s.index('  const primary=',a)
s=s[:a]+'''  const main=[
    [.18,[.10,-1.1,.15],.027], [.32,[-.25,1.0,.25],.038],
    [.45,[.65,-1.15,.65],.042], [.53,[-.25,1.35,.4],.045],
    [.64,[.55,-1.0,.55],.041], [.73,[-.35,1.15,.15],.038],
    [.85,[.75,-.5,.65],.033], [.92,[-.15,.85,.25],.028],
  ];
'''+s[b:]
s=s.replace('[-.7+(i%3)*.15,upward ? .45+random()*.55 : -.40-random()*.55','[-.35+(i%3)*.13,upward ? .20+random()*.35 : -.20-random()*.3').replace('[.65,upward ? .2+random()*.6 : -.15-random()*.5','[.35,upward ? .1+random()*.3 : -.1-random()*.3')
s=s.replace('[-.50,.86,-.25]','[-.35,.45,-.25]').replace('[-.35,-.8,.15]','[-.25,-.45,.15]')
s=s.replace('blossom(branch,t,.25+random()*.18);','blossom(branch,t,i<=8 ? .40+random()*.23 : .16+random()*.17);')
s=s.replace('if(i%3===1) blossom(branch,Math.max(.42,t-.19),.16+random()*.16);','if(i%3===1) blossom(branch,Math.max(.42,t-.19),.19+random()*.14);')
p.write_text(s)
p=Path('src/components/blossom/geometry.js');s=p.read_text().replace('maps.color ? 0xb9a799 : 0x584438','maps.color ? 0x514139 : 0x30241f').replace('Math.sin(Math.PI*v*.92),.68)*.48','Math.max(0,Math.sin(Math.PI*v)),.62)*.56').replace('const cleft=(.12*u*u+.11*Math.exp(-u*u*60))*Math.pow(v,8);','const cleft=.055*Math.exp(-u*u*35)*Math.pow(v,12);').replace('const x=u*width*(1+.035*Math.sin(v*17+u*3));','const x=u*width*(1+.018*Math.sin(v*9+u*3));').replace('color:0xffe3e9','color:0xf3b6cc').replace('0.10+edgeGlow*0.19','0.045+edgeGlow*0.12');p.write_text(s)
p=Path('src/components/blossom/scene.js');s=p.read_text().replace('0xfff2e9,2.8','0xfff2e9,1.85').replace('0xffd6de,2.0','0xffd6de,1.1').replace('tree.position.x=aspect<.8 ? .4 : -.6;','tree.position.x=aspect<.8 ? -1.2 : -.2;');p.write_text(s)
p=Path('src/App.jsx');p.write_text(p.read_text().replace('natural-3d-v6','natural-3d-v7'))
