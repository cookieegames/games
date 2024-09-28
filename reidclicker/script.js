let cookieCount = 0;
let cookiePerClick = 1;
const upgrades = [
    { name: "Grandma", cost: 50, cookiesPerSecond: 1 },
    { name: "Farm", cost: 100, cookiesPerSecond: 5 },
    { name: "Factory", cost: 500, cookiesPerSecond: 10 },
    { name: "Mine", cost: 1000, cookiesPerSecond: 20 },
    { name: "Bank", cost: 5000, cookiesPerSecond: 50 },
    { name: "Portal", cost: 10000, cookiesPerSecond: 100 },
    { name: "Time Machine", cost: 50000, cookiesPerSecond: 500 },
    { name: "Wizard Tower", cost: 100000, cookiesPerSecond: 1000 },
    { name: "Shipment", cost: 200000, cookiesPerSecond: 5000 },
    { name: "Alchemy Lab", cost: 500000, cookiesPerSecond: 10000 }
];

document.getElementById('clicker').onclick = function() {
    cookieCount += cookiePerClick;
    updateDisplay();
};

function updateDisplay() {
    document.getElementById('cookieCount').innerText = cookieCount;
    displayUpgrades();
}

function displayUpgrades() {
    const upgradesDiv = document.getElementById('upgrades');
    upgradesDiv.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgrade';
        upgradeDiv.innerText = `${upgrade.name} - Cost: ${upgrade.cost} Cookies`;
        upgradeDiv.onclick = function() {
            buyUpgrade(index);
        };
        if (cookieCount < upgrade.cost) {
            upgradeDiv.style.opacity = '0.5';
            upgradeDiv.style.pointerEvents = 'none';
        }
        upgradesDiv.appendChild(upgradeDiv);
    });
}

function buyUpgrade(index) {
    if (cookieCount >= upgrades[index].cost) {
        cookieCount -= upgrades[index].cost;
        cookiePerClick += upgrades[index].cookiesPerSecond;
        updateDisplay();
    }
}

// Auto-generate cookies
setInterval(() => {
    cookieCount += cookiePerClick; // Add cookies based on upgrades
    updateDisplay();
}, 1000);
