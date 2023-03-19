<script setup lang="ts">
import { onMounted, ref } from "vue";
import { resizeHandler } from "./utils";
import { getCapy } from "./capybara";
import * as THREE from "three";
import { onScrollAnimation } from "./animation";

const canvasElement = ref<HTMLCanvasElement | null>();
document.addEventListener("scroll", onScrollAnimation);

onMounted(async () => {
  if (!canvasElement.value) return;

  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement.value, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
  camera.position.x = -20;
  camera.lookAt(0, 0, 0);

  const capybara = await getCapy();
  scene.add(capybara);

  const light = new THREE.DirectionalLight("#ffffff", 1);
  light.position.set(0, 10, 10);
  scene.add(light);
  
  resizeHandler(renderer, camera);
  const update = () => {
    capybara.rotation.z += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }

  update();
})
</script>

<template>
  <canvas ref="canvasElement" class="fixed top-0 left-0"></canvas>
  <div class="absolute inset-0 grid place-content-center -z-10 bg-[#002BFB] text-white">
    <p class="base-text animate-fadein">CAPY BARA</p>
    <p class="absolute inset-0 stroke behind-text flex-center">カピバラ</p>
  </div>
</template>
