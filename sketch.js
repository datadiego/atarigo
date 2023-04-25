let boardSize = 3;
let colorFondo;
let colorLineas;
let colorBlack;
let colorWhite;
let anchoBase;
let inputMode;
let stoneSelector;
let board = createArray(boardSize);
let turno = 1;
let game = false;
let editMode = false;
let selectedStone = 1;






function startGame(){
  board = createArray(boardSize)
  turno = 1;
  anchoBase = calc_espacio(boardSize)
  if(inputMode.value() == 'Atari Go'){
    game = true;
    editMode = false
  }else if(inputMode.value() == 'Edit Mode'){
    editMode = true
    game = false
  }
}

function setup() {
  if(displayWidth < 500){
  createCanvas(displayWidth, displayWidth);
  }else{
    createCanvas(600, 600);
  }
  pixelDensity()
  colorFondo = color(40)
  colorLineas = color(220)
  colorBlackPlayer = color(0)
  colorWhitePlayer = color(220)
  anchoBase = calc_espacio(boardSize)

  let textBoardSize = createP('Board Size')
  textBoardSize.position(20, 35)
  textBoardSize.style('font-size', '20px')


  inputMode = createSelect();
  inputMode.option('Edit Mode');
  inputMode.option('Atari Go');
  inputMode.changed(startGame)
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
  buttonStart.position(120, 95);
  buttonStart.mousePressed(startGame);

  let buttonIncreaseSize = createButton('+');
  buttonIncreaseSize.size(20, 20)
  buttonIncreaseSize.position(textBoardSize.position().x + textWidth('Board Size') + 40, 55)
  buttonIncreaseSize.mousePressed(increaseBoardSize);

  let buttonDecreaseSize = createButton('-');
  buttonDecreaseSize.size(20, 20)
  buttonDecreaseSize.position(textBoardSize.position().x + textWidth('Board Size') + 60, 55)
  buttonDecreaseSize.mousePressed(decreaseBoardSize);


  startGame()
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