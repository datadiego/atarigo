function drawBoard(nlines){
    let ancho = calc_espacio(nlines)
    strokeWeight(1)
    for(let i = 1; i < nlines+1; i++){
      line(i*ancho, ancho, i*ancho, height-ancho)
      line(ancho, i*ancho, width-ancho, i*ancho)
    }
  }

  function increaseBoardSize(){
    if(boardSize < 19){
    boardSize++
    updateSizeSelector()
    startGame()
    }
  }
  function decreaseBoardSize(){
    if(boardSize > 1){
      boardSize--
      startGame()
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
        turno++;
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
        turno++;
      }
    }
  }