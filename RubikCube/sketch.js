// var easycam;

var cubeW = 100;
var angle = 0;
var colors = [];
var moves = [];
var delayMoves = 60;
var t = 0;

var rubik;

var a,b,c,d,e;//debug

function setup() {
  createCanvas(600, 600, WEBGL);
  // console.log("hola");
  frameRate(30);
  colors = [
    //x
    color(0, 144, 247),//blue
    color(0, 255, 0),//green
    //y
    color(255,0,0),//red
    color(245, 135, 66),//orange
    //z
    color(255),//white
    color(247, 239, 0), //yellow
    color(50)//cubeColor
  ];
  
  // rubik = new RubikCube(3);
}

function draw() {
  background(220);
  camera(500 * Math.sin(-angle), 500 * Math.cos(angle), 500 , 0, 0, 0, 0, 0, -1);
  // camera(700 * Math.sin(-angle), 700 * Math.cos(angle), 700 , 0, 0, 0, 0, 0, -1);
  
  // angle = (-Math.PI / 4);
  w = Math.PI / 720
  angle = (angle + w);


  push();
  stroke(0);
  strokeWeight(3);
  fill(100, 100, 100);
  box(100, 100, 100);
  pop();

  
  
  a = [
    [1, 3, 4],
    [0, -1, 2],
    [2, 5, 10]];
  console.log(matrix.o.det(a));


  /*
  sould be
  [[-2 1]
   [2/3 -0.5]]
  */


  
  // rubik.show();
  
  // if(t++ > delayMoves && moves.length > 0){
  //   t = 0;
  //   rubik.m(moves[0]);
  //   // moves.push(moves[0]);
  //   moves.splice(0,1);
  // }

  noLoop();
}