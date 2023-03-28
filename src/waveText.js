import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class WaveText{
  text
  position
  textGeometry
  speed = 0.02;
  amplitude = 0.2;
  wavelength = 2;
  isShowing = false;
  fadeSpeed = 0.06;

  constructor(text, position){
    this.text = text
    this.position = position
  }

  load(callback){
    const loader = new FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/3dgraph@1.1.0/helvetiker.typeface.json', (font) => {
      const geometry = new TextGeometry(this.text, {
        font: font,
        size: 0.8,
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

  show(){
    this.isShowing = true
  }

  update(){
    if(!this.textGeometry){
      return
    }

    if(this.isShowing){
      this.textGeometry.material.transparent = true;
      this.textGeometry.material.opacity += this.fadeSpeed;
      if (this.textGeometry.material.opacity > 1) {
        this.textGeometry.material.opacity = 1;
        this.isShowing = false
      }
    }
    this.textGeometry.position.z += 0.1;
    this.textGeometry.rotation.z += 0.1;
  }
}