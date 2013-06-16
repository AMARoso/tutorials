function init() {
	//initialize the stage
	canvas = document.getElementById("tutorialCanvas");
	stage = new createjs.Stage(canvas);

	//THIS CODE IS FOR IMAGE PRELOADING IT IS NOT PART OF TUTORIAL 1
	//WE WILL LEARN HOW TO THIS PROPERLY IN THE NEXT TUTORIAL
	//IT IS HERE SO YOU DON'T HAVE TO REFRESH YOUR BROWSER TO SE THE IMAGES ON THE CANVAS
	var image = new Image();
	image.src = "images/background.jpg";
	image.onload = function() {
	stage.update();
	};
	var image2 = new Image();
	image2.src = "images/trees.jpg";
	image2.onload = function() {
	stage.update();
	};
	var image3 = new Image();
	image3.src = "images/ground.jpg";
	image3.onload = function() {
	stage.update();
	};
	//END OF PRELOAD PART THE REST IS TUTORIAL 1

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