import * as THREE from "three";

export default function applyVertexColors(geometry, color, index) {
  const position = geometry.attributes.position;
  const colors = [];
  for (let i = 0; i < position.count; i++) {
    colors.push(color.r, color.g, color.b);
  }
  // if (index) {
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  // }
}
