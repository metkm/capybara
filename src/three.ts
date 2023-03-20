import * as THREE from "three";
import { Mesh, PerspectiveCamera } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();

export const getCapy = async () => {
  const texture = await textureLoader.loadAsync("/capy_material.png");
  const group = await fbxLoader.loadAsync("/capybara.FBX");

  let material = new THREE.MeshStandardMaterial({ map: texture });
  let mesh = group.children[0] as Mesh;

  const capybara = new THREE.Mesh(mesh.geometry, material);
  capybara.rotation.x = -Math.PI / 2;

  return capybara;
}

export const getOrange = async () => {
  const texture = await textureLoader.loadAsync("/orange_material.png");
  const group = await fbxLoader.loadAsync("/orange.FBX");

  let material = new THREE.MeshStandardMaterial({ map: texture });
  let mesh = group.children[0] as Mesh;

  const orange = new THREE.Mesh(mesh.geometry, material);
  orange.geometry.scale(0.02, 0.02, 0.02);
  orange.position.y = 1.3;
  orange.position.x = -1;
  return orange
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
