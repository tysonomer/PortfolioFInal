import './style.css'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".square", {
    x: 1000,
    duration: 8,
    scrollTrigger: {
        trigger: ".square",
        start: "top 80%",
        scrub: 4,
        end: () => `+=${document.querySelector(".square").offsetHeight}`,
        toggleActions: "restart none none none",
        markers: true,

    }
})



import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Laoding
const textrureLoader = new THREE.TextureLoader()

const normalTexture = textrureLoader.load('/textures/NormalMap2.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.2
material.roughness = 0.7
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)


// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)





// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
pointLight2.position.set(3.83, 0.8, -3.97)
pointLight2.intensity = 10
scene.add(pointLight2)

// const light1 = gui.addFolder('Light 1')

// gui.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
// gui.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
// gui.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
// gui.add(pointLight2, 'intensity').min(-10).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

const pointLight3 = new THREE.PointLight(0xf5, 2)
pointLight3.position.set(-2.67, 5.27, -1.4)
pointLight3.intensity = 10
scene.add(pointLight3)

// const light2 = gui.addFolder('Light 2')

// gui.add(pointLight3.position, 'x').min(-10).max(10).step(0.01)
// gui.add(pointLight3.position, 'y').min(-10).max(10).step(0.01)
// gui.add(pointLight3.position, 'z').min(-10).max(10).step(0.01)
// gui.add(pointLight3, 'intensity').min(-10).max(10).step(0.01)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)

// const light2Color = {
//     color: 0xff0000
// }

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light2Color.color)
//     })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () => {

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .2 * elapsedTime

    sphere.rotation.y += .02 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .02 * (targetY - sphere.rotation.x)
    sphere.rotation.z += .02 * (targetX - sphere.rotation.x)



    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}



tick()