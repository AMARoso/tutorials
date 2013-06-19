function init() {
	//initialize the stage
	canvas = document.getElementById("tutorialCanvas");
	stage = new createjs.Stage(canvas);

	//adding the background image
	var backgroundImage = new createjs.Bitmap("images/background.jpg");
	stage.addChild(backgroundImage);

	//adding the trees image
	var treesImage = new createjs.Bitmap("images/trees.png");
	stage.addChild(treesImage);

	//adding the ground image and positioning it
	var groundImage = new createjs.Bitmap("images/ground.png");
	stage.addChild(groundImage);
	groundImage.y = 164;

	//updating the stage
	stage.update();
}