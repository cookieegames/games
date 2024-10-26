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
let currentLane = 1;
let obstacles = [];

// Set camera position
camera.position.z = 10;
camera.position.y = 3;
camera.rotation.x = -0.3;

// Add player car
const playerGeometry = new THREE.BoxGeometry(1, 1, 2);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);
player.position.x = lanes[currentLane];
player.position.z = 5;

// Add lighting for day/night effect
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

// Add directional light for sunlight effect
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 10, 10).normalize();
scene.add(directionalLight);

// Generate road
const roadGeometry = new THREE.PlaneGeometry(20, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = Math.PI / 2;
scene.add(road);
road.position.z = -40;

// Create random obstacles
function createObstacle() {
    const obstacleGeometry = new THREE.BoxGeometry(1, 1, 2);
    const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    obstacle.position.x = lane;
    obstacle.position.z = -50;
    obstacles.push(obstacle);
    scene.add(obstacle);
}

// Update game
function updateGame() {
    // Update player position
    player.position.x = lanes[currentLane];
    
    // Move obstacles and check for collisions
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].position.z += forwardSpeed * 2;
        
        // Remove obstacles that go past the player
        if (obstacles[i].position.z > camera.position.z) {
            scene.remove(obstacles[i]);
            obstacles.splice(i, 1);
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        }
        
        // Collision detection
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

// Handle keyboard input for lane movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && currentLane > 0) {
        currentLane--;
    }
    if (event.key === 'ArrowRight' && currentLane < lanes.length - 1) {
        currentLane++;
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
