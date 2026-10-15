(function(){
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav-links');
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')}))}
  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});revealItems.forEach(el=>observer.observe(el))}else revealItems.forEach(el=>el.classList.add('visible'));
  const mount=document.getElementById('three-canvas');
  if(!mount||!window.THREE)return;
  try{
    const THREE=window.THREE;const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(42,mount.clientWidth/mount.clientHeight,.1,100);camera.position.z=5.4;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(mount.clientWidth,mount.clientHeight);renderer.setClearColor(0x000000,0);mount.innerHTML='';mount.appendChild(renderer.domElement);
    const group=new THREE.Group();scene.add(group);
    const geometry=new THREE.IcosahedronGeometry(1.25,2);const wire=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x70f0e0,wireframe:true,transparent:true,opacity:.72}));group.add(wire);
    const inner=new THREE.Mesh(new THREE.IcosahedronGeometry(.78,2),new THREE.MeshBasicMaterial({color:0x8e7bff,wireframe:true,transparent:true,opacity:.45}));inner.rotation.set(.4,.2,.1);group.add(inner);
    const ringMat=new THREE.MeshBasicMaterial({color:0xa98cff,wireframe:true,transparent:true,opacity:.5});const ring=new THREE.Mesh(new THREE.TorusGeometry(1.75,.008,8,160),ringMat);ring.rotation.set(1.12,.3,.2);group.add(ring);
    const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.95,.006,8,160),new THREE.MeshBasicMaterial({color:0x70f0e0,wireframe:true,transparent:true,opacity:.3}));ring2.rotation.set(.3,1.05,.8);group.add(ring2);
    const pointsGeometry=new THREE.BufferGeometry();const pointCount=450;const positions=new Float32Array(pointCount*3);for(let i=0;i<pointCount;i++){const radius=1.7+Math.random()*1.1;const theta=Math.random()*Math.PI*2;const phi=Math.acos(2*Math.random()-1);positions[i*3]=radius*Math.sin(phi)*Math.cos(theta);positions[i*3+1]=radius*Math.sin(phi)*Math.sin(theta);positions[i*3+2]=radius*Math.cos(phi)}pointsGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const points=new THREE.Points(pointsGeometry,new THREE.PointsMaterial({color:0x8fbfc8,size:.012,transparent:true,opacity:.75}));group.add(points);
    const pointer={x:0,y:0};mount.addEventListener('pointermove',e=>{const r=mount.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width-.5)*.45;pointer.y=((e.clientY-r.top)/r.height-.5)*.35});mount.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0});
    let frame=0;let running=true;document.addEventListener('visibilitychange',()=>{running=!document.hidden});
    function resize(){const w=Math.max(1,mount.clientWidth),h=Math.max(1,mount.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}window.addEventListener('resize',resize);
    function animate(){requestAnimationFrame(animate);if(!running)return;frame+=.003;group.rotation.y+=(pointer.x-group.rotation.y)*.025;group.rotation.x+=(-pointer.y-group.rotation.x)*.025;wire.rotation.y+=.0015;inner.rotation.y-=.002;inner.rotation.x+=.001;ring.rotation.z+=.0014;ring2.rotation.x-=.0009;points.rotation.y-=.0005;group.position.y=Math.sin(frame)*.04;renderer.render(scene,camera)}animate();
  }catch(e){/* Keep the CSS orb fallback if WebGL is unavailable. */}
})();
