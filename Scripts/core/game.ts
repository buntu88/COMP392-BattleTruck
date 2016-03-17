/// <reference path="_reference.ts"/>

// MAIN GAME FILE
//Author’s name:        Vishal Guleria (300813391) & Vinay Bhardwaj (300825097)
//Date last Modified    March 18,2016
//Program description   Assignment 3 - Battle Truck : Saving abandoned soldiers.
//Revision History      v2

// THREEJS Aliases
import Scene = Physijs.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import LineBasicMaterial = THREE.LineBasicMaterial;
import PhongMaterial = THREE.MeshPhongMaterial;
import Material = THREE.Material;
import Texture = THREE.Texture;
import Line = THREE.Line;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
import Clock = THREE.Clock;

//Custom Game Objects
import gameObject = objects.gameObject;

// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";


// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var havePointerLock: boolean;
    var element: any;
    var scene: Scene = new Scene(); // Instantiate Scene Object
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var blocker: HTMLElement;
    var instructions: HTMLElement;
    var spotLight: SpotLight;
    var ambientLight: AmbientLight;
    var groundGeometry: CubeGeometry;
    var groundPhysicsMaterial: Physijs.Material;
    var groundMaterial: PhongMaterial;
    var frontMaterial: PhongMaterial;
    var ground: Physijs.Mesh;
    var groundTexture: Texture;
    var glassTexture: Texture;
    var bodyTexture: Texture;
    var frontTexture: Texture;
    var lLightTexture: Texture;
    var rLightTexture: Texture;
    var breakLightTexture: Texture;
    var groundTextureNormal: Texture;
    var frontTextureNormal: Texture;
    var clock: Clock;
    var cubeTexture: Texture;
    var cubeTextureNormal: Texture;
    var destructiveMaterial: Physijs.Material;
    var destructiveMaterialPhong: PhongMaterial;
    var destructiveWallTexture: Texture;
    var destructiveWallTextureNormal: Texture;
    var minesTexture: Texture;
    var minesTextureNormal: Texture;
    var mineMaterial: Physijs.Material;
    var mineMaterialPhong: PhongMaterial;
    var cubeBoundary1: Physijs.Mesh;
    var cubeBoundary2: Physijs.Mesh;
    var cubeBoundary3: Physijs.Mesh;
    var cubeBoundary4: Physijs.Mesh;
    var cubeInnerWall1: Physijs.Mesh;
    var cubeInnerWall2: Physijs.Mesh;
    var cubeInnerWall3: Physijs.Mesh;
    var cubeInnerWall4: Physijs.Mesh;
    var cubeMines: Physijs.Mesh;

    var cubeGeometryB1: CubeGeometry;
    var cubeGeometryB2: CubeGeometry;
    var cubeGeometryB3: CubeGeometry;
    var cubeGeometryB4: CubeGeometry;
    var cubeGeometryIW1: CubeGeometry;
    var cubeGeometryIW2: CubeGeometry;
    var cubeGeometryIW3: CubeGeometry;
    var cubeGeometryIW4: CubeGeometry;
    var cubeGeometryMines: CubeGeometry;


    var cubeMaterialBase: Physijs.Material;
    var cubeMaterial: PhongMaterial;
    var playerGeometry1: CubeGeometry;
    var playerGeometry: SphereGeometry;
    var playerGeometrya: CubeGeometry;
    var playerGeometryb: CubeGeometry;
    var playerGeometryc: CubeGeometry;
    var playerGeometryd: CubeGeometry;
    var playerGeometrye: CubeGeometry;
    var playerMaterial: Physijs.Material;
    var playerMaterial1: Physijs.Material;
    var playerMateriala: Physijs.Material;
    var playerMaterialb: Physijs.Material;
    var playerMaterialc: Physijs.Material;
    var playerMateriald: Physijs.Material;
    var playerMateriale: Physijs.Material;
    var player: Physijs.Mesh;
    var player1: Physijs.Mesh;
    var playera: Physijs.Mesh;
    var playerb: Physijs.Mesh;
    var playerc: Physijs.Mesh;
    var playerd: Physijs.Mesh;
    var playere: Physijs.Mesh;
    var playerf: Physijs.Mesh;
    var sphereGeometry: SphereGeometry;
    var sphereMaterial: Physijs.Material;
    var sphere: Physijs.Mesh;
    var keyboardControls: objects.KeyboardControls;
    var mouseControls: objects.MouseControls;
    var isGrounded: boolean;
    var velocity: Vector3 = new Vector3(0, 0, 0);
    var prevTime: number = 0;
    var directionLineMaterial: LineBasicMaterial;
    var directionLineGeometry: Geometry;
    var directionLine: Line;

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

            instructions.addEventListener('click', () => {

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

        scene.addEventListener('update', () => {
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



        // Ground Object
        groundTexture = new THREE.TextureLoader().load('../../Assets/images/GravelCobble.jpg');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(8, 8);

        groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/GravelCobbleNormal.jpg');
        groundTextureNormal.wrapS = THREE.RepeatWrapping;
        groundTextureNormal.wrapT = THREE.RepeatWrapping;
        groundTextureNormal.repeat.set(8, 8);

        groundMaterial = new PhongMaterial();
        groundMaterial.map = groundTexture;
        groundMaterial.bumpMap = groundTextureNormal;
        groundMaterial.bumpScale = 0.2;

        groundGeometry = new BoxGeometry(60, 0, 60);
        groundPhysicsMaterial = Physijs.createMaterial(groundMaterial, 0, 0);
        ground = new Physijs.ConvexMesh(groundGeometry, groundPhysicsMaterial, 0);
        ground.receiveShadow = true;
        ground.name = "Ground";
        scene.add(ground);
        console.log("Added Burnt Ground to scene");


        cubeTexture = new THREE.TextureLoader().load('../../Assets/images/wall.jpg');
        cubeTexture.wrapS = THREE.RepeatWrapping;
        cubeTexture.wrapT = THREE.RepeatWrapping;
        cubeTexture.repeat.set(6, 6);

        cubeTextureNormal = new THREE.TextureLoader().load('../../Assets/images/wallnormal.png')
        cubeTextureNormal.wrapS = THREE.RepeatWrapping;
        cubeTextureNormal.wrapT = THREE.RepeatWrapping;
        cubeTextureNormal.repeat.set(6, 6);

        cubeMaterial = new PhongMaterial();
        cubeMaterial.map = cubeTexture;
        cubeMaterial.bumpMap = cubeTextureNormal;
        cubeMaterial.bumpScale = 0.2;
        cubeMaterialBase = Physijs.createMaterial(cubeMaterial, 0, 0);

        //MATERIAL FOR DESTRUCTIVE WALLS
        destructiveWallTexture = new THREE.TextureLoader().load('../../Assets/images/whitewall.jpg');
        destructiveWallTexture.wrapS = THREE.RepeatWrapping;
        destructiveWallTexture.wrapT = THREE.RepeatWrapping;
        destructiveWallTexture.repeat.set(1, 1);

        destructiveWallTextureNormal = new THREE.TextureLoader().load('../../Assets/images/whitewallnormal.png')
        destructiveWallTextureNormal.wrapS = THREE.RepeatWrapping;
        destructiveWallTextureNormal.wrapT = THREE.RepeatWrapping;
        destructiveWallTextureNormal.repeat.set(1, 1);

        destructiveMaterialPhong = new PhongMaterial();
        destructiveMaterialPhong.map = destructiveWallTexture;
        destructiveMaterialPhong.bumpMap = destructiveWallTextureNormal;
        destructiveMaterialPhong.bumpScale = 0.2;
        destructiveMaterial = Physijs.createMaterial(destructiveMaterialPhong, 0, 0);
        
        
        //MATERIAL FOR MINES
        minesTexture = new THREE.TextureLoader().load('../../Assets/images/mine.jpg');
        minesTexture.wrapS = THREE.RepeatWrapping;
        minesTexture.wrapT = THREE.RepeatWrapping;
        minesTexture.repeat.set(1, 1);

        minesTextureNormal = new THREE.TextureLoader().load('../../Assets/images/minenormal.png')
        minesTextureNormal.wrapS = THREE.RepeatWrapping;
        minesTextureNormal.wrapT = THREE.RepeatWrapping;
        minesTextureNormal.repeat.set(1, 1);

        mineMaterialPhong = new PhongMaterial();
        mineMaterialPhong.map = minesTexture;
        mineMaterialPhong.bumpMap = minesTextureNormal;
        mineMaterialPhong.bumpScale = 0.2;
        mineMaterial = Physijs.createMaterial(mineMaterialPhong, 0, 0);



        //ADDING BOUNDARY WALLS
        cubeGeometryB1 = new BoxGeometry(60, 8, 1);
        cubeBoundary1 = new Physijs.ConvexMesh(cubeGeometryB1, cubeMaterialBase, 0);
        cubeBoundary1.receiveShadow = true;
        cubeBoundary1.position.set(0, 4, -29.5);
        cubeBoundary1.name = "Boundary";
        scene.add(cubeBoundary1);
        console.log("Added Burnt Ground to scene");

        cubeGeometryB2 = new BoxGeometry(60, 8, 1);
        cubeBoundary2 = new Physijs.ConvexMesh(cubeGeometryB2, cubeMaterialBase, 0);
        cubeBoundary2.castShadow = true;
        cubeBoundary2.receiveShadow = true;
        cubeBoundary2.name = "Boundary";
        cubeBoundary2.position.x = 0;
        cubeBoundary2.position.y = 4;
        cubeBoundary1.name = "Boundary";
        cubeBoundary2.position.z = 29.5;
        scene.add(cubeBoundary2);

        cubeGeometryB3 = new BoxGeometry(58, 8, 1);
        cubeBoundary3 = new Physijs.ConvexMesh(cubeGeometryB3, cubeMaterialBase, 0);
        cubeBoundary3.castShadow = true;
        cubeBoundary3.receiveShadow = true;
        cubeBoundary3.name = "Boundary";
        cubeBoundary3.rotation.y = 1.570796;
        cubeBoundary3.position.x = 29.5;
        cubeBoundary3.position.y = 4;
        cubeBoundary3.position.z = 0;
        scene.add(cubeBoundary3);

        cubeGeometryB4 = new BoxGeometry(58, 8, 1);
        cubeBoundary4 = new Physijs.ConvexMesh(cubeGeometryB4, cubeMaterialBase, 0);
        cubeBoundary4.castShadow = true;
        cubeBoundary4.receiveShadow = true;
        cubeBoundary4.name = "Boundary";
        cubeBoundary4.rotation.y = 1.570796;
        cubeBoundary4.position.x = -29.5;
        cubeBoundary4.position.y = 4;
        cubeBoundary4.position.z = 0;
        scene.add(cubeBoundary4);

        //ADDING INNER WALLS
        cubeGeometryIW1 = new BoxGeometry(44.5, 8, 1);
        cubeInnerWall1 = new Physijs.ConvexMesh(cubeGeometryIW1, cubeMaterialBase, 0);
        cubeInnerWall1.castShadow = true;
        cubeInnerWall1.receiveShadow = true;
        cubeInnerWall1.name = "Boundary";
        cubeInnerWall1.rotation.y = 1.570796;
        cubeInnerWall1.position.x = 10.5;
        cubeInnerWall1.position.y = 4;
        cubeInnerWall1.position.z = -7.4;
        scene.add(cubeInnerWall1);

        cubeGeometryIW2 = new BoxGeometry(44.5, 8, 1);
        cubeInnerWall2 = new Physijs.ConvexMesh(cubeGeometryIW2, cubeMaterialBase, 0);
        cubeInnerWall2.castShadow = true;
        cubeInnerWall2.receiveShadow = true;
        cubeInnerWall2.name = "Boundary";
        cubeInnerWall2.rotation.y = 1.570796;
        cubeInnerWall2.position.x = -10.5;
        cubeInnerWall2.position.y = 4;
        cubeInnerWall2.position.z = 7.4;
        scene.add(cubeInnerWall2);

        cubeGeometryIW3 = new BoxGeometry(18, 8, 1);
        cubeInnerWall3 = new Physijs.ConvexMesh(cubeGeometryIW3, destructiveMaterial, 0);
        cubeInnerWall3.castShadow = true;
        cubeInnerWall3.receiveShadow = true;
        cubeInnerWall3.name = "Barrier";
        cubeInnerWall3.position.x = 20;
        cubeInnerWall3.position.y = 4;
        cubeInnerWall3.position.z = 3.75;
        scene.add(cubeInnerWall3);

        cubeGeometryIW4 = new BoxGeometry(18, 8, 1);
        cubeInnerWall4 = new Physijs.ConvexMesh(cubeGeometryIW4, destructiveMaterial, 0);
        cubeInnerWall4.castShadow = true;
        cubeInnerWall4.receiveShadow = true;
        cubeInnerWall4.name = "Barrier";
        cubeInnerWall4.position.x = -20;
        cubeInnerWall4.position.y = 4;
        cubeInnerWall4.position.z = -4.1;
        scene.add(cubeInnerWall4);

        //ADDING MINES
        cubeGeometryMines = new BoxGeometry(20, 0.5, 4.84);
        cubeMines = new Physijs.ConvexMesh(cubeGeometryMines, mineMaterial, 0);
        cubeMines.castShadow = true;
        cubeMines.receiveShadow = true;
        cubeMines.name = "Mine";
        cubeMines.position.x = 0;
        cubeMines.position.y = 0.27;
        cubeMines.position.z = 0.48;
        scene.add(cubeMines);

        // Universal Tire Object
        playerGeometry = new SphereGeometry(2, 32, 32);
        playerMaterial = Physijs.createMaterial(new PhongMaterial({ color: 0x000000 }), 0.4, 0);

        player = new Physijs.SphereMesh(playerGeometry, playerMaterial, 1);
        player.position.set(-19, 20, 15);
        player.receiveShadow = true;
        player.castShadow = true;
        player.name = "Player";


        console.log("Added Player to Scene");




        // Truck Body Object
        playerGeometry1 = new BoxGeometry(5, 5, 5);
        playerMaterial1 = Physijs.createMaterial(frontMaterial, 0.4, 0);

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

        playera = new Physijs.ConvexMesh(playerGeometrya, playerMateriala, 1);
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
        scene.add(player);
        //======================================================================================================



        // Collision Check
        player.addEventListener('collision', (event) => {

            console.log(event);

            if (event.name === "Ground") {
                console.log("player hit the ground");
                isGrounded = true;
            }
            if (event.name === "Sphere") {
                console.log("player hit the sphere");
            }
        });

        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(21, 50, 19);
        //spotLight.rotation.set(37.261, 106.936, 3.164);
        spotLight.lookAt(new Vector3(0, 0, 0));
        spotLight.intensity = 2;
        spotLight.castShadow = true;
        // spotLight.
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");

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
    function pointerLockChange(event): void {
        if (document.pointerLockElement === element) {
            // enable our mouse and keyboard controls
            keyboardControls.enabled = true;
            mouseControls.enabled = true;
            blocker.style.display = 'none';
        } else {
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
    function pointerLockError(event): void {
        instructions.style.display = '';
        console.log("PointerLock Error Detected!!");
    }

    // Window Resize Event Handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function addControl(controlObject: Control): void {
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
    function gameLoop(): void {
        stats.update();

        checkControls();




        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);

        // render the scene
        renderer.render(scene, camera);
    }


    // Check Controls Function
    function checkControls(): void {
        if (keyboardControls.enabled) {
            velocity = new Vector3();

            var time: number = performance.now();
            var delta: number = (time - prevTime) / 1000;


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
    function cameraLook(): void {
        var zenith: number = THREE.Math.degToRad(90);
        var nadir: number = THREE.Math.degToRad(-90);

        var cameraPitch: number = camera.rotation.x + mouseControls.pitch;

        // Constrain the Camera Pitch
        camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);

    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer({ antialias: true });
        renderer.setClearColor(0x404040, 1.0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 150);
        // camera.position.set(0, 50, 80);
        // camera.lookAt(new Vector3(0, 0, 0));

        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

