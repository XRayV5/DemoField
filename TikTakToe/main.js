console.log("--------TikTacToe behind the Scene--------");

var plotTracker = 0;
var board;
var imgPath = ["url(img/cross_red.png)","url(img/greenDot.jpg)"];
//imgPath = ["img/cross_red.png","img/greenDot.jpg"];
//Grid initialization
function initGrids(size){
  plotTracker=0;
  for(var i=0; i<size; i++){
    for(var j=0; j<size; j++){
      var id = i.toString()+"_"+j.toString();
      var $grid = $("<div>").addClass("grid").attr("id",id)
      $(".grdgrp").append($grid);
    }
  }
    //$(".grdgrp").append("<div class='holder'></div>");
  $(".grid").on("click",function(event){
    plotTracker++;
    console.log(event.target.id);
    plot(event.target.id,plotTracker);
    placeOX(event.target.id,plotTracker);
    $(this).off("click");
  });
}

function plot(pit,track){

  var piece;
  if(track%2){
    piece="X";
  }else{
    piece="O";
  }
    var xy = pit.split("_");
    board[xy[0]][xy[1]]=piece;
    //invoke winOrloss here!
    winOrloss(board,piece);
}
function placeOX(pit,track){
  if(track%2){
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

//$('#my-selector').bind('click', function() {
//        $(this).unbind('click');
//        alert('Clicked and unbound!');
// });
// $("#dom").on("click",'span',function(event){
//   console.log(event.target);
//   console.log(event.target.parentNode);
//   //$(event.target).remove();
//   $(event.target.parentNode).remove();
//   event.target.parentNode.removeChild(this);
// });

board = initBoard(3);
initGrids(3);

function winOrloss(crtBrd,flg){
  // function of deciding w or l
  //x demension check
  // console.log(flg);
  // console.log(crtBrd);
  if(judgeCall(crtBrd,flg)){
    console.log("The winner is "+flg+" horizon");
    return true;
  }else if(judgeCall(transposingArr(crtBrd),flg)){
    console.log("The winner is "+flg+" vertical");
    return true;
  }else if(checkDiag(crtBrd,flg)){
    console.log("The winner is "+flg+" diag");
    return true;
  }else if(checkDiagFlip(crtBrd,flg)){
    console.log("The winner is "+flg+" anti-diag");
    return true;
  }else{
    return false;
  }
}

function judgeCall(crtBrd,flg){
  var win;
  for(var i=0; i<crtBrd.length; i++){
    if(crtBrd[i].every(function(e){return e===flg;})){
      win = true;
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
  if(diag.every(function(e){return e===flg;})){
    win = true;
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
  if(diag.every(function(e){return e===flg;})){
    win = true;
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
