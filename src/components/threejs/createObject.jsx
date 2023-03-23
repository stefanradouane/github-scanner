import * as THREE from "three";
import applyVertexColors from "./applyVertexColors";

export default function createObject(variables) {
  const geometriesDrawn = [];
  const geometriesPicking = [];
  const quaternion = new THREE.Quaternion();
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();

  for (let i = 0; i < variables.count; i++) {
    let geometry = new THREE.SphereGeometry(5, 32, 32);

    const position = new THREE.Vector3();
    position.x = Math.random() * 2500 - 1250;
    position.y = Math.random() * 1500 - 750;
    position.z = Math.random() * 2000 - 1000;

    let rotation = new THREE.Euler();
    rotation.x = Math.random() * 2 * Math.PI;
    rotation.y = Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    const scale = new THREE.Vector3();
    if (i != 0) {
      const size = Math.random() * 30 + 15;
      scale.x = size;
      scale.y = size;
      scale.z = size;
    } else {
      scale.x = 0;
      scale.y = 0;
      scale.z = 0;
    }

    quaternion.setFromEuler(rotation);
    matrix.compose(position, quaternion, scale);

    geometry.applyMatrix4(matrix);

    // give the geometry's vertices a random color, to be displayed
    applyVertexColors(geometry, color.setHex(Math.random() * 0xffffff), i);

    geometriesDrawn.push(geometry);

    geometry = geometry.clone();

    // give the geometry's vertices a color corresponding to the "id"
    applyVertexColors(geometry, color.setHex(i), i);

    geometriesPicking.push(geometry);

    variables.pickingData[i] = {
      position: position,
      rotation: rotation,
      scale: scale,
    };
  }

  return [geometriesDrawn, geometriesPicking];
}
