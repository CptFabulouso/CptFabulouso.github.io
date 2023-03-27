function createRoundAbout(renderer) {
  const roundabout = new THREE.Group();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Create the base of the roundabout
  const baseGeometry = new THREE.CylinderGeometry(3, 3, 0.4, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.castShadow = true;
  base.receiveShadow = true;
  roundabout.add(base);
  
  // Create the pole in the center of the roundabout
  const poleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.set(0, 1.5, 0);
  pole.castShadow = true;
  pole.receiveShadow = true;
  roundabout.add(pole);
  
  // Create the bars that attach to the pole and connect to the seats
  const barGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 32);
  const barMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const numBars = 6;
  for (let i = 0; i < numBars; i++) {
    const angle = (i / numBars) * Math.PI * 2;
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.castShadow = true;
    bar.receiveShadow = true;
    bar.position.set(Math.sin(angle) * 1.5, 1.5, Math.cos(angle) * 1.5);
    bar.rotation.y = -angle;
    roundabout.add(bar);
  }
  
  // Create the seats
  const seatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const numSeats = 6;
  for (let i = 0; i < numSeats; i++) {
    const angle = (i / numSeats) * Math.PI * 2;
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.castShadow = true;
    seat.receiveShadow = true;
    seat.position.set(Math.sin(angle) * 1.5, 0.75, Math.cos(angle) * 1.5);
    seat.rotation.y = -angle;
    roundabout.add(seat);
  }

  roundabout.castShadow = true;
  return roundabout;
}

export { createRoundAbout }
// module.exports = createRoundAbout