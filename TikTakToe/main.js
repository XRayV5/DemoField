console.log("--------TikTacToe behind the Scene--------");

var plotTracker = [];
var board;
var brdsize = 3;
var gameStatus;//finished ? onGoing
var winTrack;
var imgPath = ["url(img/cross_red.png)","url(img/greenDot.jpg)"];


function gameReset(size){
  plotTracker=[];
  clearBrd();
  board = initBoard(size);
  initGrids(size);
}

function clearBrd(){
  $(".grdgrp>div").remove();
}

board = initBoard(brdsize);
initGrids(brdsize);
$("#reset").on("click",function(){return gameReset(brdsize);});

$("#prpReset").on("click",function(){
  $("#myModal").css("display","none");
  $(".modal-header h2").remove();
  return gameReset(brdsize);
});
//imgPath = ["img/cross_red.png","img/greenDot.jpg"];
//Grid initialization
function initGrids(size){
  plotTracker=[];
  for(var i=0; i<size; i++){
    for(var j=0; j<size; j++){
      var id = i.toString()+"_"+j.toString();
      var $grid = $("<div>").addClass("grid").attr("id",id)
      $(".grdgrp").append($grid);
    }
  }
    //$(".grdgrp").append("<div class='holder'></div>");
  $(".grid").on("click",function(event){
    plotTracker.push(event.target.id);
    console.log(event.target.id);
    plot(event.target.id,plotTracker);
    placeOX(event.target.id,plotTracker);
    $(this).off("click");
    console.log(plotTracker);
  });
}

function plot(pit,track){
  var piece;
  if(track.length%2){
    piece="X";
  }else{
    piece="O";
  }
    var xy = pit.split("_");
    board[xy[0]][xy[1]]=pit+"_"+piece;
    //invoke winOrloss here!
    var result　= winOrloss(board,piece);
    if(result!==false){
      gameStatus = "finished";
      //disable the board
      $(".grid").off();

      if(typeof result==="object"){
        if(result[0].includes("X")){
        //prompt X here
          promptWin("Player1 is the winner!");
          console.log("X!!!");
        }else if(result[0].includes("O")){
          //promt O here
          promptWin("Player2 is the winner!");
          console.log("O!!!");
        }
      }
      else{
        //prompt Draw!
        console.log(result+"!!!");
        promptWin("Draw Game!");
      }

    }
}
function placeOX(pit,track){
  if(track.length%2){
    //$("#"+pit).append($("<img>").attr("src",imgPath[0]));
    $("#"+pit).css("background-image",imgPath[0]);
    $("#"+pit).css("background-size","contain");
  }else{
    //$("#"+pit).append($("<img>").attr("src",imgPath[1]));

    $("#"+pit).css("background-image",imgPath[1]);
    $("#"+pit).css("background-size","contain");
  }
}

function initBoard(size){
          var iMax = size;
          var jMax = size;
          var brd = new Array();
          for (i=0;i<iMax;i++) {
           brd[i]=new Array();
           for (j=0;j<jMax;j++) {
            brd[i][j]="";
           }
          }
    return brd;
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function promptWin(result){
  $("#myModal").css("display","block");
  $(".modal-header").append("<h2>"+result+"</h2>");
}

$(".close").on("click",function(){
  $("#myModal").css("display","none");
  $(".modal-header h2").remove();
});


function winOrloss(crtBrd,flg){
  // function of deciding w or l
  //x demension check
  // console.log(flg);
  // console.log(crtBrd);
  var hrzn = judgeCall(crtBrd,flg);
  var vert = judgeCall(transposingArr(crtBrd),flg);
  var diag = checkDiag(crtBrd,flg);
  var anti = checkDiagFlip(crtBrd,flg);
    if(hrzn!==false){
      console.log("The winner is "+flg+" horizon");
      console.log(hrzn);
      //winTrack = hrzn;
      return hrzn;
    }else if(vert!==false){
      console.log("The winner is "+flg+" vertical");
      console.log(vert);
      return vert;
    }else if(diag!==false){
      console.log("The winner is "+flg+" diag");
      console.log("###", diag);
      winTrack = diag;
      return diag;
    }else if(anti!==false){
      console.log("The winner is "+flg+" anti-diag");
      console.log(anti);
      return anti;
    }else if(plotTracker.length===brdsize*brdsize){
      console.log("All Tied!");
      return "draw";
    }else{
      return false;
    }
}

function judgeCall(crtBrd,flg){
  var win;
  for(var i=0; i<crtBrd.length; i++){
    if(crtBrd[i].every(function(e){return e.includes(flg);})){
      win = crtBrd[i];
      break;
    }
      win = false;
  }
  return win;
}

function checkDiag(crtBrd,flg){
  var diag = [];
  var win = false;
  for(var i=0; i<crtBrd.length; i++){
    diag.push(crtBrd[i][i]);
  }
  if(diag.every(function(e){return e.includes(flg);})){
    win = diag;
  }
  return win;
}

function checkDiagFlip(crtBrd,flg){
  var diag = [];
  var win = false;
  var j = 0;
  for(var i=crtBrd.length-1; i>=0; i--){
    diag.push(crtBrd[i][j]);
    j++;
  }
  if(diag.every(function(e){return e.includes(flg);})){
    win = diag;
  }
  return win;
}

function transposingArr(array){
  //flip the gameboard over 90degs
  var newArray = array[0].map(function(col, i) {
    return array.map(function(row) {
      return row[i]
    })
  });
  return newArray;
}
//test field
// showBrd(testCase4);//judgeCall
// showBrd(transposingArr(testCase4));
// console.log(checkDiag(testCase6,"O"));
// console.log(checkDiagFlip(testCase6,"X"));
// console.log(judgeCall(testCase5,"O"));
// console.log(judgeCall(transposingArr(testCase5),"O"));
// winOrloss(testCase1,"X");//X
// winOrloss(testCase2,"X");//X
// winOrloss(testCase3,"X");//false
// winOrloss(testCase3,"O");//false
// winOrloss(testCase4,"O");//O
// winOrloss(testCase5,"O");//O
// winOrloss(testCase6,"O");//O
//board initialization:
function initBoard(size){
    var iMax = size;
    var jMax = size;
    var brd = new Array();
    for (i=0;i<iMax;i++) {
     brd[i]=new Array();
     for (j=0;j<jMax;j++) {
      brd[i][j]="";
     }
    }
  return brd;
}

function showBrd(crtBrd){
  for(var i = 0; i < crtBrd.length; i++){
    var row = "";
    for(var j = 0; j < crtBrd[i].length; j++){
      if(crtBrd[i][j]===""){
        crtBrd[i][j]=" ";
      }
      row += crtBrd[i][j];
    }
    console.log(row);
  }
}

var test = initBoard(3);
//testPlot(test);
// showBrd(test);
//
// function plot(x,y,flg,brd){
//     return brd[x][y] = flg;
// }

function testPlot(brd){
  var pcs = ["X","O"];
  for(var i = 0; i < brd.length; i++){
    var row = "";
    for(var j = 0; j < brd[i].length; j++){
      if(brd[i][j]===""){
        brd[i][j]=pcs[Math.floor((Math.random() * 2))];
      }
      row += brd[i][j];
    }
    console.log(row);
  }
}

var testCase1 = [
  ["X","X","X"],
  ["X","O","O"],
  ["O","X","O"]
];//X
var testCase2 = [
  ["X","X","X"],
  ["X","","O"],
  ["O","O",""]
];//X
var testCase3 = [
  ["X","O","X"],
  ["X","","O"],
  ["O","",""]
];//nil
var testCase4 = [
  ["O","X","X"],
  ["X","O","X"],
  ["O","","O"]
];//0
var testCase5 = [
  ["O","","X"],
  ["O","O","X"],
  ["O","",""]
];//O
// var testCase6 = [
//   ["O","","X"],
//   ["","X","X"],
//   ["X","",""]
// ];
var testCase6 = [
  ["O","","X"],
  ["","O","X"],
  ["X","","O"]
];
//console.log(initBoard(10));
