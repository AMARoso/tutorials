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

	//container that holds all the elements of the loading bar
	loadingBarContainer = new createjs.Container();

	//the height width and color of the loading bar
    loadingBarHeight = 20;
    loadingBarWidth = 300;
    LoadingBarColor = createjs.Graphics.getRGB(0,0,0);

	//creating the loading bar   
    loadingBar = new createjs.Shape();
    loadingBar.graphics.beginFill(LoadingBarColor).drawRect(0, 0, 1, loadingBarHeight).endFill();

    //creating the frame around the loading bar
    frame = new createjs.Shape();
    padding = 3;
    frame.graphics.setStrokeStyle(1).beginStroke(LoadingBarColor).drawRect(-padding/2, -padding/2, loadingBarWidth+padding, loadingBarHeight+padding).endStroke();

    //adding the loading bar and the frame to our container and placing it on the desired position on the canvas
    loadingBarContainer.addChild(loadingBar, frame);
    loadingBarContainer.x = Math.round(canvas.width/2 - loadingBarWidth/2);
    loadingBarContainer.y = 100;

	//adding the container with the elements to our stage
    stage.addChild(loadingBarContainer);

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
	loadingBar.scaleX = preload.progress * loadingBarWidth;
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
	stage.removeChild(loadProgressLabel, loadingBarContainer);
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