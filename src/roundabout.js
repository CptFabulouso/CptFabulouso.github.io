import HollowCylinder from "./hollowCylinder.js";

const height = 2
const seatsHeight = 0.4
const topCircleRadius = 2;
const seatsCircleRadius = 4;
const poleWidth = 0.1;

export default class RoundAbout {

  constructor(position) {
    const roundabout = new THREE.Group();
    
    // // Create the pole in the center of the roundabout
    const poleGeometry = new THREE.CylinderGeometry(poleWidth, poleWidth, height, 32);
    const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.set(0, height/2, 0);
    pole.castShadow = true;
    pole.receiveShadow = true;
    roundabout.add(pole);

    const seatsPoleGeometry = new THREE.CylinderGeometry(poleWidth/2, poleWidth/2, height-seatsHeight - poleWidth/2, 32);
    const seatsPole = new THREE.Mesh(seatsPoleGeometry, poleMaterial);
    const seatsPole2 = new THREE.Mesh(seatsPoleGeometry, poleMaterial);
    const seatsPole3 = new THREE.Mesh(seatsPoleGeometry, poleMaterial);
    const seatsPole4 = new THREE.Mesh(seatsPoleGeometry, poleMaterial);
    seatsPole.position.set(-topCircleRadius+0.7, seatsHeight + (height-seatsHeight)/2 - poleWidth/2, 0);
    seatsPole.castShadow = true;
    seatsPole.receiveShadow = true;
    seatsPole2.position.set(topCircleRadius-0.7, seatsHeight + (height-seatsHeight)/2- poleWidth/2, 0);
    seatsPole2.castShadow = true;
    seatsPole2.receiveShadow = true;
    seatsPole3.position.set(0, seatsHeight + (height-seatsHeight)/2- poleWidth/2, topCircleRadius-0.7);
    seatsPole3.castShadow = true;
    seatsPole3.receiveShadow = true;
    seatsPole4.position.set(0, seatsHeight + (height-seatsHeight)/2- poleWidth/2, -topCircleRadius+0.7);
    seatsPole4.castShadow = true;
    seatsPole4.receiveShadow = true;
    roundabout.add(seatsPole);
    roundabout.add(seatsPole2);
    roundabout.add(seatsPole3);
    roundabout.add(seatsPole4);

    const topBarGeometry = new THREE.CylinderGeometry(0.05, 0.05, topCircleRadius*2, 32);
    const topBar = new THREE.Mesh(topBarGeometry, poleMaterial);
    const topBar2 = new THREE.Mesh(topBarGeometry, poleMaterial);
    topBar.position.y = height-0.1;
    topBar.rotation.x = -Math.PI / 2;
    topBar.rotation.z = -Math.PI / 2;
    topBar.castShadow = true;
    topBar.receiveShadow = true;
    topBar2.position.y = height-0.1;
    topBar2.rotation.y = -Math.PI / 2;
    topBar2.rotation.z = -Math.PI / 2;
    topBar2.castShadow = true;
    topBar2.receiveShadow = true;
    roundabout.add(topBar);
    roundabout.add(topBar2);

    const topTorusGeometry = new THREE.TorusGeometry(topCircleRadius, poleWidth, 16, 100);
    const topTorus = new THREE.Mesh(topTorusGeometry, poleMaterial);
    topTorus.position.y = height-0.1;
    topTorus.rotation.x = -Math.PI / 2;
    topTorus.castShadow = true;
    topTorus.receiveShadow = true;
    roundabout.add(topTorus);

    const middleBarGeometry = new THREE.CylinderGeometry(0.05, 0.05, seatsCircleRadius*2, 32);
    const middleBar = new THREE.Mesh(middleBarGeometry, poleMaterial);
    const middleBar2 = new THREE.Mesh(middleBarGeometry, poleMaterial);
    middleBar.position.y = seatsHeight;
    middleBar.rotation.x = -Math.PI / 2;
    middleBar.rotation.z = -Math.PI / 2;
    middleBar.castShadow = true;
    middleBar.receiveShadow = true;
    middleBar2.position.y = seatsHeight;
    middleBar2.rotation.y = -Math.PI / 2;
    middleBar2.rotation.z = -Math.PI / 2;
    middleBar2.castShadow = true;
    middleBar2.receiveShadow = true;
    roundabout.add(middleBar);
    roundabout.add(middleBar2);

    const seatsCylinder = new HollowCylinder(topCircleRadius-0.1, seatsCircleRadius+0.1, 0.05);
    const seatsMaterial = new THREE.MeshStandardMaterial({ color: 0x363023 });
    const seats = new THREE.Mesh(seatsCylinder, seatsMaterial);
    seats.position.y = seatsHeight + poleWidth/2 + 0.1;
    seats.rotation.x = -Math.PI / 2;
    seats.castShadow = true;
    seats.receiveShadow = true;
    roundabout.add(seats);

    const underSeatsTorusGeometry = new THREE.TorusGeometry(seatsCircleRadius-poleWidth/2, poleWidth, 16, 100);
    const underSeatsTorus = new THREE.Mesh(underSeatsTorusGeometry, poleMaterial);
    underSeatsTorus.position.y = seatsHeight;
    underSeatsTorus.rotation.x = -Math.PI / 2;
    underSeatsTorus.castShadow = true;
    underSeatsTorus.receiveShadow = true;
    roundabout.add(underSeatsTorus);

    roundabout.position.x = position?.x || 0;
    roundabout.position.y = position?.y || 0;
    roundabout.position.z = position?.z || 0;
    return roundabout;
  }
}