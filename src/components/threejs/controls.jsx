import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

export default function controls(camera, renderer) {
  let controls = new OrbitControls(camera, renderer.domElement);
  controls = new TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 50;
  controls.panSpeed = 1;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  //   controls.dynamicDampingFactor = 0.3;

  return controls;
}
