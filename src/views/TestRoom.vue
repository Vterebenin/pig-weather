<template>
  <div id="room-root">
  </div>
</template>

<script>
  import * as THREE from 'three';
  export default {
    mounted() {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize( window.innerWidth, window.innerHeight )
      const rootEl = document.getElementById("room-root")
      rootEl.appendChild(renderer.domElement)


      const geometry = new THREE.BoxGeometry(1,1,1)
      const material = new THREE.MeshBasicMaterial({ color: "red" })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

      }
      animate()

    },
  }
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }
  #room-root {
    padding: 0;
    margin: 0;
    position: relative;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>