//Image sources
//Auto Clicker: http://cookieclicker.wikia.com/wiki/File:CursorIconLarge.png
//Grandma: http://cookieclicker.wikia.com/wiki/Grandma
//Factory: http://cookieclicker.wikia.com/wiki/Factory
//Mine: http://cookieclicker.wikia.com/wiki/Mine
//Cookie Lab: http://cookieclicker.wikia.com/wiki/Alchemy_Lab
//Portal: http://cookieclicker.wikia.com/wiki/Portal


//Misc
var cookies = 0;
var CPS = 0;
cookieImagePath = "cookie.png";
var cookieImage;

//Icons
autoClickerImagePath = "autoClicker.png";
var autoClickerImage;
grandmaImagePath = "grandma.png";
var grandmaImage;
factoryImagePath = "factory.png";
var factoryImage;
mineImagePath = "mine.png";
var mineImage;
labImagePath = "lab.png";
var labImage;
portalImagePath = "portal.png";
var portalImage;


//Cookie
var cookieX = 583;
var cookieY = 100;
var cookieW = 200;
var cookieH = 200;

//Auto clicker
var autoClickerCost = 15;
var autoClickerOwned = 0;
var autoClickerColor = 255;

//Grandma
var grandmaCost = 200;
var grandmaOwned = 0;
var grandmaColor = 255;

//Factory
var factoryCost = 1000;
var factoryOwned = 0;
var factoryColor = 255;

//Mine
var mineCost = 2000;
var mineOwned = 0;
var mineColor = 255;

//Lab
var labCost = 50000
var labOwned = 0
var labColor = 255

//Portal
var portalCost = 100000
var portalOwned = 0
var portalColor = 255

//White Hole


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	frameRate(60);
	
//Icons
	autoClickerImage = loadImage(autoClickerImagePath);
	grandmaImage = loadImage(grandmaImagePath);
	factoryImage = loadImage(factoryImagePath);
	mineImage = loadImage(mineImagePath);
	labImage = loadImage(labImagePath);
	portalImage = loadImage(portalImagePath);
	cookieImage = loadImage(cookieImagePath);
}


function draw() {
	background(255);
	drawCookie();
	textSize(20);
	text("C " + nf(cookies, 0, 2), 20, 30 );
	stroke(1);
	
	
// CPS calculation.
	fill(0);
	textSize(15);
	text("CPS: " + nf(CPS, 0, 2), 20, 46);
	cookies = cookies + CPS * 1/60;
	CPS = autoClickerOwned * 1 + grandmaOwned * 5 + factoryOwned * 10 + mineOwned * 25 + labOwned * 50 + portalOwned * 100;
	

//Start items --------------------------------------------------------------------------------------------------\\
//Auto Clicker.
	fill(autoClickerColor);
	rect(20, 50, 250, 75);
	fill(0);
	
	textSize(14);
	text("Buy auto clicker. (1 CPS)", 25, 65);
	text("Price: C " + nf(autoClickerCost, 0, 2), 25, 83);
	text("Auto Clickers Owned:", 25, 100);
	text(autoClickerOwned, 25, 120);
	
	autoClickerCost =  15 * pow(1.07, autoClickerOwned);
	

	
//Grandmas
	fill(grandmaColor);
	rect(20, 130, 250, 75);
	fill(0);
	
	textSize(14);
	text("Buy grandma. (5 CPS)", 25, 145);
	text("Price: C " + nf(grandmaCost, 0, 2), 25, 163);
	text("Grandmas Owned:", 25, 180);
	text(grandmaOwned, 25, 200);
	
	grandmaCost =  200 * pow(1.07, grandmaOwned);
	

	
	//Factory
	fill(factoryColor);
	rect(20, 210, 250, 75);
	fill(0);
	
	textSize(14);
	text("Buy factory. (10 CPS)", 25, 225);
	text("Price: C " + nf(factoryCost, 0, 2), 25, 243);
	text("Factories Owned:", 25, 260);
	text(factoryOwned, 25, 280);
	
	factoryCost =  1000 * pow(1.07, factoryOwned);
	


	//Mine
	fill(mineColor);
	rect(20, 290, 250, 75);
	fill(0);
	
	textSize(14);
	text("Buy mine. (25 CPS)", 25, 305);
	text("Price: C " + nf(mineCost, 0, 2), 25, 323);
	text("Mines Owned:", 25, 340);
	text(mineOwned, 25, 360);
	
	mineCost =  2000 * pow(1.07, mineOwned);

	
	
	//Cookie Lab
	fill(labColor);
	rect(20, 370, 250, 75);
	fill(0);
	
	textSize(14);
	text("Buy Cookie lab. (50 CPS)", 25, 385);
	text("Price: C " + nf(labCost, 0, 2), 25, 403);
	text("Cookie Labs Owned:", 25, 420);
	text(labOwned, 25, 440);
	
	labCost =  50000 * pow(1.07, labOwned);
	
	
	
	//Portal
	fill(portalColor);
	rect(20, 450, 250, 75);
	fill(0);
	
	textSize(14);
	text("Buy Portal. (100 CPS)", 25, 465);
	text("Price: C " + nf(portalCost, 0, 2), 25, 483);
	text("Portals Owned:", 25, 500);
	text(portalOwned, 25, 520);
	
	portalCost =  100000 * pow(1.07, portalOwned);
	
	//All Highlights
	//(mouseX > 20 && mouseX < 20 + 250 && mouseY > 50 && mouseY < 50 + 75)
	//Auto Clicker
	if(cookies < autoClickerCost) {
		autoClickerColor = 200
	} else if (mouseX < 20 && mouseX > 20 + 250 && mouseY < 50 && mouseY > 50 + 75 && cookies >= autoClickerCost) {
		portalColor = 255
	} else if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 50 && mouseY < 50 + 75 && cookies < autoClickerCost) {
		autoClickerColor = 200
	} else {
		autoClickerColor = 255
	} 
	if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 50 && mouseY < 50 + 75 && cookies >= autoClickerCost) {
		autoClickerColor = 245
	}
	
	//Grandma
	if(cookies < grandmaCost) {
		grandmaColor = 200
	} else if (mouseX < 20 && mouseX > 20 + 250 && mouseY < 130 && mouseY > 130 + 75 && cookies >= grandmaCost) {
		grandmaColor = 255
	} else if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 130 && mouseY < 130 + 75 && cookies < grandmaCost) {
		grandmaColor = 200
	} else {
		grandmaColor = 255
	} 
	if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 130 && mouseY < 130 + 75 && cookies >= grandmaCost) {
		grandmaColor = 245
	}
	
	//Factory
	if(cookies < factoryCost) {
		factoryColor = 200
	} else if (mouseX < 20 && mouseX > 20 + 250 && mouseY < 210 && mouseY > 210 + 75 && cookies >= factoryCost) {
		factoryColor = 255
	} else if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 210 && mouseY < 210 + 75 && cookies < factoryCost) {
		factoryColor = 200
	} else {
		factoryColor = 255
	} 
	if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 210 && mouseY < 210 + 75 && cookies >= factoryCost) {
		factoryColor = 245
	}
	
	//Mine
	if(cookies < mineCost) {
		mineColor = 200
	} else if (mouseX < 20 && mouseX > 20 + 250 && mouseY < 290 && mouseY > 290 + 75 && cookies >= mineCost) {
		mineColor = 255
	} else if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 290 && mouseY < 290 + 75 && cookies < mineCost) {
		mineColor = 200
	} else {
		mineColor = 255
	} 
	if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 290 && mouseY < 290 + 75 && cookies >= mineCost) {
		mineColor = 245
	}
	
	//Lab
	if(cookies < labCost) {
		labColor = 200
	} else if (mouseX < 20 && mouseX > 20 + 250 && mouseY < 370 && mouseY > 370 + 75 && cookies >= labCost) {
		mineColor = 255
	} else if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 370 && mouseY < 370 + 75 && cookies < labCost) {
		labColor = 200
	} else {
		labColor = 255
	} 
	if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 370 && mouseY < 370 + 75 && cookies >= labCost) {
		labColor = 245
	}
	
	//Portal
	if(cookies < portalCost) {
		portalColor = 200
	} else if (mouseX < 20 && mouseX > 20 + 250 && mouseY < 450 && mouseY > 450 + 75 && cookies >= portalCost) {
		portalColor = 255
	} else if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 450 && mouseY < 450 + 75 && cookies < portalCost) {
		portalColor = 200
	} else {
		portalColor = 255
	} 
	if (mouseX > 20 && mouseX < 20 + 250 && mouseY > 450 && mouseY < 450 + 75 && cookies >= portalCost) {
		portalColor = 245
	}
//End of items --------------------------------------------------------------------------------------------------\\
	
	//Shop Lines
	for(i = 0; i < 461; i = i + 80) {
		line(200, i + 50, 200, i + 125);
	}
	

	//Icons
	image(autoClickerImage, 201, 51, 69, 75);
	image(grandmaImage, 201, 131, 69, 75);
	image(factoryImage, 201, 211, 69, 74);
	image(mineImage, 201, 291, 69, 75);
	image(labImage, 201, 370, 70, 75);
	image(portalImage, 201, 450, 69, 75);
}


//Click response.
function mousePressed() {
	if(mouseX > cookieX && mouseX < cookieX + cookieW && mouseY > cookieY && mouseY < cookieY + cookieH) {
		cookieX = cookieX - 5;
		cookieY = cookieY - 5;
		cookieH = cookieH + 10;
		cookieW = cookieW + 10;
	}
}


//Space response
function keyPressed () {
		if (key == " ") {
			cookies++
		}
	}


//Cookie gets larger when you click it.
function mouseReleased() {
	if(mouseX > cookieX && mouseX < cookieX + cookieW && mouseY > cookieY && mouseY < cookieY + cookieH) {
		cookieX = cookieX + 5;
		cookieY = cookieY + 5; 
		cookieH = cookieH - 10; 
		cookieW = cookieW - 10; 
	}
}



//Mouse Clicked.
function mouseClicked() {	
	if(mouseX > cookieX && mouseX < cookieX + cookieW && mouseY > cookieY && mouseY < cookieY + cookieH) {
		cookies++;
	}
		// Buy auto clicker.
	if(mouseX > 20 && mouseX < 20 + 250 && mouseY > 50 && mouseY < 50 + 75 && cookies >= autoClickerCost) {
		cookies = cookies - autoClickerCost;
		autoClickerOwned++;
	}
		//Buy grandma.
	if(mouseX > 20 && mouseX < 20 + 250 && mouseY > 130 && mouseY < 130 + 75 && cookies >= grandmaCost) {
		cookies = cookies - grandmaCost;
		grandmaOwned++;
	}
		//Buy factory
	if(mouseX > 20 && mouseX < 20 + 250 && mouseY > 210 && mouseY < 210 + 75 && cookies >= factoryCost) {
		cookies = cookies - factoryCost;
		factoryOwned++;
	}
		//Buy mine
	if(mouseX > 20 && mouseX < 20 + 250 && mouseY > 290 && mouseY < 290 + 75 && cookies >= mineCost) {
		cookies = cookies - mineCost;
		mineOwned++;
	}
		//Buy Lab
	if(mouseX > 20 && mouseX < 20 + 250 && mouseY > 370 && mouseY < 370 + 75 && cookies >= labCost) {
		cookies = cookies - labCost;
		labOwned++;	
	}
		//Buy Portal
	if(mouseX > 20 && mouseX < 20 + 250 && mouseY > 450 && mouseY < 450 + 75 && cookies >= portalCost) {
		cookies = cookies - portalCost;
		portalOwned++;
	}
}


function drawCookie() {
	noStroke();
	image(cookieImage, cookieX, cookieY, cookieW, cookieH);
}
