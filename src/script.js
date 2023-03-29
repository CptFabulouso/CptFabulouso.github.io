import RoundAbout from "./roundabout.js"
import BouncyText from "./bouncyText.js"
import WaveText from "./waveText.js"
import Secret from "./secret.js";

// Add mouse movement and click event listeners
const FRICTION = 0.007;
let previousX = 0;
let angularVelocity = 0;
let lastVelocities = [];
let camera, scene, renderer, roundabout, isMouseDown, clock, spinToHell, secret, tadadaText, showSecret, swipeText = false;

function getWindowDims(){
  const w = window.innerWidth
  const h = window.innerHeight
  // if(w < h){
  //   return {
  //     width: w,
  //     height: w,
  //     aspect: 1
  //   }
  // }
  return {
    width: w,
    height: h,
    aspect: w/h
  }
}

function init(){
  // Set up the scene, camera, and renderer
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  const windowDims = getWindowDims()
  camera = new THREE.PerspectiveCamera(75, windowDims.aspect, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.renderReverseSided = false;
  renderer.shadowMap.renderSingleSided = false;
  renderer.setSize(windowDims.width, windowDims.height);
  document.body.appendChild(renderer.domElement);
  roundabout = new RoundAbout({ x: 0, y: 0, z: -2 })
  swipeText = new BouncyText("< Swipe >", { x: 0, y: 3, z: 1 })
  secret = new Secret(camera)
  scene.add(secret.secret)
  swipeText.load((textGeometry) => {
    scene.add(textGeometry);
  })
  tadadaText = new WaveText("Ta Da Ta Da Ta Da", { x: 0, y: 3, z: -10 })
  tadadaText.load((textGeometry) => {
    textGeometry.material.transparent = true;
    textGeometry.material.opacity = 0;
    scene.add(textGeometry);
  })

  // Create the ground
  const groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  const groundTexture = new THREE.TextureLoader().load("src/textures/grass.jpg");
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(10, 10);
  const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.receiveShadow = true;
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);

  // create concrete under roundabout
  const geometry = new THREE.BoxGeometry(5, 0.1, 5);
  const material = new THREE.MeshStandardMaterial({ color: 0x6a6668 });
  const cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true
  cube.castShadow = true
  cube.position.y = -1;
  cube.position.z = -2;
  scene.add(cube);
  

  // crate building
  const buildingGeometry = new THREE.PlaneGeometry(30, 10, 1, 1);
  const buildingTexture = new THREE.TextureLoader().load("src/textures/building.jpeg");
  buildingTexture.wrapS = THREE.RepeatWrapping;
  buildingTexture.wrapT = THREE.RepeatWrapping;
  buildingTexture.repeat.set(3, 1);
  const buildingMaterial = new THREE.MeshStandardMaterial({ map: buildingTexture });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.receiveShadow = true;
  building.position.z = -10;
  building.position.y = 5;
  scene.add(building);
  
  // Position the camera and roundabout
  camera.position.z = 8;
  camera.position.y = 3;
  roundabout.position.y = 0;
  scene.add(roundabout)
  
  // Add some lighting to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.castShadow = true;
  pointLight.position.set(5, 10, 0);
  scene.add(pointLight);

  document.addEventListener('mousedown', handleGestureStart, false);
  document.addEventListener('mouseup', handleGestureEnd, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('touchstart', handleGestureStart, false);
  document.addEventListener('touchend', handleGestureEnd, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  // add window resize listener
  window.addEventListener('resize', handleWindowResize);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  swipeText.update()
  if(spinToHell){
    tadadaText.show()
    tadadaText.update()
  }
  if(showSecret){
    secret.update()
  }
  if(tadadaText?.textGeometry?.position.z > 8 && !showSecret){
    showSecret = true
    secret.reveal()
  }
  if (!isMouseDown && Math.abs(angularVelocity) > 0.001) {
    if(!spinToHell){
      angularVelocity *= 1 - FRICTION;
    }
    roundabout.rotation.y += angularVelocity;
  }
  renderer.render(scene, camera);
}

function handleGestureStart() {
  lastVelocities = []
  isMouseDown = true;
  angularVelocity = 0;
}
function handleGestureEnd() {
  isMouseDown = false;
  const noZeros = lastVelocities.filter(v => !!v)
  // const angularVelocitySum = noZeros.reduce((a, b) => a + b, 0) / noZeros.length;
  // angularVelocity = lastVelocities.reduce((a, b) => Math.abs(a) > Math.abs(b)? a : b, 0);
  // angularVelocity = Math.max(angularVelocitySum, noZeros[noZeros.length-1])
  angularVelocity = noZeros[noZeros.length-1]
  if(Math.abs(angularVelocity) > 0.03){
    // let it spin!
    spinToHell = true
    angularVelocity = Math.sign(angularVelocity) * 0.3
    swipeText.hide()
  }
}

function handleGestureProgress(currentX){
  if (isMouseDown && previousX) {
    const deltaX = currentX - previousX;
    const velocity = deltaX * 0.005
    lastVelocities.push(velocity)
    if (lastVelocities.length > 10) {
      lastVelocities.shift();
    }
    roundabout.rotation.y += velocity
  }
  previousX = currentX;
}

function handleMouseMove(event) {
  handleGestureProgress(event.clientX)
}

function handleTouchMove(event) {
  handleGestureProgress(event.touches[0].clientX)
}

function handleWindowResize(){
  const windowDims = getWindowDims()

  camera.aspect = windowDims.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize( windowDims.width, windowDims.height );
  secret.setScale()
}

init();
animate();