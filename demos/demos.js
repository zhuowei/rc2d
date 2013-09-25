var initId = 0;
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var terrainPng;

function setupWorld(did) {
	if (!did) did = 0;
	world = createWorld();
	initId += did;
	initId %= demos.InitWorlds.length;
	if (initId < 0) initId = demos.InitWorlds.length + initId;
	demos.InitWorlds[initId](world);
}
function setupNextWorld() { setupWorld(1); }
function setupPrevWorld() { setupWorld(-1); }
function step(cnt) {
	var stepping = false;
	var timeStep = 1/15;
	var iteration = 1;
	world.Step(timeStep, iteration);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	setTimeout(step, 1000/15);
}
Event.observe(window, 'load', function() {
	setupWorld();
	ctx = $('canvas').getContext('2d');
	var canvasElm = $('canvas');
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	
	terrainPng = processTerrainPng($('terrainpng'));
	Event.observe('canvas', 'click', function(e) {
		demos.rc2d.onClick(world, Event.pointerX(e) - canvasLeft, Event.pointerY(e) - canvasTop);
	});
	/*Event.observe('canvas', 'contextmenu', function(e) {
		if (e.preventDefault) e.preventDefault();
		setupPrevWorld();
		return false;
	});*/
	step();
});

function processTerrainPng(img) {
	var c = document.createElement("canvas");
	c.width = img.width;
	c.height = img.height;
	var ct = c.getContext("2d");
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 16; y++) {
			ct.save();
			ct.beginPath();
			ct.arc((x * 16) + 8, (y * 16) + 8, 8, 0, Math.PI * 2, true);
			ct.clip();
			ct.drawImage(img, x * 16, y * 16, 16, 16, 
				x * 16, y * 16, 16, 16);
			ct.restore();
		}
	}
	return c;
}
