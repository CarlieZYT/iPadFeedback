// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket;

var submission = 0;

function setup() {
  createCanvas(800, 800);
  background(255);

  button = createButton('submit');
  button.position(19, 19);
  button.mousePressed(submitCanvas);

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('10.56.216.152:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 5, 5);
    }
  );

  socket.on('save',
    // When we receive data
    function(data) {
      console.log("Got: 'submit canvas' ");
      // Clear
      saveImg();
      background (255);
    }
  );

}

function draw() {

}

function mouseDragged() {
  // Draw some white circles
  fill(0,0,255);
  noStroke();
  ellipse(mouseX,mouseY,5,5);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

function submitCanvas() {
  background (255);
  var data = {sub: 1};
  socket.emit('save', data);
  console.log("Sent: saveCanvas");
}

function saveImg() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  } 
  else {
    let y = year();
    let mt = month();
    let d = day();
    let h = hour();
    let m = minute();
    let s = second();
    var ImgName = str(y) + str(mt) + str(d) + str(h) + str(m) + str(s);

    saveCanvas(ImgName,"png");
    background (255);
  }

}
