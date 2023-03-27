import { createRoundAbout } from "./roundabout.js"

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const roundabout = createRoundAbout(renderer)

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

// Add mouse movement and click event listeners
const FRICTION = 0.007;
let previousX = 0;
let isMouseDown = false;
let angularVelocity = 0;
let lastVelocities = [];
function handleMouseDown(event) {
  lastVelocities = []
  isMouseDown = true;
  angularVelocity = 0;
}
function handleMouseUp(event) {
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
function handleMouseMove(event) {
  if (isMouseDown && previousX) {
    const deltaX = event.clientX - previousX;
    const velocity = deltaX * 0.005
    console.log({velocity})
    lastVelocities.push(velocity)
    if (lastVelocities.length > 10) {
      lastVelocities.shift();
    }
    roundabout.rotation.y += velocity
  }
  previousX = event.clientX;
}
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousemove', handleMouseMove);

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
animate();