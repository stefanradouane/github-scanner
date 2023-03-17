import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import controls from "../threejs/controls";

export default function threeConfig(element) {
  // Make gridhelper
  const gridHelper = new THREE.GridHelper(200, 50);
  const scene = new THREE.Scene();
  // Add gridhelper
  // scene.add(gridHelper);

  const spaceTexture = new THREE.TextureLoader().load("src/assets/space.jpeg");
  scene.background = spaceTexture;

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 2000;

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  // Conifuration scene and camera
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Make reneder
  renderer.render(scene, camera);

  // Other variables
  let variables = {
    container: element,
    count: 10,
    stats: new Stats(),
    controls: controls(camera, renderer),
    pickingTexture: new THREE.WebGLRenderTarget(1, 1, 1),
    pickingScene: new THREE.Scene(),
    highlightBox: new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshLambertMaterial({
        color: new THREE.Color(0x000000),
      })
    ),
    pickingMaterial: new THREE.MeshBasicMaterial({
      vertexColors: true,
    }),
    defaultMaterial: new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      vertexColors: true,
      shininess: 0,
    }),
    pickingData: [],
    pointer: new THREE.Vector2(),
    offset: new THREE.Vector3(10, 10, 10),
    objects: [],
    pixelBuffer: new Uint8Array(4),
  };

  return [scene, camera, renderer, variables];
}
