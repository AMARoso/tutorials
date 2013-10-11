(function (){

	var LoadingBar = function(width, height, padding, color, frameColor) {

		//setting default values for our arguments if no value is given
		width = typeof width !== 'undefined' ? width : 300;
		height = typeof height !== 'undefined' ? height : 20;
		padding = typeof padding !== 'undefined' ? padding : 3;
		color = typeof color !== 'undefined' ? color : "black";
		frameColor = typeof frameColor !== 'undefined' ? frameColor : "black";

		//calling the initialize function that we have written
		this.initialize(width, height, padding, color, frameColor);
	};

	//LoadingBar will inherit from the Container class
	LoadingBar.prototype = new createjs.Container();

	//saving the old initialize function of the container class cause we are overwriting it
	//we will call the container initialize function in our own initialize
	LoadingBar.prototype.Container_initialize = LoadingBar.prototype.initialize;

	//the initialize function for our LoadingBar class
	LoadingBar.prototype.initialize = function(width, height, padding, color, frameColor) {

		//calling tha saved initialize function of the Container class
		this.Container_initialize();

		//the height, width, padding, color and frame color of the loading bar
		this.width = width;
		this.height = height;
		this.padding = padding;
		this.color = color;
		this.frameColor = frameColor;

		//placing of the container
		this.x = Math.round(canvas.width/2 - this.width/2);
		this.y = 100;

		//creating the loading bar   
		this.loadingBar = new createjs.Shape();
		this.loadingBar.graphics.beginFill(this.color).drawRect(0, 0, 1, this.height).endFill();

		//creating the frame around the loading bar
		this.frame = new createjs.Shape();
		this.frame.graphics.setStrokeStyle(1).beginStroke(this.frameColor).drawRect(-this.padding/2, -this.padding/2, this.width+this.padding, this.height+this.padding).endStroke();

		//adding the loading bar and the frame to our container
		this.addChild(this.loadingBar, this.frame);
	};

    window.LoadingBar = LoadingBar;
}());

function init() {
	//initialize the stage
	canvas = document.getElementById("tutorialCanvas");
	stage = new createjs.Stage(canvas);

	//creating the progress label
	loadProgressLabel = new createjs.Text("","18px Verdana","black");
	loadProgressLabel.lineWidth = 200;
	loadProgressLabel.textAlign = "center";
	loadProgressLabel.x = canvas.width/2;
	loadProgressLabel.y = 50;
	stage.addChild(loadProgressLabel);

	//creatin a loading bar from our class and passing some arguments
	bar = new LoadingBar(400, 40, 5, "red", "black");

	//adding the container with the elements to our stage
    stage.addChild(bar);

    //creating the loading queue and the events for progress and completion
	preload = new createjs.LoadQueue(false);
	preload.addEventListener("complete", handleComplete);
	preload.addEventListener("progress", handleProgress);

	//adding our files to the queue
	preload.loadFile({id: "background", src:"images/background.jpg"});
	preload.loadManifest([{id: "trees", src:"images/trees.png"},
						{id: "ground", src:"images/ground.png"}]);

	stage.update();
}

//this function is called every time the progress of our loading changes
function handleProgress(){
	//changing the length of our loading bar accordingly
	bar.loadingBar.scaleX = preload.progress * bar.width;
	//and the precentage in the loading label
	progresPrecentage = Math.round(preload.progress*100);
	loadProgressLabel.text = progresPrecentage + "% Loaded" ;
	//updating the stage to draw the changes
	stage.update();
}

//this function is called when everyhing is loaded
function handleComplete() {
	//getting the loaded images
	backgroundImage = preload.getResult("background");
	treesImage = preload.getResult("trees");
	groundImage = preload.getResult("ground");

	//changing the label accordingly and updating the stage to show it
	loadProgressLabel.text = "Loading complete click to start";
	stage.update();

	//adding an click event listner to our canvas so that we start our game on a mouse click
	canvas.addEventListener("click", handleClick);
}

function handleClick() {
	//on click we call our start(); function
	start();
	//we remove the progres label and loading bar and also remove the click event listener
	stage.removeChild(loadProgressLabel, bar);
	canvas.removeEventListener("click", handleClick);
}

function start() {
	//adding the background image
	background = new createjs.Bitmap(backgroundImage);
	stage.addChild(background);

	//adding the trees image
	trees = new createjs.Bitmap(treesImage);
	stage.addChild(trees);

	//adding the ground image and positioning it
	ground = new createjs.Bitmap(groundImage);
	stage.addChild(ground);
	ground.y = 164;

	//updating the stage
	stage.update();
}