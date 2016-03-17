/// <reference path="_reference.ts"/>
// MAIN GAME FILE
//Author’s name:        Vishal Guleria (300813391) & Vinay Bhardwaj (300825097)
//Date last Modified    March 18,2016
//Program description   Assignment 3 - Battle Truck : Saving abandoned soldiers.
//Revision History      v2
// THREEJS Aliases
var Scene = Physijs.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var LineBasicMaterial = THREE.LineBasicMaterial;
var PhongMaterial = THREE.MeshPhongMaterial;
var Material = THREE.Material;
var Texture = THREE.Texture;
var Line = THREE.Line;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
var Clock = THREE.Clock;
//Custom Game Objects
var gameObject = objects.gameObject;
// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var havePointerLock;
    var element;
    var scene = new Scene(); // Instantiate Scene Object
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var blocker;
    var instructions;
    var spotLight;
    var groundGeometry;
    var groundPhysicsMaterial;
    var groundMaterial;
    var frontMaterial;
    var ground;
    var groundTexture;
    var glassTexture;
    var bodyTexture;
    var frontTexture;
    var lLightTexture;
    var rLightTexture;
    var breakLightTexture;
    var groundTextureNormal;
    var frontTextureNormal;
    var clock;
    var playerGeometry1;
    var playerGeometry;
    var playerGeometrya;
    var playerGeometryb;
    var playerGeometryc;
    var playerGeometryd;
    var playerGeometrye;
    var playerMaterial;
    var playerMaterial1;
    var playerMateriala;
    var playerMaterialb;
    var playerMaterialc;
    var playerMateriald;
    var playerMateriale;
    var player;
    var player1;
    var playera;
    var playerb;
    var playerc;
    var playerd;
    var playere;
    var playerf;
    var sphereGeometry;
    var sphereMaterial;
    var sphere;
    var keyboardControls;
    var mouseControls;
    var isGrounded;
    var velocity = new Vector3(0, 0, 0);
    var prevTime = 0;
    var directionLineMaterial;
    var directionLineGeometry;
    var directionLine;
    function init() {
        // Create to HTMLElements
        blocker = document.getElementById("blocker");
        instructions = document.getElementById("instructions");
        //check to see if pointerlock is supported
        havePointerLock = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;
        // Instantiate Game Controls
        keyboardControls = new objects.KeyboardControls();
        mouseControls = new objects.MouseControls();
        // Check to see if we have pointerLock
        if (havePointerLock) {
            element = document.body;
            instructions.addEventListener('click', function () {
                // Ask the user for pointer lock
                console.log("Requesting PointerLock");
                element.requestPointerLock = element.requestPointerLock ||
                    element.mozRequestPointerLock ||
                    element.webkitRequestPointerLock;
                element.requestPointerLock();
            });
            document.addEventListener('pointerlockchange', pointerLockChange);
            document.addEventListener('mozpointerlockchange', pointerLockChange);
            document.addEventListener('webkitpointerlockchange', pointerLockChange);
            document.addEventListener('pointerlockerror', pointerLockError);
            document.addEventListener('mozpointerlockerror', pointerLockError);
            document.addEventListener('webkitpointerlockerror', pointerLockError);
        }
        // Scene changes for Physijs
        scene.name = "Main";
        scene.fog = new THREE.Fog(0xffffff, 0, 750);
        scene.setGravity(new THREE.Vector3(0, -10, 0));
        scene.addEventListener('update', function () {
            scene.simulate(undefined, 2);
        });
        // setup a THREE.JS Clock object
        clock = new Clock();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        // Spot Light
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(20, 40, -15);
        spotLight.castShadow = true;
        spotLight.intensity = 2;
        spotLight.lookAt(new Vector3(0, 0, 0));
        spotLight.shadowCameraNear = 2;
        spotLight.shadowCameraFar = 200;
        spotLight.shadowCameraLeft = -5;
        spotLight.shadowCameraRight = 5;
        spotLight.shadowCameraTop = 5;
        spotLight.shadowCameraBottom = -5;
        spotLight.shadowMapWidth = 2048;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowDarkness = 0.5;
        spotLight.name = "Spot Light";
        scene.add(spotLight);
        console.log("Added spotLight to scene");
        // Ground Object
        groundTexture = new THREE.TextureLoader().load('../../Assets/images/GravelCobble.jpg');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(8, 8);
        // Truck Body Object
        bodyTexture = new THREE.TextureLoader().load('../../Assets/images/Body.jpg');
        bodyTexture.wrapS = THREE.RepeatWrapping;
        bodyTexture.wrapT = THREE.RepeatWrapping;
        bodyTexture.repeat.set(2, 2);
        // Bruck bonnut Object
        frontTexture = new THREE.TextureLoader().load('../../Assets/images/Front.jpg');
        frontTexture.wrapS = THREE.RepeatWrapping;
        frontTexture.wrapT = THREE.RepeatWrapping;
        frontTexture.repeat.set(1, 1);
        frontTextureNormal = new THREE.TextureLoader().load('../../Assets/images/FrontNormal.png');
        frontTextureNormal.wrapS = THREE.RepeatWrapping;
        frontTextureNormal.wrapT = THREE.RepeatWrapping;
        frontTextureNormal.repeat.set(1, 1);
        frontMaterial = new PhongMaterial();
        frontMaterial.map = frontTexture;
        frontMaterial.bumpMap = frontTextureNormal;
        frontMaterial.bumpScale = 0.2;
        // Truck Windshield Object
        glassTexture = new THREE.TextureLoader().load('../../Assets/images/Glass.jpg');
        glassTexture.wrapS = THREE.RepeatWrapping;
        glassTexture.wrapT = THREE.RepeatWrapping;
        glassTexture.repeat.set(1, 1);
        // Left headlight Object
        lLightTexture = new THREE.TextureLoader().load('../../Assets/images/leftLight.png');
        lLightTexture.wrapS = THREE.RepeatWrapping;
        lLightTexture.wrapT = THREE.RepeatWrapping;
        lLightTexture.repeat.set(1, 1);
        // Right Headlight Object
        rLightTexture = new THREE.TextureLoader().load('../../Assets/images/rightLight.png');
        rLightTexture.wrapS = THREE.RepeatWrapping;
        rLightTexture.wrapT = THREE.RepeatWrapping;
        rLightTexture.repeat.set(1, 1);
        // Brak Lights Object
        breakLightTexture = new THREE.TextureLoader().load('../../Assets/images/breakLight.png');
        breakLightTexture.wrapS = THREE.RepeatWrapping;
        breakLightTexture.wrapT = THREE.RepeatWrapping;
        breakLightTexture.repeat.set(1, 1);
        groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/GravelCobbleNormal.jpg');
        groundTextureNormal.wrapS = THREE.RepeatWrapping;
        groundTextureNormal.wrapT = THREE.RepeatWrapping;
        groundTextureNormal.repeat.set(8, 8);
        groundMaterial = new PhongMaterial();
        groundMaterial.map = groundTexture;
        groundMaterial.bumpMap = groundTextureNormal;
        groundMaterial.bumpScale = 0.2;
        groundGeometry = new BoxGeometry(32, 1, 32);
        groundPhysicsMaterial = Physijs.createMaterial(groundMaterial, 0, 0);
        ground = new Physijs.ConvexMesh(groundGeometry, groundPhysicsMaterial, 0);
        ground.receiveShadow = true;
        ground.name = "Ground";
        scene.add(ground);
        console.log("Added Burnt Ground to scene");
        // Universal Tire Object
        playerGeometry = new SphereGeometry(2, 32, 32);
        playerMaterial = Physijs.createMaterial(new PhongMaterial({ color: 0x000000 }), 0.4, 0);
        player = new Physijs.SphereMesh(playerGeometry, playerMaterial, 1);
        player.position.set(0, 30, 10);
        player.receiveShadow = true;
        player.castShadow = true;
        player.name = "Player";
        scene.add(player);
        console.log("Added Player to Scene");
        // Truck Body Object
        playerGeometry1 = new BoxGeometry(5, 5, 5);
        playerMaterial1 = Physijs.createMaterial(frontMaterial, 0, 0);
        player1 = new Physijs.BoxMesh(playerGeometry1, playerMaterial1, 1);
        player1.position.set(0, 2.5, 1.5);
        player1.receiveShadow = true;
        player1.castShadow = true;
        player1.name = "Player2";
        player.add(player1);
        console.log("Added Player1 to Scene");
        // Truck Bonnut Object
        playerGeometrya = new BoxGeometry(5, 3, 3);
        playerMateriala = Physijs.createMaterial(new PhongMaterial({ map: frontTexture }), 0.4, 0);
        playera = new Physijs.ConvexMesh(playerGeometrya, playerMateriala, 0);
        playera.position.set(0, -1, -4);
        playera.receiveShadow = true;
        playera.castShadow = true;
        playera.name = "Player2";
        player1.add(playera);
        console.log("Added Player1 to Scene");
        // Truck Windshield Object
        playerGeometryb = new BoxGeometry(5, 2, 0.01);
        playerMaterialb = Physijs.createMaterial(new PhongMaterial({ map: glassTexture }), 0.4, 0);
        playerb = new Physijs.BoxMesh(playerGeometryb, playerMaterialb, 1);
        playerb.position.set(0, 1.5, -2.5);
        playerb.receiveShadow = true;
        playerb.castShadow = true;
        playerb.name = "Playerb";
        player1.add(playerb);
        console.log("Added Player1 to Scene");
        // Truck Headlight Object
        playerGeometryc = new BoxGeometry(1, .5, 0.01);
        playerMaterialc = Physijs.createMaterial(new PhongMaterial({ map: lLightTexture }), 0.4, 0);
        playerMateriald = Physijs.createMaterial(new PhongMaterial({ map: rLightTexture }), 0.4, 0);
        playerc = new Physijs.BoxMesh(playerGeometryc, playerMaterialc, 1);
        playerc.position.set(1.5, -1.5, -5.5);
        playerc.receiveShadow = true;
        playerc.castShadow = true;
        playerc.name = "Player2";
        player1.add(playerc);
        console.log("Added Player1 to Scene");
        playerd = new Physijs.BoxMesh(playerGeometryc, playerMateriald, 1);
        playerd.position.set(-1.5, -1.5, -5.5);
        playerd.receiveShadow = true;
        playerd.castShadow = true;
        playerd.name = "Player2";
        player1.add(playerd);
        console.log("Added Player1 to Scene");
        // Truck Break lights Object
        playerGeometrye = new BoxGeometry(1, .5, 0.01);
        playerMateriale = Physijs.createMaterial(new PhongMaterial({ map: breakLightTexture }), 0.4, 0);
        playere = new Physijs.BoxMesh(playerGeometrye, playerMateriale, 1);
        playere.position.set(-1.5, -1.5, 2.5);
        playere.receiveShadow = true;
        playere.castShadow = true;
        playere.name = "Player2";
        player1.add(playere);
        console.log("Added Player1 to Scene");
        playerf = new Physijs.BoxMesh(playerGeometrye, playerMateriale, 1);
        playerf.position.set(1.5, -1.5, 2.5);
        playerf.receiveShadow = true;
        playerf.castShadow = true;
        playerf.name = "Player2";
        player1.add(playerf);
        console.log("Added Player1 to Scene");
        // Collision Check
        player.addEventListener('collision', function (event) {
            console.log(event);
            if (event.name === "Ground") {
                console.log("player hit the ground");
                isGrounded = true;
            }
            if (event.name === "Sphere") {
                console.log("player hit the sphere");
            }
        });
        // Add DirectionLine
        directionLineMaterial = new LineBasicMaterial({ color: 0xffff00 });
        directionLineGeometry = new Geometry();
        directionLineGeometry.vertices.push(new Vector3(0, 0, 0)); // line origin
        directionLineGeometry.vertices.push(new Vector3(0, 0, -50)); // end of the line
        directionLine = new Line(directionLineGeometry, directionLineMaterial);
        player.add(directionLine);
        console.log("Added DirectionLine to the Player");
        // create parent-child relationship with camera and player
        playerb.add(camera);
        camera.position.set(0, 1.5, -2.5);
        // add controls
        gui = new GUI();
        control = new Control();
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        scene.simulate();
        window.addEventListener('resize', onWindowResize, false);
    }
    //PointerLockChange Event Handler
    function pointerLockChange(event) {
        if (document.pointerLockElement === element) {
            // enable our mouse and keyboard controls
            keyboardControls.enabled = true;
            mouseControls.enabled = true;
            blocker.style.display = 'none';
        }
        else {
            // disable our mouse and keyboard controls
            keyboardControls.enabled = false;
            mouseControls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
            console.log("PointerLock disabled");
        }
    }
    //PointerLockError Event Handler
    function pointerLockError(event) {
        instructions.style.display = '';
        console.log("PointerLock Error Detected!!");
    }
    // Window Resize Event Handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
    }
    // Add Frame Rate Stats to the Scene
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        checkControls();
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Check Controls Function
    function checkControls() {
        if (keyboardControls.enabled) {
            velocity = new Vector3();
            var time = performance.now();
            var delta = (time - prevTime) / 1000;
            var direction = new Vector3(0, 0, 0);
            if (keyboardControls.moveForward) {
                velocity.z -= 400.0 * delta;
            }
            if (keyboardControls.moveLeft) {
                velocity.x -= 400.0 * delta;
            }
            if (keyboardControls.moveBackward) {
                velocity.z += 400.0 * delta;
            }
            if (keyboardControls.moveRight) {
                velocity.x += 400.0 * delta;
            }
            if (isGrounded) {
                if (keyboardControls.jump) {
                    velocity.y += 4000.0 * delta;
                    if (player.position.y > 4) {
                        isGrounded = false;
                    }
                }
            }
            player.setDamping(0.7, 0.1);
            // Changing player's rotation
            player.setAngularVelocity(new Vector3(0, mouseControls.yaw, 0));
            direction.addVectors(direction, velocity);
            direction.applyQuaternion(player.quaternion);
            if (Math.abs(player.getLinearVelocity().x) < 20 && Math.abs(player.getLinearVelocity().y) < 10) {
                player.applyCentralForce(direction);
            }
            cameraLook();
            // isGrounded ends
            //reset Pitch and Yaw
            mouseControls.pitch = 0;
            mouseControls.yaw = 0;
            prevTime = time;
        } // Controls Enabled ends
        else {
            player.setAngularVelocity(new Vector3(0, 0, 0));
        }
    }
    // Camera Look function
    function cameraLook() {
        var zenith = THREE.Math.degToRad(90);
        var nadir = THREE.Math.degToRad(-90);
        var cameraPitch = camera.rotation.x + mouseControls.pitch;
        // Constrain the Camera Pitch
        camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        //  camera.position.set(0, 10, 30);
        //  camera.lookAt(new Vector3(0, 0,0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
