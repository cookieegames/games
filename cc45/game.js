// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Game settings
const laneWidth = 4;
const lanes = [-laneWidth, 0, laneWidth];
const forwardSpeed = 0.1;
let score = 0;
let money = 0;
let distanceTravelled = 0;
let currentLane = 1;
let obstacles = [];
let player;
let selectedVehicle = 'car'; // Default vehicle
let mapSetting = 'city'; // Default map

// Set camera position
camera.position.z = 10;
camera.position.y = 3;
camera.rotation.x = -0.3;

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 10).normalize();
scene.add(directionalLight);

// Define player vehicles
const vehicleOptions = {
    car: { color: 0xff0000, speedMultiplier: 1 },
    sportsCar: { color: 0xffd700, speedMultiplier: 1.2 },
    truck: { color: 0x00ff00, speedMultiplier: 0.8 }
};

// Load player vehicle
function loadPlayerVehicle() {
    if (player) scene.remove(player); // Remove previous vehicle if any
    const vehicle = vehicleOptions[selectedVehicle];
    const playerGeometry = new THREE.BoxGeometry(1, 1, 2);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: vehicle.color });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);
    player.position.x = lanes[currentLane];
    player.position.z = 5;
}
loadPlayerVehicle();

// Update score, distance, and money
function updateScoreAndMoney() {
    distanceTravelled += forwardSpeed * 10; // Increase distance
    money = Math.floor(distanceTravelled / 100); // Earn money based on distance
    document.getElementById('score').innerText = `Score: ${Math.floor(distanceTravelled)} | Money: $${money}`;
}

// Dynamic obstacle generator with varied vehicle types
function createObstacle() {
    const obstacleTypes = [
        { size: [1, 1, 2], color: 0x0000ff }, // car
        { size: [1.5, 1, 3], color: 0x008080 }, // truck
        { size: [2, 1, 4], color: 0x8b4513 }  // semi
    ];
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const obstacleGeometry = new THREE.BoxGeometry(...type.size);
    const obstacleMaterial = new THREE.MeshBasicMaterial({ color: type.color });
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);

    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    obstacle.position.x = lane;
    obstacle.position.z = -50;
    obstacles.push(obstacle);
    scene.add(obstacle);
}

// Update game mechanics
function updateGame() {
    // Update player position
    player.position.x = lanes[currentLane];
    
    // Move obstacles and check for collisions
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].position.z += forwardSpeed * 2;
        
        // Remove passed obstacles and increase score
        if (obstacles[i].position.z > camera.position.z) {
            scene.remove(obstacles[i]);
            obstacles.splice(i, 1);
            score++;
            updateScoreAndMoney();
        }

        // Check for collisions
        if (Math.abs(obstacles[i].position.z - player.position.z) < 1 &&
            Math.abs(obstacles[i].position.x - player.position.x) < 1) {
            alert('Game Over! Your Score: ' + score);
            location.reload();
        }
    }
    
    // Add new obstacles periodically
    if (Math.random() < 0.03) {
        createObstacle();
    }
}

// Handle keyboard input for lane movement and vehicle selection
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && currentLane > 0) {
        currentLane--;
    }
    if (event.key === 'ArrowRight' && currentLane < lanes.length - 1) {
        currentLane++;
    }
    if (event.key === '1') {
        selectedVehicle = 'car';
        loadPlayerVehicle();
    }
    if (event.key === '2') {
        selectedVehicle = 'sportsCar';
        loadPlayerVehicle();
    }
    if (event.key === '3') {
        selectedVehicle = 'truck';
        loadPlayerVehicle();
    }
});

// Map selection function
function loadMap(map) {
    if (map === 'city') {
        scene.background = new THREE.Color(0x87ceeb); // Light blue for city sky
    } else if (map === 'night') {
        scene.background = new THREE.Color(0x0b0c10); // Dark color for night
        ambientLight.intensity = 0.4;
        directionalLight.intensity = 0.2;
    } else if (map === 'snow') {
        scene.background = new THREE.Color(0xffffff); // White for snowy map
    }
}

// Map selection (for demo, just keys for now)
document.addEventListener('keydown', (event) => {
    if (event.key === 'C') {
        mapSetting = 'city';
        loadMap(mapSetting);
    }
    if (event.key === 'N') {
        mapSetting = 'night';
        loadMap(mapSetting);
    }
    if (event.key === 'S') {
        mapSetting = 'snow';
        loadMap(mapSetting);
    }
});

// Animate the game
function animate() {
    requestAnimationFrame(animate);
    updateGame();
    renderer.render(scene, camera);
}
animate();

// Window resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
