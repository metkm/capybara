<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCamera, getCapy, getRenderer } from "./three";
import * as THREE from "three";
import Content from "./components/Content.vue";

import { lerp, scalePercent } from "./utils";

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
  light.position.x = -20;
  light.lookAt(0, 0, 0);
  scene.add(light);
  
  const update = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }

  const handleScroll = () => {
    if (!contentElement.value) return;

    let top = contentElement.value.scrollTop;

    // first page.
    if (top <= 961) {
      let scaledScroll = scalePercent(top, 0, 961);

      let positionx = lerp(-0, -15, scaledScroll);
      let rotationz = lerp(Math.PI * 1.9, Math.PI * 1.7, scaledScroll);
      let positionz = lerp(0, 1.5, scaledScroll);
      capybara.position.x = positionx;
      capybara.rotation.z = rotationz;
      capybara.position.z = positionz;
    } else if (top >= 961) {
      let scaledScroll = scalePercent(top, 961, 961 * 2);
      capybara.rotation.z = lerp(Math.PI * 1.7, Math.PI * 1.2, scalePercent(top, 961, 961 * 2));
      capybara.position.z = lerp(1.5, -1.5, scaledScroll);
    } else if (top >= 961 * 2) {
      // capybara.rotation.z = lerp(-Math.PI * 2, Math.PI, scalePercent(top, 961 * 2, 961 * 3));
    }
  }

  contentElement.value.addEventListener("scroll", handleScroll);
  handleScroll();
  update();
})
</script>

<template>
  <canvas ref="canvasElement" class="fixed top-0 left-0 z-10 pointer-events-none"></canvas>
  <div ref="contentElement" class="snap-y snap-mandatory h-screen overflow-y-auto absolute inset-x-0">
    <Content />
  </div>
</template>
