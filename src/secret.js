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
  // const height = visibleHeightAtZDepth( depth, camera );
  // return height * camera.aspect;
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
    const aspect = window.innerWidth/ window.innerHeight
    const size = Math.min(aspect, 1) * 0.15
    this.secret.scale.x = size
    this.secret.scale.y = size
    
  }

  reveal(){
    this.isShowing = true
    this.secret.material.opacity = 1;
  }

  update() {
    if(!this.secret || !this.isShowing){
      return
    }

    if(this.secret.position.z > 7.9){
      this.secret.position.z = 7.9
      this.isShowing = false
      return
    }
    this.secret.position.z += 0.3
  }

}