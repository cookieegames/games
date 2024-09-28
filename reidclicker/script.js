let cookieCount = 0;

document.getElementById('clicker').onclick = function() {
    cookieCount++;
    document.getElementById('cookieCount').innerText = cookieCount;
};

// Future features like upgrades, auto-clickers, etc., can be added here.
