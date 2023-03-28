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

    const seatsPoleGeometry = new THREE.CylinderGeometry(poleWidth/2, poleWidth/2, height-seatsHeight, 32);
    const seatsPole = new THREE.Mesh(seatsPoleGeometry, poleMaterial);
    const seatsPole2 = new THREE.Mesh(seatsPoleGeometry, poleMaterial);
    seatsPole.position.set(-topCircleRadius+0.2, seatsHeight + (height-seatsHeight)/2, 0);
    seatsPole.castShadow = true;
    seatsPole.receiveShadow = true;
    seatsPole2.position.set(topCircleRadius-0.2, seatsHeight + (height-seatsHeight)/2, 0);
    seatsPole2.castShadow = true;
    seatsPole2.receiveShadow = true;
    roundabout.add(seatsPole);
    roundabout.add(seatsPole2);

    const topBarGeometry = new THREE.CylinderGeometry(0.05, 0.05, topCircleRadius*2, 32);
    const topBar = new THREE.Mesh(topBarGeometry, poleMaterial);
    const topBar2 = new THREE.Mesh(topBarGeometry, poleMaterial);
    topBar.position.y = height-0.1;
    topBar.rotation.x = -Math.PI / 2;
    topBar.rotation.z = -Math.PI / 2;
    topBar2.position.y = height-0.1;
    topBar2.rotation.y = -Math.PI / 2;
    topBar2.rotation.z = -Math.PI / 2;
    roundabout.add(topBar);
    roundabout.add(topBar2);

    const topTorusGeometry = new THREE.TorusGeometry(topCircleRadius, poleWidth, 16, 100);
    const topTorus = new THREE.Mesh(topTorusGeometry, poleMaterial);
    topTorus.position.y = height-0.1;
    topTorus.rotation.x = -Math.PI / 2;
    roundabout.add(topTorus);

    const middleBarGeometry = new THREE.CylinderGeometry(0.05, 0.05, seatsCircleRadius*2, 32);
    const middleBar = new THREE.Mesh(middleBarGeometry, poleMaterial);
    const middleBar2 = new THREE.Mesh(middleBarGeometry, poleMaterial);
    middleBar.position.y = seatsHeight;
    middleBar.rotation.x = -Math.PI / 2;
    middleBar.rotation.z = -Math.PI / 2;
    middleBar2.position.y = seatsHeight;
    middleBar2.rotation.y = -Math.PI / 2;
    middleBar2.rotation.z = -Math.PI / 2;
    roundabout.add(middleBar);
    roundabout.add(middleBar2);

    const seatsGeometry =  new THREE.RingGeometry( topCircleRadius-0.1, seatsCircleRadius+0.1, 32 );
    const seatsMaterial = new THREE.MeshStandardMaterial({ color: 0x363023 });
    const seats = new THREE.Mesh(seatsGeometry, seatsMaterial);
    seats.position.y = seatsHeight + poleWidth/2 + 0.1;
    seats.rotation.x = -Math.PI / 2;
    roundabout.add(seats);

    const underSeatsTorusGeometry = new THREE.TorusGeometry(seatsCircleRadius-poleWidth/2, poleWidth, 16, 100);
    const underSeatsTorus = new THREE.Mesh(underSeatsTorusGeometry, poleMaterial);
    underSeatsTorus.position.y = seatsHeight;
    underSeatsTorus.rotation.x = -Math.PI / 2;
    roundabout.add(underSeatsTorus);

    // Create the bars that attach to the pole and connect to the seats
    // const barGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 32);
    // const barMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    // const numBars = 6;
    // for (let i = 0; i < numBars; i++) {
    //   const angle = (i / numBars) * Math.PI * 2;
    //   const bar = new THREE.Mesh(barGeometry, barMaterial);
    //   bar.castShadow = true;
    //   bar.receiveShadow = true;
    //   bar.position.set(Math.sin(angle) * 1.5, 1.5, Math.cos(angle) * 1.5);
    //   bar.rotation.y = -angle;
    //   roundabout.add(bar);
    // }
    
    // // Create the seats
    // const seatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
    // const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    // const numSeats = 6;
    // for (let i = 0; i < numSeats; i++) {
    //   const angle = (i / numSeats) * Math.PI * 2;
    //   const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    //   seat.castShadow = true;
    //   seat.receiveShadow = true;
    //   seat.position.set(Math.sin(angle) * 1.5, 0.75, Math.cos(angle) * 1.5);
    //   seat.rotation.y = -angle;
    //   roundabout.add(seat);
    // }
  
    roundabout.castShadow = true;

    roundabout.position.x = position?.x || 0;
    roundabout.position.y = position?.y || 0;
    roundabout.position.z = position?.z || 0;
    return roundabout;
  }
}