const visibleHeightAtZDepth = ( depth, camera ) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if ( depth < cameraOffset ) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180; 

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};

const visibleWidthAtZDepth = ( depth, camera ) => {
  const height = visibleHeightAtZDepth( depth, camera );
  console.log({cameraAspect: camera.aspect, wAspect: window.innerWidth / window.innerHeight})
  return height * camera.aspect;
};



export default class Secret {
  isShowing = false
  secret
  visibleHeight
  visibleWidth
  camera

  constructor(camera){
    this.camera = camera
    const secretGeometry =  new THREE.PlaneGeometry(1, 1, 1, 1);
    const secretTexture =  new THREE.TextureLoader().load("src/textures/building.jpeg");
    const secretMaterial = new THREE.MeshStandardMaterial({ map: secretTexture });
    this.secret = new THREE.Mesh(secretGeometry, secretMaterial);

    this.secret.material.transparent = true;
    this.secret.material.opacity = 0;
    this.secret.position.z = -10;
    this.secret.position.y = 3;
    
    this.setScale()
  }

  setScale(){
    const visibleHeight = visibleHeightAtZDepth(7, this.camera)
    const visibleWidth = visibleWidthAtZDepth(7, this.camera)
    const size = Math.min(visibleHeight, visibleWidth)
    console.log({visibleHeight, visibleWidth, size})
    this.secret.geometry.scale.x = size
    this.secret.geometry.scale.y = size
    
  }

  reveal(){
    // this.setScale()
    this.isShowing = true
    this.secret.material.opacity = 1;
  }

  update() {
    if(!this.secret || !this.isShowing){
      return
    }

    const aspectRatio = window.innerWidth / window.innerHeight
    console.log({aspectRatio})
    if(this.secret.position.z > 7){
      this.secret.position.z = 7
      this.isShowing = false
    }
    this.secret.position.z += 0.3
  }

}