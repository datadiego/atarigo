let boardSize = 3;
let colorFondo;
let colorLineas;
let colorBlack;
let colorWhite;
let anchoBase;
let inputSize;
let inputMode;
let stoneSelector;
let board = createArray(boardSize);
let turno = 1;
let game = false;
let editMode = false;
let selectedStone = 1;

function calc_espacio(nlines){
  return width/(nlines+1)
}

function showCircleBlack(x, y){
  //El circulo solo se muestra con multiplos del anchoBase
  let valX = round(x/anchoBase)
  let valY = round(y/anchoBase)
  let xpos = valX*anchoBase
  let ypos = valY*anchoBase
  
  if(xpos >= anchoBase && ypos >= anchoBase && xpos <= anchoBase * boardSize && ypos <= anchoBase * boardSize){
      noStroke();
      fill(0)
    circle(xpos, ypos, anchoBase)
    
  }
}
function showCircleWhite(x, y){
  //El circulo solo se muestra con multiplos del anchoBase
  let valX = round(x/anchoBase)
  let valY = round(y/anchoBase)
  let xpos = valX*anchoBase
  let ypos = valY*anchoBase
  
  if(xpos >= anchoBase && ypos >= anchoBase && xpos <= anchoBase * boardSize && ypos <= anchoBase * boardSize){
    noStroke();
      fill(colorWhitePlayer)
    circle(xpos, ypos, anchoBase)
    
  }
}

function drawStones(){
  for(let i = 0; i < boardSize; i++){
    for(let j = 0; j < boardSize; j++){
      if(board[i][j] == 1){
        fill(0)
        noStroke()
        circle((i+1)*anchoBase, (j+1)*anchoBase, anchoBase)
      }else if(board[i][j] == 2){
        fill(colorWhitePlayer)
        noStroke()
        circle((i+1)*anchoBase, (j+1)*anchoBase, anchoBase)
      }
    }
  }
}

function addBlackStoneToArray(x, y){
  if(x < 0 || y < 0 || x > width || y > height){
    return
  }
  let valX = round(x/anchoBase)
  let valY = round(y/anchoBase)
  if(valX != 0 && valY != 0 && valX != boardSize+1 && valY != boardSize+1){
    if(board[valX-1][valY-1] === undefined){
      return
    }
    if(board[valX-1][valY-1] == 0){
      board[valX-1][valY-1] = 1
    }
    
  }
}

function addWhiteStoneToArray(x, y){
  if(x < 0 || y < 0 || x > width || y > height){
    return
  }
  let valX = round(x/anchoBase)
  let valY = round(y/anchoBase)
  if(valX != 0 && valY != 0 && valX != boardSize+1 && valY != boardSize+1){
    if(board[valX-1][valY-1] === undefined){
      return
    }
    if(board[valX-1][valY-1] == 0){
      board[valX-1][valY-1] = 2
    }
  }
}



function drawBoard(nlines){
  let ancho = calc_espacio(nlines)
  strokeWeight(2)
  for(let i = 1; i < nlines+1; i++){
    line(i*ancho, ancho, i*ancho, height-ancho)
    line(ancho, i*ancho, width-ancho, i*ancho)
  }
}

function changeBoardSize(){
  console.log(int(inputSize.value()))
  boardSize = int(inputSize.value())
  anchoBase = calc_espacio(boardSize)
  board = createArray(boardSize)
}

function createArray(nlines){
  let array = []
  for(let i = 0; i < nlines; i++){
    array.push([])
    for(let j = 0; j < nlines; j++){
      array[i].push(0)
    }
  }
  return array
}



function checkColor(x, y, color){
  //check if i have another stone of the same color in the surroundings
  let surroundings = getNearTiles(x, y)
  let count = 0
  for(let i = 0; i < surroundings.length; i++){
    if(surroundings[i] == color){
      count++
    }
  }
  if(count > 1){
    return true
  }
  return false
}


function startGame(){
  console.log(inputMode.value())
  if(inputMode.value() == 'Atari Go'){
  board = createArray(boardSize)
  turno = 0;
  game = true;
  }else if(inputMode.value() == 'Edit Mode'){
    editMode = true
  }
}

function mouseClicked(fxn){
  if(mouseX == undefined || mouseY == undefined){
    return
  }
  if(game){
    if(turno%2 == 0){
      addWhiteStoneToArray(mouseX, mouseY)
    }else{
      addBlackStoneToArray(mouseX, mouseY)
    }
    turno++
  }

  if (editMode){
    if(selectedStone == 1){
      addBlackStoneToArray(mouseX, mouseY)
  }
  if(selectedStone == 2){
    addWhiteStoneToArray(mouseX, mouseY)
  }

}
}
function keyPressed(){
  if(keyCode == 65){
    console.log(board)
    return
  }
  if(keyCode == 66){
    console.log('black')
    selectedStone = 2
    return
  }
  if(keycode = 78){
    console.log('white')
    selectedStone = 1
    return
  }
}

function changeStoneSelector(){
  if(selectedStone == 1){
    selectedStone = 2
  }else{
    selectedStone = 1
  }
}

function setup() {
  if(displayWidth < 500){
  createCanvas(displayWidth/3, displayWidth/3);
  }else{
    createCanvas(600, 600);
  }
  pixelDensity()
  colorFondo = color(40)
  colorLineas = color(220)
  colorBlackPlayer = color(0)
  colorWhitePlayer = color(220)
  anchoBase = calc_espacio(boardSize)
  inputSize = createSelect();
  inputSize.option('3x3');
  inputSize.option('5x5');
  inputSize.option('10x10');
  inputSize.option('19x19');
  inputSize.position(20, 65);
  inputSize.size(100, 20);
  inputSize.changed(changeBoardSize);
  inputMode = createSelect();
  inputMode.option('Atari Go');
  inputMode.option('Edit Mode');
  inputMode.position(20, 95);
  inputMode.size(100, 20);
  //create a switch button for the selectstone
  stoneSelector = createCheckbox('Stone Selector', false);
  stoneSelector.position(20, 125);
  stoneSelector.style('width', '400px');
  stoneSelector.changed(changeStoneSelector);
  stoneSelector.hide()

  let buttonStart = createButton('GO!');
  buttonStart.size(60, 20)
  buttonStart.position(inputSize.x + inputSize.width, 65);
  buttonStart.mousePressed(startGame);
}


//add a function for the key pressed "A"


function draw() {
  background(colorFondo)
  stroke(220)
  drawBoard(boardSize)
  
  if(game){
    fill(220)
    noStroke()
    text('Turno: ' + turno, 20, 20)
    
    if(turno%2 == 0){
      text('Turno de las blancas', 20, 40)
      showCircleWhite(mouseX, mouseY)
    }else{
      text('Turno de las negras', 20, 40)
      showCircleBlack(mouseX, mouseY)
    }
  }
  if(editMode){
    fill(220)
    noStroke()
    text('Edit Mode', 20, 40)
    stoneSelector.show()
    if(selectedStone == 1){
      text('Selected Stone: Black', 20, 60)
      showCircleBlack(mouseX, mouseY)
    }
    if(selectedStone == 2){
      text('Selected Stone: White', 20, 60)
      showCircleWhite(mouseX, mouseY)
    }
  }
  drawStones()
}