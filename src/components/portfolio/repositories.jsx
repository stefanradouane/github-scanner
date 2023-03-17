import { useState } from "react";
import { api } from "../api/api";

import React, { useCallback, useRef } from "react";
import { useEffect } from "react";

import threeConfig from "../threejs/three";
import addLightning from "../threejs/addLightning";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import * as THREE from "three";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import createObject from "../threejs/createObject";
import applyVertexColors from "../threejs/applyVertexColors";

export default function Repositories(props) {
  const ref = useRef(null);
  let mouseDown = false;
  let lastId = null;

  // Make canvas
  useEffect(() => {
    const [scene, camera, renderer, variables] = threeConfig(ref.current);

    if (props.user.repos) {
      variables.count = props.user.repos.length;
      init();
      animate();
    }

    function init() {
      addLightning(scene);
      const [geometriesDrawn, geometriesPicking] = createObject(variables);

      variables.objects = geometriesDrawn;

      scene.add(
        new THREE.Mesh(
          BufferGeometryUtils.mergeBufferGeometries(geometriesDrawn),
          variables.defaultMaterial
        )
      );

      variables.pickingScene.add(
        new THREE.Mesh(
          BufferGeometryUtils.mergeBufferGeometries(geometriesPicking),
          variables.pickingMaterial
        )
      );

      scene.add(variables.highlightBox);

      ref.current.appendChild(renderer.domElement);

      ref.current.appendChild(variables.stats.dom);

      renderer.domElement.addEventListener("pointermove", onPointerMove);
    }

    function onPointerMove(e) {
      variables.pointer.x = e.clientX;
      variables.pointer.y = e.clientY;
    }

    function animate() {
      requestAnimationFrame(animate);

      variables.objects.forEach((object) => {});
      render();
      variables.stats.update();
    }

    function pick() {
      //render the picking scene off-screen
      // set the view offset to represent just a single pixel under the mouse
      camera.setViewOffset(
        renderer.domElement.width,
        renderer.domElement.height,
        (variables.pointer.x * window.devicePixelRatio) | 0,
        (variables.pointer.y * window.devicePixelRatio) | 0,
        1,
        1
      );

      // render the scene
      renderer.setRenderTarget(variables.pickingTexture);
      renderer.render(variables.pickingScene, camera);

      // clear the view offset so rendering returns to normal
      camera.clearViewOffset();

      //create buffer for reading single pixel
      const pixelBuffer = variables.pixelBuffer;

      // console.log(pixelBuffer.at(10));

      //read the pixel
      renderer.readRenderTargetPixels(
        variables.pickingTexture,
        0,
        0,
        1,
        1,
        pixelBuffer
      );

      let id = pixelBuffer[2];

      if (lastId == null && id == 0) {
        lastId = null;
        if (mouseDown) {
          ref.current.style.cursor = "grabbing";
        } else {
          ref.current.style.cursor = "grab";
        }
      } else if (lastId == null && id != 0) {
        lastId = id;
        props.setCurrentId(id);
        ref.current.style.cursor = "pointer";
      } else if (lastId !== null && id != 0) {
        lastId = id;
        props.setCurrentId(id);
        ref.current.style.cursor = "pointer";
      } else if (lastId !== null && id == 0) {
        lastId = lastId;
        if (mouseDown) {
          ref.current.style.cursor = "grabbing";
        } else {
          ref.current.style.cursor = "grab";
        }
      }

      let data = variables.pickingData[lastId];

      if (data) {
        //move our highlightBox so that it surrounds the picked object

        if (data.position && data.rotation && data.scale) {
          variables.highlightBox.position.copy(data.position);
          variables.highlightBox.rotation.copy(data.rotation);
          variables.highlightBox.scale.copy(data.scale);

          // Make hightlight bigger
          // variables.highlightBox.scale.copy(data.scale).add(variables.offset);
          variables.highlightBox.visible = true;
          variables.highlightBox.material.opacity = 0.3;
          variables.highlightBox.material.transparent = true;
        }
      } else {
        variables.highlightBox.visible = false;
      }
    }

    function render() {
      variables.controls.update();

      pick();

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onMouseDown() {
      mouseDown = true;
      ref.current.style.cursor = "grabbing";
    }
    function onMouseUp() {
      mouseDown = false;
      ref.current.style.cursor = "grab";
    }

    // Reset useEffect
    return () => {
      window.removeEventListener("resize", onWindowResize);
      ref.current.removeEventListener("mousedown", onMouseDown);
      ref.current.removeEventListener("mouseup", onMouseUp);
      ref.current.removeChild(ref.current.children[0]);
      ref.current.removeChild(ref.current.children[0]);
    };
  }, [props.user.repos]);

  return <div className="portfolio__repos" ref={ref}></div>;
}

// Setup
