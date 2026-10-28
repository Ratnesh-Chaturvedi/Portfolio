from pathlib import Path
p=Path('src/components/blossom/scene.js');s=p.read_text().replace('scene.environment=environment.texture;','scene.environment=environment.texture;scene.environmentIntensity=.25;').replace('renderer.toneMappingExposure=.95','renderer.toneMappingExposure=.85').replace('0xfff2e9,2.7','0xfff2e9,1.9').replace('0xffe0e8,2.1','0xffe0e8,1.25');p.write_text(s)
p=Path('src/components/blossom/geometry.js');s=p.read_text().replace('0x786356','0x54433b').replace('color:map ? 0xffffff','color:map ? 0xf0bacd').replace('thinness*0.28','thinness*0.16');p.write_text(s)
p=Path('src/components/blossom/tree.js');s=p.read_text().replace('[[-2.8,-1.65,-.3],[-.9,-1.05,.1],[2.0,.5,-.25],[5.5,2.1,-.6]],radius:[.085,.14]','[[-2.8,-1.4,-.3],[-1.15,-1.1,.1],[2.25,.9,-.25],[5.5,2.1,-.6]],radius:[.035,.13]');a=s.index('  const main=[');b=s.index('  const primary=',a);s=s[:a]+'''  const main=[
    [.20,[-.40,.42,.35],.025], [.36,[-.10,.7,.60],.035],
    [.49,[.15,-1.2,.8],.047], [.56,[.18,1.3,.15],.055],
    [.66,[1.0,-.45,.7],.041], [.76,[-.45,1.05,.6],.049],
    [.85,[.65,.7,.1],.035], [.94,[-.15,.95,.2],.029],
  ];
'''+s[b:];s=s.replace('i<=8 ? .40+random()*.23 : .16+random()*.17','i===4 || i===6 ? .48+random()*.12 : i<=8 ? .28+random()*.16 : .15+random()*.16');p.write_text(s)
