import * as THREE from "three";
import { Mesh, PerspectiveCamera } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export const getCapy = async () => {
  const fbxLoader = new FBXLoader();
  const textureLoader = new THREE.TextureLoader();

  const texture = await textureLoader.loadAsync("./src/assets/capy_material.png");
  const group = await fbxLoader.loadAsync("./src/assets/capybara.FBX");

  let material = new THREE.MeshStandardMaterial({ map: texture });
  material.flatShading = true;
  let mesh = group.children[0] as Mesh;

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const capybara = new THREE.Mesh(mesh.geometry, material);
  capybara.rotateX(-Math.PI / 2);
  capybara.rotateZ(-Math.PI / 8);

  capybara.castShadow = true;
  capybara.receiveShadow = true;

  return capybara;
}

export const getRenderer = (canvas: HTMLCanvasElement, camera: PerspectiveCamera) => {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return renderer;
}

export const getCamera = () => {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
  camera.position.x = -20;
  camera.lookAt(0, 0, 0);

  return camera;
}
