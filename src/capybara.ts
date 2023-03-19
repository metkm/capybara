import * as THREE from "three";
import { Mesh } from "three";
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

  capybara.castShadow = true;
  capybara.receiveShadow = true;

  return capybara;
}
