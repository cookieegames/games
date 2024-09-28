let cookieCount = 0;
let cookiePerClick = 1;

const upgrades = [
    { name: "Grandma", cost: 50, cookiesPerSecond: 1, img: 'path/to/grandma-image.jpg' },
    { name: "Farm", cost: 100, cookiesPerSecond: 5, img: 'path/to/farm-image.jpg' },
    { name: "Factory", cost: 500, cookiesPerSecond: 10, img: 'path/to/factory-image.jpg' },
    { name: "Mine", cost: 1000, cookiesPerSecond: 20, img: 'path/to/mine-image.jpg' },
    { name: "Bank", cost: 5000, cookiesPerSecond: 50, img: 'path/to/bank-image.jpg' },
    { name: "Portal", cost: 10000, cookiesPerSecond: 100, img: 'path/to/portal-image.jpg' },
    { name: "Time Machine", cost: 50000, cookiesPerSecond: 500, img: 'path/to/time-machine-image.jpg' },
    { name: "Wizard Tower", cost: 100000, cookiesPerSecond: 1000, img: 'path/to/wizard-tower-image.jpg' },
    { name: "Shipment", cost: 200000, cookiesPerSecond: 5000, img: 'path/to/shipment-image.jpg' },
    { name: "Alchemy Lab", cost: 500000, cookiesPerSecond: 10000, img: 'path/to/alchemy-lab-image.jpg' }
];

document.getElementById('cookie').onclick = function() {
    cookieCount += cookiePerClick;
    this.style.animation = 'bounce 0.5s';
    setTimeout(() => this.style.animation = '', 500); // Reset animation
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
        upgradeDiv.innerHTML = `<img src="${upgrade.img}" alt="${upgrade.name}" style="width: 30px; vertical-align: middle;"> 
                                ${upgrade.name} - Cost: ${upgrade.cost} Cookies - +${upgrade.cookiesPerSecond} CPS`;
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
        upgrades[index].cost = Math.floor(upgrades[index].cost * 1.15); // Increase cost
        updateDisplay();
    }
}

// Auto-generate cookies
setInterval(() => {
    cookieCount += cookiePerClick; // Add cookies based on upgrades
    updateDisplay();
}, 1000);
