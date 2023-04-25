function updateSizeSelector(){
    let val = str(boardSize+ 'x' + boardSize)
    
  }
  function calc_espacio(nlines){
    return width/(nlines+1)
  }
function changeStoneSelector(){
    if(selectedStone == 1){
      selectedStone = 2
    }else{
      selectedStone = 1
    }
  }

  