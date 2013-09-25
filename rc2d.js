demos.rc2d = {};

demos.rc2d.GRASS = 3;
demos.rc2d.DIRT = 2;
demos.rc2d.STONE = 1;

demos.rc2d.initWorld = function(world) {
	for (var x = 10; x < 300; x += 40) {
		for (var y = 100; y < 280; y+= 40) {
			var tileType = y <= 120? demos.rc2d.GRASS: (y < 200? demos.rc2d.DIRT: demos.rc2d.STONE);
			demos.rc2d.createBall(world, x, y, 10 + Math.floor(Math.random() * 20), tileType, false);
		}
	}
}

demos.rc2d.createBall = function(world, x, y, rad, type, fixed) {
	var ball = demos.top.createBall(world, x, y, rad, fixed);
	ball["texture"] = type;
	ball.AllowSleeping(true);
}

demos.rc2d.onClick = function(world, x, y) {
	var texture = Math.floor(Math.random() * 16 * 15);
	demos.rc2d.createBall(world, x, y, 10 + Math.floor(Math.random() * 20), texture, false);
}

demos.rc2d.onRightClick = function(world, x, y) {
	var boundbox = new b2AABB();
	boundbox.minVertex = new b2Vec2(x - 1, y - 1);
	boundbox.maxVertex = new b2Vec2(x + 1, y + 1);
	var list = new Array(1);
	var count = world.Query(boundbox, list, 1);
	if (count > 0 && typeof(list[0].m_body["texture"]) != "undefined") {
		world.DestroyBody(list[0].m_body);
	}
}

demos.InitWorlds.push(demos.rc2d.initWorld);
