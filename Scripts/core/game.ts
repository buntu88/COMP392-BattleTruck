/// <reference path="_reference.ts"/>

// MAIN GAME FILE
//Author’s name:        Vishal Guleria (300813391) & Vinay Bhardwaj (300825097)
//Date last Modified    March 24,2016
//Program description   Assignment 3 - Battle Truck : Saving abandoned soldiers.
//Revision History      v3

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
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import CScreen = config.Screen;
import Clock = THREE.Clock;

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
    var group = new THREE.Object3D();
    var group1 = new THREE.Object3D();
    var group2 = new THREE.Object3D();
    var cube: Physijs.Mesh;
    var cube1: Physijs.Mesh;
    var cube2: Physijs.Mesh;
    var cube3: Physijs.Mesh;
    var cube4: Physijs.Mesh;
    var cube5: Physijs.Mesh;
    var cube6: Physijs.Mesh;
    var cube7: Physijs.Mesh;
    var cube8: Physijs.Mesh;
    var cubeGeometry: CubeGeometry;
    var cubeGeometry1: CubeGeometry;
    var cubeGeometry2: CubeGeometry;
    var cubeGeometry3: CubeGeometry;
    var cubeGeometry4: CubeGeometry;
    var cubeGeometry5: CubeGeometry;
    var cubeGeometry6: CubeGeometry;
    var cubeGeometry7: CubeGeometry;
    var cubeGeometry8: CubeGeometry;
    var cubeMaterialSkin: Physijs.Material;
    var cubeMaterialBody: Physijs.Material;
    var cubeMaterialLegs: Physijs.Material;
    var cubeMaterialFeet: Physijs.Material;
    var coinGeometry: Geometry;
    var coinMaterial: Physijs.Material;

    var coins: Physijs.ConcaveMesh[];
    var cointCount: number = 5;

    var deathPlaneGeometry: CubeGeometry;
    var deathPlaneMaterial: Physijs.Material;
    var deathPlane: Physijs.Mesh;
    var box: Physijs.Mesh;
    var boxGeometry: CubeGeometry;
    var boxMat: Physijs.Material;
    var boxMatPh: PhongMaterial;
    var boxTexture: Texture;
    var boxTextureNormal: Texture;

    // CreateJS Related Variables
    var assets: createjs.LoadQueue;
    var canvas: HTMLElement;
    var stage: createjs.Stage;
    var scoreLabel: createjs.Text;
    var livesLabel: createjs.Text;
    var scoreValue: number;
    var livesValue: number;


    var manifest = [
        { id: "land", src: "../../Assets/audio/turck_start.mp3" },
        { id: "deathPlane", src: "../../Assets/audio/Mine.mp3" },
        { id: "coin", src: "../../Assets/audio/coin.mp3" },
        { id: "barrier", src: "../../Assets/audio/collapse.mp3" },
        { id: "boundary", src: "../../Assets/audio/crash.mp3" },
        { id: "soldiers", src: "../../Assets/audio/soldiers.mp3" },
       
    ];

    function preload(): void {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", init, this);
        assets.loadManifest(manifest);
    }

    function setupCanvas(): void {
        canvas = document.getElementById("canvas");
        canvas.setAttribute("width", config.Screen.WIDTH.toString());
        canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
        canvas.style.backgroundColor = "#000000";
        stage = new createjs.Stage(canvas);
    }

    function setupScoreboard(): void {
        // initialize  score and lives values
        scoreValue = 0;
        livesValue = 5;

        // Add Lives Label
        livesLabel = new createjs.Text(
            "LIVES: " + livesValue,
            "40px Consolas",
            "#ffffff"
        );
        livesLabel.x = config.Screen.WIDTH * 0.1;
        livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.addChild(livesLabel);
        console.log("Added Lives Label to stage");

        // Add Score Label
        scoreLabel = new createjs.Text(
            "SCORE: " + scoreValue,
            "40px Consolas",
            "#ffffff"
        );
        scoreLabel.x = config.Screen.WIDTH * 0.8;
        scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.addChild(scoreLabel);
        console.log("Added Score Label to stage");
    }

    function init(): void {
        // Create to HTMLElements
        blocker = document.getElementById("blocker");
        instructions = document.getElementById("instructions");

        // Set Up CreateJS Canvas and Stage
        setupCanvas();

        // Set Up Scoreboard
        setupScoreboard();

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

        groundTextureNormal = new THREE.TextureLoader().load('../../Assets/images/GravelCobbleNormal.png');
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
        cubeInnerWall3.name = "Soldiers";
        cubeInnerWall3.position.x = 20;
        cubeInnerWall3.position.y = 0;
        cubeInnerWall3.position.z = 3.75;
        scene.add(cubeInnerWall3);

        cubeGeometryIW4 = new BoxGeometry(18, 8, 1);
        cubeInnerWall4 = new Physijs.ConvexMesh(cubeGeometryIW4, destructiveMaterial, 0);
        cubeInnerWall4.castShadow = true;
        cubeInnerWall4.receiveShadow = true;
        cubeInnerWall4.name = "Barrier";
        cubeInnerWall4.position.x = -20;
        cubeInnerWall4.position.y = 0;
        cubeInnerWall4.position.z = -4.1;
        scene.add(cubeInnerWall4);

        //ADDING MINES
        cubeGeometryMines = new BoxGeometry(20, 0.5, 4.84);
        cubeMines = new Physijs.ConvexMesh(cubeGeometryMines, mineMaterial, 0);
        cubeMines.castShadow = true;
        cubeMines.receiveShadow = true;
        cubeMines.name = "DeathPlane";
        cubeMines.position.x = 0;
        cubeMines.position.y = 0.27;
        cubeMines.position.z = 0.48;
        scene.add(cubeMines);

        // Universal Tire Object
        playerGeometry = new SphereGeometry(2, 32, 32);
        playerMaterial = Physijs.createMaterial(new PhongMaterial({ color: 0x000000 }), 0.4, 0);

        player = new Physijs.SphereMesh(playerGeometry, playerMaterial, 1);
        player.position.set(-19, 10, 15);
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



        cubeMaterialSkin = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0x90EE90 }), 0.4, 0);
        cubeMaterialBody = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0x9ACD32 }), 0.4, 0);
        cubeMaterialLegs = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0x000000 }), 0.4, 0);
        cubeMaterialFeet = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0x614126 }), 0.4, 0);

        //Adding Head
        cubeGeometry = new CubeGeometry(2.036, 2.315, 2);
        cube = new Physijs.ConvexMesh(cubeGeometry, cubeMaterialSkin);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.x = 0.125;
        cube.position.y = 4.73;
        cube.position.z = 0.04;
        group.add(cube); //Adding Cube to the group

        //Adding Neck
        cubeGeometry1 = new CubeGeometry(1, 1, 1);
        cube1 = new Physijs.ConvexMesh(cubeGeometry1, cubeMaterialSkin);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        cube1.position.x = -0.02;
        cube1.position.y = 3.3;
        cube1.position.z = 0.045;
        group.add(cube1); //Adding Cube to the group


        //Adding Body
        cubeGeometry2 = new CubeGeometry(1.7, 5, 4);
        cube2 = new Physijs.ConvexMesh(cubeGeometry2, cubeMaterialBody);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        cube2.position.x = 0.06;
        cube2.position.y = 0.5;
        cube2.position.z = 0.01;
        group.add(cube2); //Adding Cube to the group


        //Adding right arm
        cubeGeometry3 = new CubeGeometry(1.2, 0.8, 3.5);
        cube3 = new Physijs.ConvexMesh(cubeGeometry3, cubeMaterialSkin);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.x = -0.21;
        cube3.position.y = 2.6;
        cube3.position.z = -3.71;
        group.add(cube3); //Adding Cube to the group

        //Adding left arm
        cubeGeometry4 = new CubeGeometry(1.2, 0.8, 3.5);
        cube4 = new Physijs.ConvexMesh(cubeGeometry4, cubeMaterialSkin);
        cube4.castShadow = true;
        cube4.receiveShadow = true;
        cube4.position.x = -0.21;
        cube4.position.y = 2.6;
        cube4.position.z = 3.71;
        group.add(cube4); //Adding Cube to the group

        //Adding right leg
        cubeGeometry5 = new CubeGeometry(1, 3, 1);
        cube5 = new Physijs.ConvexMesh(cubeGeometry5, cubeMaterialLegs);
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.x = -0.16;
        cube5.position.y = -3.5;
        cube5.position.z = -1.0;
        group.add(cube5); //Adding Cube to the group

        //Adding left leg
        cubeGeometry6 = new CubeGeometry(1, 3, 1);
        cube6 = new Physijs.ConvexMesh(cubeGeometry6, cubeMaterialLegs);
        cube6.castShadow = true;
        cube6.receiveShadow = true;
        cube6.position.x = -0.16;
        cube6.position.y = -3.5;
        cube6.position.z = 1.0;
        group.add(cube6); //Adding Cube to the group

        //Adding right feet
        cubeGeometry7 = new CubeGeometry(1.6, 0.5, 1);
        cube7 = new Physijs.ConvexMesh(cubeGeometry7, cubeMaterialFeet);
        cube7.castShadow = true;
        cube7.receiveShadow = true;
        cube7.position.x = 0.15;
        cube7.position.y = -4.95;
        cube7.position.z = -1.0;
        group.add(cube7); //Adding Cube to the group

        //Adding left feet
        cubeGeometry8 = new CubeGeometry(1.6, 0.5, 1);
        cube8 = new Physijs.ConvexMesh(cubeGeometry8, cubeMaterialFeet);
        cube8.castShadow = true;
        cube8.receiveShadow = true;
        cube8.position.x = 0.15;
        cube8.position.y = -4.95;
        cube8.position.z = 1.0;
        group.add(cube8); //Adding Cube to the group
        group.position.set(20, 5, -20);
        group.rotation.y = -1.567;
        group.name = "Soldiers";

        scene.add(group);


        cubeGeometry = new CubeGeometry(2.036, 2.315, 2);
        cube = new Physijs.ConvexMesh(cubeGeometry, cubeMaterialSkin);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.x = 0.125;
        cube.position.y = 4.73;
        cube.position.z = 0.04;
        group1.add(cube); //Adding Cube to the group

        //Adding Neck
        cubeGeometry1 = new CubeGeometry(1, 1, 1);
        cube1 = new Physijs.ConvexMesh(cubeGeometry1, cubeMaterialSkin);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        cube1.position.x = -0.02;
        cube1.position.y = 3.3;
        cube1.position.z = 0.045;
        group1.add(cube1); //Adding Cube to the group


        //Adding Body
        cubeGeometry2 = new CubeGeometry(1.7, 5, 4);
        cube2 = new Physijs.ConvexMesh(cubeGeometry2, cubeMaterialBody);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        cube2.position.x = 0.06;
        cube2.position.y = 0.5;
        cube2.position.z = 0.01;
        group1.add(cube2); //Adding Cube to the group


        //Adding right arm
        cubeGeometry3 = new CubeGeometry(1.2, 0.8, 3.5);
        cube3 = new Physijs.ConvexMesh(cubeGeometry3, cubeMaterialSkin);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.x = -0.21;
        cube3.position.y = 2.6;
        cube3.position.z = -3.71;
        group1.add(cube3); //Adding Cube to the group

        //Adding left arm
        cubeGeometry4 = new CubeGeometry(1.2, 0.8, 3.5);
        cube4 = new Physijs.ConvexMesh(cubeGeometry4, cubeMaterialSkin);
        cube4.castShadow = true;
        cube4.receiveShadow = true;
        cube4.position.x = -0.21;
        cube4.position.y = 2.6;
        cube4.position.z = 3.71;
        group1.add(cube4); //Adding Cube to the group

        //Adding right leg
        cubeGeometry5 = new CubeGeometry(1, 3, 1);
        cube5 = new Physijs.ConvexMesh(cubeGeometry5, cubeMaterialLegs);
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.x = -0.16;
        cube5.position.y = -3.5;
        cube5.position.z = -1.0;
        group1.add(cube5); //Adding Cube to the group

        //Adding left leg
        cubeGeometry6 = new CubeGeometry(1, 3, 1);
        cube6 = new Physijs.ConvexMesh(cubeGeometry6, cubeMaterialLegs);
        cube6.castShadow = true;
        cube6.receiveShadow = true;
        cube6.position.x = -0.16;
        cube6.position.y = -3.5;
        cube6.position.z = 1.0;
        group1.add(cube6); //Adding Cube to the group

        //Adding right feet
        cubeGeometry7 = new CubeGeometry(1.6, 0.5, 1);
        cube7 = new Physijs.ConvexMesh(cubeGeometry7, cubeMaterialFeet);
        cube7.castShadow = true;
        cube7.receiveShadow = true;
        cube7.position.x = 0.15;
        cube7.position.y = -4.95;
        cube7.position.z = -1.0;
        group1.add(cube7); //Adding Cube to the group

        //Adding left feet
        cubeGeometry8 = new CubeGeometry(1.6, 0.5, 1);
        cube8 = new Physijs.ConvexMesh(cubeGeometry8, cubeMaterialFeet);
        cube8.castShadow = true;
        cube8.receiveShadow = true;
        cube8.position.x = 0.15;
        cube8.position.y = -4.95;
        cube8.position.z = 1.0;
        group1.add(cube8); //Adding Cube to the group
        group1.position.set(15, 5, -10);
        group1.name = "Soldiers";
        scene.add(group1);

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cubeGeometry = new CubeGeometry(2.036, 2.315, 2);
        cube = new Physijs.ConvexMesh(cubeGeometry, cubeMaterialSkin);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.x = 0.125;
        cube.position.y = 4.73;
        cube.position.z = 0.04;
        group2.add(cube); //Adding Cube to the group

        //Adding Neck
        cubeGeometry1 = new CubeGeometry(1, 1, 1);
        cube1 = new Physijs.ConvexMesh(cubeGeometry1, cubeMaterialSkin);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        cube1.position.x = -0.02;
        cube1.position.y = 3.3;
        cube1.position.z = 0.045;
        group2.add(cube1); //Adding Cube to the group


        //Adding Body
        cubeGeometry2 = new CubeGeometry(1.7, 5, 4);
        cube2 = new Physijs.ConvexMesh(cubeGeometry2, cubeMaterialBody);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        cube2.position.x = 0.06;
        cube2.position.y = 0.5;
        cube2.position.z = 0.01;
        group2.add(cube2); //Adding Cube to the group


        //Adding right arm
        cubeGeometry3 = new CubeGeometry(1.2, 0.8, 3.5);
        cube3 = new Physijs.ConvexMesh(cubeGeometry3, cubeMaterialSkin);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.x = -0.21;
        cube3.position.y = 2.6;
        cube3.position.z = -3.71;
        group2.add(cube3); //Adding Cube to the group

        //Adding left arm
        cubeGeometry4 = new CubeGeometry(1.2, 0.8, 3.5);
        cube4 = new Physijs.ConvexMesh(cubeGeometry4, cubeMaterialSkin);
        cube4.castShadow = true;
        cube4.receiveShadow = true;
        cube4.position.x = -0.21;
        cube4.position.y = 2.6;
        cube4.position.z = 3.71;
        group2.add(cube4); //Adding Cube to the group

        //Adding right leg
        cubeGeometry5 = new CubeGeometry(1, 3, 1);
        cube5 = new Physijs.ConvexMesh(cubeGeometry5, cubeMaterialLegs);
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        cube5.position.x = -0.16;
        cube5.position.y = -3.5;
        cube5.position.z = -1.0;
        group2.add(cube5); //Adding Cube to the group

        //Adding left leg
        cubeGeometry6 = new CubeGeometry(1, 3, 1);
        cube6 = new Physijs.ConvexMesh(cubeGeometry6, cubeMaterialLegs);
        cube6.castShadow = true;
        cube6.receiveShadow = true;
        cube6.position.x = -0.16;
        cube6.position.y = -3.5;
        cube6.position.z = 1.0;
        group2.add(cube6); //Adding Cube to the group

        //Adding right feet
        cubeGeometry7 = new CubeGeometry(1.6, 0.5, 1);
        cube7 = new Physijs.ConvexMesh(cubeGeometry7, cubeMaterialFeet);
        cube7.castShadow = true;
        cube7.receiveShadow = true;
        cube7.position.x = 0.15;
        cube7.position.y = -4.95;
        cube7.position.z = -1.0;
        group2.add(cube7); //Adding Cube to the group

        //Adding left feet
        cubeGeometry8 = new CubeGeometry(1.6, 0.5, 1);
        cube8 = new Physijs.ConvexMesh(cubeGeometry8, cubeMaterialFeet);
        cube8.castShadow = true;
        cube8.receiveShadow = true;
        cube8.position.x = 0.15;
        cube8.position.y = -4.95;
        cube8.position.z = 1.0;
        group2.add(cube8); //Adding Cube to the group
        group2.position.set(25, 5, -10);
        group2.rotation.y = 3.14159;
        group2.name = "Soldiers";
        scene.add(group2);

        //======================================================================================================


        // Add custom coin imported from Blender
        addCoinMesh();

        //addDeathPlane();

        // Collision Check
        player.addEventListener('collision', (eventObject) => {
            if (eventObject.name === "Ground") {
                isGrounded = true;
                createjs.Sound.play("land");
            }
            if (eventObject.name === "Coin") {
                createjs.Sound.play("coin");
                scene.remove(eventObject);
                scoreValue += 100;
                scoreLabel.text = "SCORE: " + scoreValue;
            }

            if (eventObject.name === "DeathPlane") {
                createjs.Sound.play("deathPlane");
                livesValue--;
                
                if (livesValue > 0) {
                    livesLabel.text = "LIVES: " + livesValue;
                    scene.remove(player);
                    player.position.set(-19, 10, 15);
                    scene.add(player);
                }
                else{
                    livesLabel.text = "Game Over!!!";
                    scoreLabel.text = "SCORE: " + scoreValue;
                     scene.remove(player);
                }

            }
            if (eventObject.name === "Boundary") {
                createjs.Sound.play("boundary");
                livesValue--;
                if (livesValue > 0) {
                    livesLabel.text = "LIVES: " + livesValue;
                }
                else{
                    livesLabel.text = "Game Over!!!";
                    scoreLabel.text = "SCORE: " + scoreValue;
                     scene.remove(player);
                }
            }
            if (eventObject.name === "Barrier") {
                createjs.Sound.play("barrier");
                scene.remove(eventObject);
                scoreValue += 500;
                scoreLabel.text = "SCORE: " + scoreValue;
            }

            if (eventObject.name === "Soldiers") {
                console.log(eventObject);
                createjs.Sound.play("barrier");
                createjs.Sound.play("soldiers");
                scene.remove(eventObject);
                scene.remove(group);
                scene.remove(group1);
                scene.remove(group2);
                scene.remove(player);
                scoreValue += 1000;
                scoreLabel.text = "SCORE: " + scoreValue;
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
        spotLight.intensity = 1;
        spotLight.castShadow = true;
        // spotLight.
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");

        // create parent-child relationship with camera and player
        playerb.add(camera);
        camera.position.set(0, 7, 20);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        scene.simulate();

        window.addEventListener('resize', onWindowResize, false);
    }

    function setCenter(geometry: Geometry): Vector3 {

        geometry.computeBoundingBox();

        var bb = geometry.boundingBox;

        var offset = new THREE.Vector3();

        offset.addVectors(bb.min, bb.max);
        offset.multiplyScalar(-0.5);

        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(offset.x, offset.y, offset.z));
        geometry.computeBoundingBox();

        return offset;
    }



    // Add the Coin to the scene
    function addCoinMesh(): void {

        coins = new Array<Physijs.Mesh>(); // Instantiate a convex mesh array


        boxTexture = new THREE.TextureLoader().load('../../Assets/images/box.jpg');
        boxTexture.wrapS = THREE.RepeatWrapping;
        boxTexture.wrapT = THREE.RepeatWrapping;
        boxTexture.repeat.set(1, 1);

        boxTextureNormal = new THREE.TextureLoader().load('../../Assets/images/box.jpg');
        boxTextureNormal.wrapS = THREE.RepeatWrapping;
        boxTextureNormal.wrapT = THREE.RepeatWrapping;
        boxTextureNormal.repeat.set(1, 1);

        boxMatPh = new PhongMaterial();
        boxMatPh.map = boxTexture;
        boxMatPh.bumpMap = boxTextureNormal;
        boxMatPh.bumpScale = 0.2;
        boxMat = Physijs.createMaterial(boxMatPh, 0, 0);

        boxGeometry = new BoxGeometry(4, 4, 4);


        for (var count: number = 0; count < cointCount; count++) {
            coins[count] = new Physijs.ConvexMesh(boxGeometry, boxMat, 0);
            coins[count].receiveShadow = true;
            coins[count].castShadow = true;
            coins[count].name = "Coin";
            setCoinPosition(coins[count]);
        }

        console.log("Added Coin Mesh to Scene");
    }

    // Set Coin Position
    function setCoinPosition(coin: Physijs.ConvexMesh): void {
        var randomPointX: number = Math.floor(Math.random() * 30);
        var randomPointZ: number = Math.floor(Math.random() * 30);
        coin.position.set(randomPointX, 2, randomPointZ);
        scene.add(coin);
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

        canvas.style.width = "100%";
        livesLabel.x = config.Screen.WIDTH * 0.1;
        livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        scoreLabel.x = config.Screen.WIDTH * 0.8;
        scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
        stage.update();
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
        stage.update();

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
                velocity.z -= 1000.0 * delta;
            }
            if (keyboardControls.moveLeft) {
                velocity.x -= 400.0 * delta;
            }
            if (keyboardControls.moveBackward) {
                velocity.z += 1000.0 * delta;
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
        var zenith: number = THREE.Math.degToRad(-20);
        var nadir: number = THREE.Math.degToRad(-20);

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
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        console.log("Finished setting up Camera...");
    }

    window.onload = preload;

    return {
        scene: scene
    }

})();

