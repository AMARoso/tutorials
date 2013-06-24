function init() {
	//initialize the stage
	canvas = document.getElementById("tutorialCanvas");
	stage = new createjs.Stage(canvas);

	//adding the background image
	var background = new createjs.Bitmap("images/background.jpg");
	stage.addChild(background);

	//adding the trees image
	var trees = new createjs.Bitmap("images/trees.png");
	stage.addChild(trees);

	//adding the ground image and positioning it
	var ground = new createjs.Bitmap("images/ground.png");
	stage.addChild(ground);
	ground.y = 164;

	//updating the stage
	stage.update();
}