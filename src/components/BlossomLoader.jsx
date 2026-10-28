import { useEffect, useRef } from 'react';

export default function BlossomLoader({ onComplete }) {
  const canvasRef=useRef(null),overlayRef=useRef(null),statusRef=useRef(null);
  useEffect(()=>{
    let disposed=false,frame,scene,start,exitStart,loadResolve;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const loaded=document.readyState==='complete' ? Promise.resolve() : new Promise(resolve=>{
      loadResolve=resolve;window.addEventListener('load',resolve,{once:true});
    });
    const hero=document.querySelector('.mypic');
    const ready=Promise.all([loaded,document.fonts.ready,hero?.decode?.().catch(()=>{})]);
    let pageReady=false;ready.then(()=>{pageReady=true;});
    import('./blossom/scene.js').then(async module=>{
      if(disposed) return;
      // Unsupported WebGL devices continue to the site; no image substitute.
      try {scene=await module.createBlossomScene(canvasRef.current);if(disposed){scene.dispose();return;}}
      catch {ready.then(()=>{if(!disposed) onComplete();});return;}
      start=performance.now();
      const tick=now=>{
        if(disposed) return;
        const elapsed=(now-start)/1000;
        if(pageReady && elapsed>(reduced ? .2 : scene.duration+.2) && exitStart===undefined) {
          exitStart=now;statusRef.current.textContent='Welcome';
        }
        const fallTime=exitStart===undefined ? null : (now-exitStart)/1000;
        overlayRef.current.dataset.phase=fallTime!==null ? 'falling' : elapsed<2.4 ? 'growing' : 'blooming';
        scene.render(elapsed,reduced ? null : fallTime,reduced);
        if(fallTime!==null) {
          const fadeStart=reduced ? 0 : scene.exitDuration;
          const fade=Math.max(0,(fallTime-fadeStart)/.55);
          overlayRef.current.style.opacity=String(Math.max(0,1-fade));
          if(fade>=1) {onComplete();return;}
        }
        frame=requestAnimationFrame(tick);
      };
      frame=requestAnimationFrame(tick);
    }).catch(()=>{ready.then(()=>{if(!disposed) onComplete();});});
    return ()=>{
      disposed=true;cancelAnimationFrame(frame);scene?.dispose();
      if(loadResolve) window.removeEventListener('load',loadResolve);
      document.body.style.overflow=previousOverflow;
    };
  },[onComplete]);
  return (
    <div ref={overlayRef} className="blossom-loader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="blossom-loader-caption"><span>RATNESH CHATURVEDI</span><p ref={statusRef}>Preparing your experience</p></div>
      <button type="button" className="blossom-loader-skip" onClick={onComplete}>Skip intro <span aria-hidden="true">&rarr;</span></button>
    </div>
  );
}
