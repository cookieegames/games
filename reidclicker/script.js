let cookieCount = 0;
let cookiePerClick = 1;

const upgrades = [
    { name: "Grandma", cost: 50, cookiesPerSecond: 1, img: 'https://static.wikia.nocookie.net/ciastkowyklikacz/images/5/59/GrandmaIcon.png/revision/latest/smart/width/250/height/250?cb=20130914105238&path-prefix=pl' },
    { name: "Farm", cost: 100, cookiesPerSecond: 5, img: 'https://static.wikia.nocookie.net/cookieclicker/images/1/1a/FarmIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230716020747' },
    { name: "Factory", cost: 500, cookiesPerSecond: 10, img: 'https://static.wikia.nocookie.net/cookieclicker/images/9/93/FactoryIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230412164855' },
    { name: "Mine", cost: 1000, cookiesPerSecond: 20, img: 'https://static.wikia.nocookie.net/cookieclicker/images/f/f2/MineIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230716021745' },
    { name: "Bank", cost: 5000, cookiesPerSecond: 50, img: 'https://static.wikia.nocookie.net/cookieclicker/images/d/d6/BankIconLarge.png/revision/latest/thumbnail/width/360/height/360?cb=20230507191239' },
    { name: "Portal", cost: 10000, cookiesPerSecond: 100, img: 'https://static.wikia.nocookie.net/cookieclicker/images/9/9d/PortalIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230412163432' },
    { name: "Time Machine", cost: 50000, cookiesPerSecond: 500, img: 'https://static.wikia.nocookie.net/cookieclicker/images/c/cb/TimeMachineIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230716021051' },
    { name: "Wizard Tower", cost: 100000, cookiesPerSecond: 1000, img: 'https://static.wikia.nocookie.net/cookieclicker/images/8/85/WizardTowerIconLarge.png/revision/latest/thumbnail/width/360/height/360?cb=20230716020529' },
    { name: "Shipment", cost: 200000, cookiesPerSecond: 5000, img: 'https://static.wikia.nocookie.net/cookieclicker/images/f/f7/ShipmentIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230716021248' },
    { name: "Alchemy Lab", cost: 500000, cookiesPerSecond: 10000, img: 'https://static.wikia.nocookie.net/cookieclicker/images/5/55/AlchemyLabIconTransparent.png/revision/latest/thumbnail/width/360/height/360?cb=20230412152040' }
];

let upgradesPurchased = new Array(upgrades.length).fill(0);

document.getElementById('cookie').onclick = function() {
    cookieCount += cookiePerClick;
    this.style.animation = 'bounce 0.5s';
    setTimeout(() => this.style.animation = '', 500); // Reset animation
    updateDisplay();
};

function updateDisplay() {
    document.getElementById('cookieCount').innerText = cookieCount;
    document.getElementById('cookiesPerSecond').innerText = cookiePerClick;
    displayUpgrades();
    displayUpgradesPurchased();
}

function displayUpgrades() {
    const upgradesDiv = document.getElementById('upgrades');
    upgradesDiv.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.className = 'upgrade';
        upgradeDiv.innerHTML = `<img src="${upgrade.img}" alt="${upgrade.name}"> 
                                ${upgrade.name} - Cost: ${upgrade.cost} Cookies - +${upgrade.cookiesPerSecond} CPS`;
        upgradeDiv.onclick = function() {
            buyUpgrade(index);
        };
        if (cookieCount < upgrade.cost) {
            upgradeDiv.classList.add('greyed');
        }
        upgradesDiv.appendChild(upgradeDiv);
    });
}

function displayUpgradesPurchased() {
    const upgradesPurchasedList = document.getElementById('upgradesPurchased');
    upgradesPurchasedList.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${upgrade.name}: ${upgradesPurchased[index]} purchased`;
        upgradesPurchasedList.appendChild(listItem);
    });
}

function buyUpgrade(index) {
    if (cookieCount >= upgrades[index].cost) {
        cookieCount -= upgrades[index].cost;
        cookiePerClick += upgrades[index].cookiesPerSecond;
        upgradesPurchased[index]++;
        upgrades[index].cost = Math.floor(upgrades[index].cost * 1.15); // Increase cost
        updateDisplay();
    }
}

// Auto-generate cookies
setInterval(() => {
    cookieCount += cookiePerClick; // Add cookies based on upgrades
    updateDisplay();
}, 1000);
