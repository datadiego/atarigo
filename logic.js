function keyPressed(){
    if(keyCode == 65){
        let visited = createVisitedArray(boardSize)
      console.log(dfs(0, 0, 1, createVisitedArray(boardSize), board))
      return
    }
    if(keyCode == 66){
      selectedStone = 2
      return
    }
    if(keycode = 78){
      selectedStone = 1
      return
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
      //Comprobamos el tablero
      
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
  
  function getNeighbors(x, y, target){
    let neighbors = createArray(boardSize)
    if(x > 0 && board[x-1][y] == target){
      neighbors.push([x-1, y])
    }
    if(x < boardSize-1 && board[x+1][y] == target){
      neighbors.push([x+1, y])
    }
    if(y > 0 && board[x][y-1] == target){
      neighbors.push([x, y-1])
    }
    if(y < boardSize-1 && board[x][y+1] == target){
      neighbors.push([x, y+1])
    }
    return neighbors
  }
  function checkVisitedAndBoardSize(visited, board){
    //check if both are the same size
    if(visited.length != board.length){
      return false
    }
    
    for(let i = 0; i < visited.length; i++){
      if(visited[i].length != board[i].length){
        return false
      }
    }
    return true
  }
  function createArray(nlines){
    //Crea un array bidimensional de nlines x nlines con 0s
    let array = []
    for(let i = 0; i < nlines; i++){
      array.push([])
      for(let j = 0; j < nlines; j++){
        array[i].push(0)
      }
    }
    return array
  }
  function createVisitedArray(nlines){
    let array = []
    for(let i = 0; i < nlines; i++){
      array.push([])
      for(let j = 0; j < nlines; j++){
        array[i].push(false)
      }
    }
    return array
  }
  
  function dfs(x, y, target, visited, board){
    if(checkVisitedAndBoardSize(visited, board) == false){
      return 
    }
    if(board[x][y] != target){
      return
    }
    visited[x][y] = true
    let neighbors = getNeighbors(x, y, target)
    for(let i = 0; i < neighbors.length; i++){
      if(visited[neighbors[i][0]][neighbors[i][1]] == false){
        dfs(neighbors[i][0], neighbors[i][1], target, visited, board)
      }
    }
    return visited
  }

