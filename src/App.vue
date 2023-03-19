<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { getCapy } from "./capybara";

const canvasElement = ref<HTMLCanvasElement | null>();

onMounted(async () => {
  if (!canvasElement.value) return;

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement.value });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(-10, 2, 2);
  camera.lookAt(0, 2, 0);

  const capybara = await getCapy();
  scene.add(capybara);

  const light = new THREE.DirectionalLight("#ffffff", 1);
  light.position.set(0, 10, 10);
  scene.add(light);

  const update = () => {
    // controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }

  update();
})
</script>

<template>
  <canvas ref="canvasElement" class="w-full h-full"></canvas>
</template>
