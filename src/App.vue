<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCamera, getCapy, getOrange, getRenderer } from "./three";
import * as THREE from "three";
import Content from "./components/Content.vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { lerp, scalePercent } from "./utils";

const canvasElement = ref<HTMLCanvasElement | null>();
const contentElement = ref<HTMLElement| null>();

onMounted(async () => {
  if (!canvasElement.value || !contentElement.value) return;

  const scene = new THREE.Scene();
  const camera = getCamera();
  const renderer = getRenderer(canvasElement.value, camera);

  const capybara = await getCapy();
  const orange = await getOrange();
  const capyandorange = new THREE.Group();
  capyandorange.add(capybara);
  capyandorange.add(orange);

  scene.add(capyandorange)

  const light = new THREE.DirectionalLight("#ffffff", 1);
  light.position.x = -20;
  light.lookAt(0, 0, 0);
  scene.add(light);

  const orbitControls = new OrbitControls(camera, canvasElement.value);
  
  const update = () => {
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }

  const handleScroll = () => {
    if (!contentElement.value) return;

    let top = contentElement.value.scrollTop;
    let pageHeight = contentElement.value.clientHeight;

    // first page.
    if (top <= pageHeight) {
      let scaledScroll = scalePercent(top, 0, pageHeight);

      capyandorange.position.x = lerp(-0, -15, scaledScroll);
      capyandorange.position.z = lerp(0, 1.5, scaledScroll);
      capyandorange.rotation.y = lerp(-Math.PI * 2.2, -Math.PI * 2.1, scaledScroll);
    } else if (top >= pageHeight) {
      let scaledScroll = scalePercent(top, pageHeight, pageHeight * 2);
      capyandorange.position.z = lerp(1.5, -1.5, scaledScroll);
      capyandorange.rotation.y = lerp(-Math.PI * 2.1, -Math.PI * 2.8, scaledScroll);
    } else if (top >= pageHeight * 2) {
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
