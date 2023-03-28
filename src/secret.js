export default class Secret {
  isShowing = false
  secret

  constructor(){
    const secretGeometry =  new THREE.PlaneGeometry(1, 1, 1, 1);
    const secretTexture =  new THREE.TextureLoader().load("src/textures/building.jpeg");
    const secretMaterial = new THREE.MeshStandardMaterial({ map: secretTexture });
    this.secret = new THREE.Mesh(secretGeometry, secretMaterial);

    this.secret.material.transparent = true;
    this.secret.material.opacity = 0;
    this.secret.position.z = -10;
    this.secret.position.y = 3;
  }

  reveal(){
    this.isShowing = true
    this.secret.material.opacity = 1;
  }

  update() {
    if(!this.secret || !this.isShowing){
      return
    }

    if(this.secret.position.z > 7){
      this.secret.position.z = 7
      this.isShowing = false
    }
    this.secret.position.z += 0.3
  }

}