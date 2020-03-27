// var easycam;
var rubik;
var COLORSDIC = {};

var angle = 0;
var moves = [], acc = [];
var delayMoves = 10;
var t = 0, t2 = 0, xAcc = 0, yAcc = 0;
var debugAxis, debugH, debugON;

var a,b,c,d,e;//debug


function setup() {
  // createCanvas(1000, 1000, WEBGL);
  createCanvas(1920, 1080, WEBGL);
  frameRate(30);
  COLORSDIC = {
    //x
    RED: color(255,0,0),//red
    ORANGE: color(245, 135, 66),//orange
    //y
    BLUE: color(0, 144, 247),//blue
    GREEN: color(0, 255, 0),//green
    //z
    WHITE: color(255),//white
    YELLOW: color(247, 239, 0), //yellow
    CUBECOLOR: color(50),//cubeColor
    NULL: color(100)
    
  };
  
  rubik = new RubikCube(4);

  debugON = false;
  // moves = ["u", "u'", "u'", "u"];
  // moves = ["d", "d'", "d'", "d"];
  // moves = ["r", "r'", "r'", "r"];
  // moves = ["l", "l'", "l'", "l"];
  // moves = ["f", "f'", "f'", "f"];
  // moves = ["b", "b'", "b'", "b"];
  // moves = ["b'"];
  // moves = ["b'","b","b","b'"];
  // moves = ["r", "r", "l", "l", "f", "f", "b", "b", "u", "u", "d", "d"];
  // moves = ["u", "r", "r", "f", "b", "r", "b", "b", "r", "u", "u", "l", "b", "b", "r", "u'", "d'", "r", "r", "f", "r'", "l", "b", "b", "u", "u", "f", "f"];
  // moves = ["b", "d", "f'", "b'", "d", "l", "l", "u", "l", "u'", "b", "d'", "r", "b", "r", "d'", "r", "l'", "f", "u", "u", "d"];
  debugAxis = "z";
  // debugH = 0;
  debugH = rubik.dim - 1;
  acc = array_nD.o.get3DSlice(rubik.pieces, debugAxis, debugH);


  // var d = 4;
  // var a = array_nD.make.empty(d,d,d);
  // for(let i = 0, l = 0; i < d; i++){
  //     for(let j = 0; j < d; j++){
  //         for(let k = 0; k < d; k++){
  //             a[i][j][k] = l++;
  //         }
  //     }

  // }
  // printArray_nD(a);
  // var s = array_nD.o.permutation_3D(a, "x", 0);
  // printArray_nD(s);
  // printArray_nD(a);
}

function draw() {
  background(220);
  let angX = (mouseX - width / 2) * 1.5 * Math.PI / width;
  let angY = (mouseY - height / 2) * 0.5 * Math.PI / height;
  camera(-1000 * Math.sin(angX), 1000 * Math.cos(angX), 1000 * Math.sin(angY), 0, 0, 0, 0, 0, -1);
  // camera(700 * Math.sin(angle), -700 * Math.cos(angle), 400 * Math.cos(angle/2), 0, 0, 0, 0, 0, -1);
  // camera(600, -600, 600  * Math.cos(angle), 0, 0, 0, 0, 0, -1);
  // camera(600, 600, -600, 0, 0, 0, 0, 0, -1);
  // camera(700 * Math.sin(-angle), 700 * Math.cos(angle), 700 , 0, 0, 0, 0, 0, -1);
  
  // angle = (Math.PI / 4);
  w = Math.PI / 180
  // w = Math.PI / 720
  angle = (angle - w);

  
  
  
  if(debugON && t2++ > delayMoves && acc.length > 0){
    t2 = 0;
    // printArray_nD(acc)
    if(yAcc == rubik.dim){
      xAcc = 0;
      yAcc = 0;
      for(let i = 0; i < rubik.dim; i++){
        for(let j = 0; j < rubik.dim; j++){
          acc[i][j].w = 100;
        }
      }
      t++;
    }
    else if(xAcc == rubik.dim){
      xAcc = 0;
      yAcc++;
    }
    else{
      acc[xAcc++][yAcc].w = 107;
    }
  }

  if(!debugON && t++ > delayMoves && moves.length > 0){
    t = 0;
    rubik.move(moves[0]);
    console.log("New move -> " + moves[0]);
    moves.splice(0,1);
    acc = array_nD.o.get3DSlice(rubik.pieces, debugAxis, debugH);
  }
  if(debugON && t > 0 && moves.length > 0){
    t = 0;
    rubik.move(moves[0]);
    moves.splice(0,1);
    acc = array_nD.o.get3DSlice(rubik.pieces, debugAxis, debugH);
  }

  rubik.show();
  // noLoop();
}

function keyPressed() {
  console.log(keyCode);
  if(keyCodes[keyCode] !== undefined){
    // rubik.move(keyCodes[keyCode]);
    rubik.move(keyCodes[keyCode], true);
  }
}