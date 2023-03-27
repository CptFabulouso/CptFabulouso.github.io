import { createRoundAbout } from "./roundabout.js"

// Add mouse movement and click event listeners
const FRICTION = 0.007;
let previousX = 0;
let angularVelocity = 0;
let lastVelocities = [];
let camera, scene, renderer, roundabout, isMouseDown = false;

function init(){
  // Set up the scene, camera, and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  roundabout = createRoundAbout(renderer)
  
  // Create the ground
  const groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.receiveShadow = true;
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);
  
  // Load the skybox textures
  // const skyboxTextures = [  'textures/skybox/right.jpg',  'textures/skybox/left.jpg',  'textures/skybox/top.jpg',  'textures/skybox/bottom.jpg',  'textures/skybox/front.jpg',  'textures/skybox/back.jpg',];
  
  // Create the skybox
  // const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
  // const skyboxMaterials = skyboxTextures.map((texture) => new THREE.MeshStandardMaterial({
  //   map: new THREE.TextureLoader().load(texture),
  //   side: THREE.BackSide,
  // }));
  // const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
  // scene.add(skybox);
  
  // Position the camera and roundabout
  camera.position.z = 8;
  camera.position.y = 1;
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
  if (!isMouseDown && Math.abs(angularVelocity) > 0.001) {
    angularVelocity *= 1 - FRICTION;
    // console.log({ angularVelocity })

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
  angularVelocity = lastVelocities.reduce((a, b) => Math.abs(a) > Math.abs(b)? a : b, 0);
  // angularVelocity = Math.max(angularVelocitySum, noZeros[noZeros.length-1])
  if(Math.abs(angularVelocity) > 0.03){
    // let it spin!
    angularVelocity = Math.sign(angularVelocity) * 0.3
  }
}

function handleGestureProgress(currentX){
  if (isMouseDown && previousX) {
    const deltaX = currentX - previousX;
    const velocity = deltaX * 0.005
    console.log({velocity})
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
  // if (mouseDown) {
  //   // rotate the cube based on touch movement
  //   cube.rotation.y += event.touches[0].movementX / 100;
  // }
}

function handleWindowResize(){
  console.log({window})
  renderer.setSize(window.innerWidth, window.innerHeight);
}


init();
animate();