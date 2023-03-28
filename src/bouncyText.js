import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class BouncyText {
  bounceHeight = 0.5;
  gravity = 0.005;
  fadeSpeed = 0.06;
  velocity = 0;
  acceleration = 0;
  textGeometry
  text
  position
  isHiding = false

  constructor(textToShow, position) {
    this.text = textToShow
    this.position = position
  }

  load(callback){
    const loader = new FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/3dgraph@1.1.0/helvetiker.typeface.json', (font) => {
      const geometry = new TextGeometry(this.text, {
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelSegments: 5
      });
      geometry.center()
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      this.textGeometry = new THREE.Mesh(geometry, material);
      this.textGeometry.position.x = this.position?.x || 0;
      this.textGeometry.position.y = this.position?.y || 0;
      this.textGeometry.position.z = this.position?.z || 0;
      callback(this.textGeometry)
    })
  }

  hide(){
    this.isHiding = true
  }

  update() {
    if(!this.textGeometry){
      return
    }

    if(this.isHiding){
      this.textGeometry.material.transparent = true;
      this.textGeometry.material.opacity -= this.fadeSpeed;
      if (this.textGeometry.material.opacity < 0) {
        this.textGeometry.material.opacity = 0;
        this.isHiding = false
      }
    }
    this.acceleration = -this.gravity;
    this.velocity += this.acceleration;
    this.textGeometry.position.y += this.velocity;
    if (this.position.y - this.textGeometry.position.y > this.bounceHeight) {
      this.textGeometry.position.y = this.position.y - this.bounceHeight;
      this.velocity *= -1;
    }
  }
}