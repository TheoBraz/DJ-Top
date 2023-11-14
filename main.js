song = "";
var narix = 0;

function preload()
{
	song = loadSound("Alan Walker - The Spectre.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function draw() {
	image(video, 0, 0, 600, 500);
	song.setVolume(Math.round(narix/600));
	fill("#FF0000");
	stroke("#FF0000");
	document.getElementById("volume").innerHTML = "volume: " + Math.round(narix/600 * 10);
}

function gotPoses(results){
	narix = results[0].pose.nose.x;
	console.log(narix);
}

function play()
{
	song.play();
	song.rate(1);
}
