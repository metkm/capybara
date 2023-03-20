<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCamera, getCapy, getRenderer } from "./three";
import * as THREE from "three";
import Content from "./components/Content.vue";

const canvasElement = ref<HTMLCanvasElement | null>();
const contentElement = ref<HTMLElement| null>();

onMounted(async () => {
  if (!canvasElement.value || !contentElement.value) return;

  const scene = new THREE.Scene();
  const camera = getCamera();
  const renderer = getRenderer(canvasElement.value, camera);

  const capybara = await getCapy();
  scene.add(capybara);

  const light = new THREE.DirectionalLight("#ffffff", 1);
  light.position.set(0, 10, 10);
  scene.add(light);
  
  const update = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }

  contentElement.value.addEventListener("scroll", () => {
    let top = contentElement.value!.scrollTop;
    
    capybara.position.x = top * -0.014;
    capybara.rotation.z = top * -0.0005;
    camera.position.z = top * -0.002;
  })

  update();
})
</script>

<template>
  <canvas ref="canvasElement" class="fixed top-0 left-0 z-10 pointer-events-none"></canvas>
  <div ref="contentElement" class="snap-y snap-mandatory h-screen overflow-y-auto absolute inset-x-0">
    <Content />
  </div>
</template>
