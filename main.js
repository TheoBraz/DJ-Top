var frutinhasdeliciosas;
var objectDetector;
var objetis = [];
var video;
var status = false;

function gotDetections(error, results) {
    objetis = results;
    if (results) {
        console.log(results);
    }
    objectDetector.detect(video, gotDetections());
}

function preload() {
    frutinhasdeliciosas = loadImage("frutasdeliciosas.jpg")
}

function modelLoaded() {
    status = true;
    console.log('Model Loaded!');
    objectDetector.detect(video, gotDetections());
}

function setup() {
    canvas = createCanvas(1450, 650);
    video = createCapture(VIDEO);
    video.size(1450, 650);
    video.hide();
    canvas.center();
}
function borabil() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("butaum").innerHTML = "Detectando Objetos";
}

function draw() {
    image(video, 0, 0, 1450, 650);
    fill("#FF0000");
    if (status == true) {
        objectDetector.detect(video, gotDetections());
        for (i = 0; i < objetis.length; i++) {
            fill("FF0000");
            text(objetis[i].label, objetis[i].x, objetis[i].y);
            noFill();
            stroke(0, 255, 0);
            rect(objetis[i].x, objetis[i].y, objetis[i].width, objetis[i].height);
        }
    }
}
