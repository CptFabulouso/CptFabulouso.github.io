export default class HollowCylinder {

  constructor(innerRadius, outerRadius, height) {
    // const curve = new THREE.CatmullRomCurve3([
    //   new THREE.Vector3(-1, -1, 0),
    //   new THREE.Vector3(-1, 1, 0),
    //   new THREE.Vector3(1, 1, 0),
    //   new THREE.Vector3(1, -1, 0),
    //   new THREE.Vector3(-1, -1, 0)
    // ]);

    // const radii = [outerRadius, outerRadius];
    // const innerRadii = [innerRadius, innerRadius];

    // const tubeGeometry = new THREE.TubeGeometry(curve, 64, radii, 8, false);
    // const innerTubeGeometry = new THREE.TubeGeometry(curve, 64, innerRadii, 8, false);

    // Cylinder constructor parameters:  
    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight

    const extrudeSettings = {
      amount : height,
      steps : 1,
      bevelEnabled: false,
      curveSegments: 20
  };
  
    const arcShape = new THREE.Shape();
    arcShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, 0, false);
    
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);
  
    const geometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings, {

    });
    return geometry

    // const smallCylinderGeom = new THREE.CylinderGeometry( innerRadius, innerRadius, height, 20, 4 );
    // const largeCylinderGeom = new THREE.CylinderGeometry( outerRadius, outerRadius, height, 20, 4 );
    // const smallCylinderBSP = new ThreeBSP(smallCylinderGeom);
    // const largeCylinderBSP = new ThreeBSP(largeCylinderGeom);
    // const intersectionBSP = largeCylinderBSP.subtract(smallCylinderBSP);      

    // const redMaterial = new THREE.MeshStandardMaterial( { color: 0x363023 } );
    // const hollowCylinder = intersectionBSP.toMesh( redMaterial );
    // return hollowCylinder
  }
}