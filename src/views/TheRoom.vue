<template>
  <Renderer :size="{ w: 600, h: 400 }">
    <Scene>
      <Camera :position="{ z: 15 }"></Camera>
      <Cube :texture="textures[2]" />
    </Scene>
  </Renderer>
</template>

<script>
import { Renderer, Scene, Camera } from "vue-threejs";
import Cube from "./Cube";
import THREE from "three-js";
function setupPanel(gui, ui) {
  const fc = gui.addFolder("Camera");
  fc.add(ui.camera, "x", -50, 50).step(0.01);
  fc.add(ui.camera, "y", -50, 50).step(0.01);
  fc.add(ui.camera, "z", -50, 50).step(0.01);
  fc.open();
}
function getModel() {
  const ui = {
    camera: {
      x: 9,
      y: 26,
      z: 20
    },
    sysKey: 0
  };
  return ui;
}

export default {
  name: "room",
  components: {
    Renderer,
    Scene,
    Camera,
    Cube
  },
  data() {
    const ui = getModel();
    return {
      textures: ["cobblestone", "diamond", "redwool"],
      ui,
      uiSetup: setupPanel,
      size: {
        w: window.innerWidth,
        h: window.innerHeight
      }
    };
  },
  mounted() {
    console.log("2134asd");

    setInterval(() => {
      this.ui.sysKey += 1;
    }, 7000);
  }
};
</script>

<style>
</style>