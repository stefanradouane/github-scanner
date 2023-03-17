import * as THREE from "three";

export default function addLightning(scene) {
  // Add lignthing
  const pointLight = new THREE.PointLight(0xffffff);
  // new THREE.SpotLight(0xffffff, 1.5)
  // Spotlight.position.set(0, 500, 2000);
  pointLight.position.set(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  // new THREE.AmbientLight(0x555555)
  scene.add(pointLight, ambientLight);

  // Make lighthelper
  const lightHelper = new THREE.PointLightHelper(pointLight);
  // Add lighthelper
  // scene.add(lightHelper);
}
