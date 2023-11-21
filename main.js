song = "";
song2 = "";
var narix = 0;
var nazoom = 1;
var scoreLeftWrist = 0;
var scoreRightElbow = 0;

function preload() {
	song = loadSound("Alan Walker - The Spectre.mp3");
	song2 = loadSound("music.mp3");
}

function setup() {
	canvas = createCanvas(600, 500);
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
	if (scoreLeftWrist > 0.6) {
		song2.stop();
		song.play();
		if (song.isPlaying()) {
			song.stop();
		} else {
			song.play();
		}
	}
	if (scoreRightElbow > 0.7) {
		song.stop();
		song2.play();
		if (song2.isPlaying()) {
			song2.stop();
		} else {
			song2.play();
		}
	}
	image(video, 0, 0, 600, 500);
	song.setVolume((narix / 600));
	song.rate(nazoom / 250);
	fill("#FF0000");
	stroke("#FF0000");
	document.getElementById("volume").innerHTML = "volume: " + floor(narix / 600 * 5);
	document.getElementById("speed").innerHTML = "Velocidade: " + floor(nazoom / 250 * 10) / 10;
}

function gotPoses(results) {
	console.log(results);
	if (results.length > 0) {
		narix = results[0].pose.nose.x;
		console.log(narix);
		nazoom = results[0].pose.nose.y;
		console.log(nazoom)
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		scoreRightElbow = results[0].pose.keypoints[8].score;

	}
}

function play() {

}