



var testCase3 = [
  ["X","","X"],
  ["X","X","O"],
  ["O","",""]
];
var testCase5 = [
  ["O","","X"],
  ["O","O","X"],
  ["O","",""]
];
var testCase4 = [
  ["X","X",""],
  ["X","O","O"],
  ["O","X","X"]
];


var testCase6 = [
  ["X","X",""],
  ["X","O","O"],
  ["","X",""]
];

var testCase8 = [
  ["0_0_X","0_1_X",""],
  ["1_0_X","1_1_X","1_2_O"],
  ["","2_1_O",""]
];
var testCase9 = [
  ["0_0_O","0_1_X","0_2_O"],
  ["1_0_X","1_1_X","1_2_O"],
  ["","2_1_O",""]
];
var testCase10 = [
  ["0_0_O","",""],
  ["1_0_X","",""],
  ["","",""]
];


//write a function return
//Get all available grids in the board
//for each available cell, cal the horizon, Vertical, diag, anti-diag combo
//get the longest combo


function transposingArr(array){
  //flip the gameboard over 90degs
  var newArray = array[0].map(function(col, i) {
    return array.map(function(row) {
      return row[i]
    })
  });
  return newArray;
}

//console.log(transposingArr(testCase5)+"!!!");




//transpose crtBrd and swap x,y to check up and down
function probeInline(x,y,crtBrd,flg){
  var weight=1;
  //search right
  //console.log(crtBrd[x][y+1]);
  var toWin = crtBrd.length;
  for(var i = y+1; i<crtBrd.length; i++){
    if(crtBrd[x][i].includes(flg)){
      console.log(crtBrd[x][i]);
      weight++;
    }else{
      break;
    }
  }
  //search left
  for(var j = y-1; j>=0; j--){
    console.log(crtBrd[x][j]);
    if(crtBrd[x][j].includes(flg)){
      weight++;
    }else{
      break;
    }
  }
  if(weight===toWin){
    //if it is the winning shot
      weight+=100;
  }
  return weight;
}

function probeDiag(x,y,crtBrd,flg){
  var weight = 1;
  // for(var i = x+1;i<crtBrd.length; i++){
  //   if(crtBrd[i][])
  // }
  var toWin = crtBrd.length;
    if(x===y){
      for(var i=x+1; i<crtBrd.length; i++){
        if(crtBrd[i][i].includes(flg)){
          weight++;
        }else{
          break;
        }
      }

      for(var i=x-1; i>=0; i--){
        if(crtBrd[i][i].includes(flg)){
          weight++;
        }else{
          break;
        }
      }
      if(weight===toWin){
        //if it is the winning shot
          weight+=100;
      }
    }
  return weight;
}

function probeRevDiag(x,y,crtBrd,flg){
  var weight = 1;
  var toWin = crtBrd.length;
    if(x+y===(crtBrd.length-1)){
      var j=y-1;
        for(var i=x+1; i<crtBrd.length; i++){
          if(crtBrd[i][j].includes(flg)){
            weight++;
          }else{
            break;
          }
          j--;
        }
      var k=y+1;
      for(var i=x-1; i>=0; i--){
        if(crtBrd[i][k].includes(flg)){
          console.log(crtBrd[i][k]);
          weight++;
        }else{
          console.log(crtBrd[i][k]);
          break;
        }
        k++;
      }
      if(weight===toWin){
        //if it is the winning shot
          weight+=100;
      }
    }
  return weight;
}



function botMove(crtBrd,flg){
  var moves = [];
  var optimal=0;
  var goToMove={};
  for(var i = 0; i < crtBrd.length; i++){
    for(var j = 0; j < crtBrd[i].length; j++){
      if(crtBrd[i][j]===""){
        console.log(i+"_"+j);
        var avail = i+"_"+j;
        var w1 = probeInline(i,j,crtBrd,flg);
        var w2 = probeInline(j,i,transposingArr(crtBrd),flg);
        var w3 = probeDiag(i,j,crtBrd,flg);
        var w4 = probeRevDiag(i,j,crtBrd,flg);
        moves[avail]=w1+w2+w3+w4;
        //search inline X and Y
      }
    }
  }
  for(var k in moves){
    if(moves[k]>optimal){
      optimal=moves[k];
      goToMove[0]=k;
      goToMove[1]=moves[k];
    }
  }
  console.log(moves);
  return goToMove;
}


//var show = botMove(testCase8,"X");
//var show = botMove(testCase9,"X");
var show = botMove(testCase10,"X");
console.log(show[0]);




//transposingArr();
// var w1 = probeInline(2,2,testCase8,"X");
// var w2 = probeInline(2,2,transposingArr(testCase8),"X");
// var w3 = probeDiag(2,2,testCase8,"X");
// var w4 = probeRevDiag(2,2,testCase8,"X");
//
// console.log(w1+" "+w2+" "+w3+" "+w4);
// console.log(probeDiag(2,2,testCase3,"X"));
// console.log(probeDiag(2,2,testCase5,"O"));
// console.log(probeDiag(1,1,testCase4,"X"));
// function probeRevDiag(){
//   var weight=1;
//   if(x+y===(crtBrd.length-1)){
//     var j = 0;
//     for(var i=crtBrd.length-1; i>=0; i--){
//
//       j++;
//     }
//   }
//   return weight;
// }
// function probeVertical(x,y,crtBrd,flg){
//   //search down
//   for(var i = x+1; i<crtBrd.length; i++){
//     if(crtBrd[i][y]===flg){
//       console.log(crtBrd[i][y]);
//       weight++;
//     }else{
//       break;
//     }
//   }
//   //search up
//   for(var i = x-1; i>=0; i--){
//     var weight = 1;
//     if(crtBrd[i][y]===flg){
//       console.log(crtBrd[i][y]);
//       weight++;
//     }else{
//       break;
//     }
//   }
//   if(weight>2){
//     //if it is the winning shot
//       weight+=100;
//   }
//   return weight;
// }
// //console.log(probeInline(0,1,testCase3,"X"));
//console.log(probeInline(2,1,testCase5,"O"));
//console.log(probeInline(0,1,testCase5,"O"));
//console.log(probeInline(0,1,testCase3,"X"));
// var flip = transposingArr(testCase5);
// var flip1 = transposingArr(testCase3);
// //
// //console.log(probeInline(1,0,flip,"O"));
// console.log(probeInline(0,1,testCase3,"X"));
// console.log(probeInline(1,0,flip1,"X"));
























// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
