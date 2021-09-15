img = ""
status = ""
object = []
function preload() {
    img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(380,380)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd',modeloaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}
function modeloaded() {
    console.log("Model Loaded!!!!")
    status = true
    
}
function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        object = results
    }
}
function draw() {
    image(video, 0, 0, 380, 380)
       if (status != "") {
        objectDetector.detect(video ,gotResults)
           for ( i = 0; i < object.length; i++) {
               r = random(255)
               g = random(255)
               b = random(255)
               document.getElementById("status").innerHTML = "Status : Object Detected"
               document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + object.length
               fill(r,g,b)
              percent = floor(object[i].confidence * 100)
              text(object[i].label + " " + percent + "%",+ object[i].x, object[i].y)
              noFill()
              stroke(r,g,b)
              rect(object[i].x, object[i].y, object[i].width, object[i].height)
           }
       }      
    }
