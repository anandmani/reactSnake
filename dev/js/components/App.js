import React, {Component} from 'react';
import Board from './Board';
require('../../css/stylesheet.css');
// var dataURI = require('../../../HighScore.txt');   //this is when i use url-loader to load a file. It's contents are encoded in the url itself.
var moment = require('moment');
// var fileURL = require('../../../HighScore.txt');

//dataURI is of the form  data:text/plain;base64,MzENCg==  where  MzENCg== is the data encoded in base64. Thus, we  split the string by "," take the second element and decode it to get data. decoding is done using window.atob()
// var highScore = window.atob(dataURI.split(",")[1]);

class App extends Component{

  constructor(){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.gameloop = this.gameloop.bind(this);
    this.spawnFood = this.spawnFood.bind(this);
    this.resetGame = this.resetGame.bind(this);
    // this.readTextFile = this.readTextFile.bind(this);
    this.snakeHash = [];
    this.startTime = moment();
    this.state = { snakeQueue: [ {row:0,col:0}, {row:0,col:1}  ], direction: "right", n:5, buttonPressed: false, foodPresent: false, food:{}, score: 2, gameOver: false};
  }

  //Adding state buttonPressed because, when snake is moving down, we press right,up fast within one game loop duration, then snake moves up from down. Because there was an intermediate right pressed. To avoid this, we accept only one input per game loop duration.
 handleKeyPress(event){
   event.preventDefault();//Because in firefox up, down, left, right scroll in the window
   switch(event.keyCode){
     case 87:
        if(this.state.direction!= "down" && this.state.buttonPressed == false){
          console.log("up pressed");
          this.setState({direction: "up", buttonPressed: true});
        }
     break;
     case 38:
       if(this.state.direction!= "down" && this.state.buttonPressed == false){
         console.log("up pressed");
         this.setState({direction: "up", buttonPressed: true});
       }
     break;

     case 65:
       if(this.state.direction!="right" && this.state.buttonPressed == false){
         console.log("left pressed");
         this.setState({direction: "left", buttonPressed: true});
       }
     break;
     case 37:
       if(this.state.direction!="right" && this.state.buttonPressed == false){
         console.log("left pressed");
         this.setState({direction: "left", buttonPressed: true});
       }
     break;

     case 83:
       if(this.state.direction!="up" && this.state.buttonPressed == false){
         console.log("down pressed");
         this.setState({direction: "down", buttonPressed: true});
       }
     break;
     case 40:
       if(this.state.direction!="up" && this.state.buttonPressed == false){
         console.log("down pressed");
         this.setState({direction: "down", buttonPressed: true});
       }
     break;

     case 68:
       if(this.state.direction!="left" && this.state.buttonPressed == false){
         console.log("right pressed");
         this.setState({direction: "right", buttonPressed: true});
       }
     break;
     case 39:
       if(this.state.direction!="left" && this.state.buttonPressed == false){
         console.log("right pressed");
         this.setState({direction: "right", buttonPressed: true});
       }
     break;

     default:
     break;

   }
 }


moveSnake(){
    var tempSnakeQueue = [...this.state.snakeQueue];
    for(var i=0; i<tempSnakeQueue.length; i++){
      tempSnakeQueue[i] = Object.assign({},  tempSnakeQueue[i]);
    }
    var head = Object.assign({},tempSnakeQueue[tempSnakeQueue.length-1]);

    if(head.row == this.state.food.row && head.col == this.state.food.col){
      this.setState({score: this.state.score+1, foodPresent: false});
    }
    else {
        var exTail = tempSnakeQueue.shift(); //Removing last element of queue
        this.snakeHash[`${exTail.row},${exTail.col}`]=false;//Updating snake hash as well
    }


    switch (this.state.direction) {
      case "up":
          head.row = head.row - 1;
      break;

      case "down":
        head.row = head.row + 1;
      break;

      case "left":
        head.col = head.col - 1;
      break;

      case "right":
        head.col = head.col + 1;
      break;

      default:
      break;

    }
    //Check for collisions with snake body
    if(this.snakeHash[`${head.row},${head.col}`]==true){
      console.log('Collision with snake body!');
      this.setState({gameOver: true});
      throw new Error('Collision with snake body!');
    }
    //Check for collisions with boundary
    if(head.row < 0 || head.row >= this.state.n || head.col < 0 || head.col >= this.state.n){
      console.log('Collision with boundary!');
      this.setState({gameOver: true});
      throw new Error('Collision with boundary!');
    }
    //Updating Snake with new head
    tempSnakeQueue.push(head);
    this.snakeHash[`${head.row},${head.col}`]=true;//Updating snake hash as well
    this.setState({snakeQueue: tempSnakeQueue});
}

spawnFood(){
    var foodRow = Math.floor((Math.random() * this.state.n)); //Random number between 0 and n-1
    var foodCol = Math.floor((Math.random() * this.state.n)); //Random number between 0 and n-1
    //Checking if snake is present at random location generated
    while(this.snakeHash[`${foodRow},${foodCol}`]==true){
      console.log("Snake present at random location generated for food. Generating new location");
      foodRow = Math.floor((Math.random() * this.state.n));
      foodCol = Math.floor((Math.random() * this.state.n));
    }
    console.log("Spawning food at "+foodRow+","+foodCol);
    this.setState({food: {row:foodRow, col:foodCol}, foodPresent: true});
}


gameloop(){ //Asynchronous function to continuously move the snake. This should be async as we take keyboard inputs from the user parallely
  var that = this;
  setTimeout(function(){
    console.log("Moving snake "+that.state.direction);
    that.moveSnake();
    that.setState({buttonPressed: false});
    if(that.state.foodPresent ==  false){
      that.spawnFood();
    }
    that.gameloop();
  },30);
}


 componentWillMount(){
   var num = prompt("NxN Board. Enter N (eg. 25)");
   num = Number(num);
   this.setState({n:num});
   if(localStorage.getItem("highScore")==null){
       localStorage.setItem("highScore",2);
   }
   this.gameloop();
 }

  componentDidMount(){
    console.log("inside component did mount");
    this.refs.app.focus();
    this.startTime = moment();
    for(var i=0; i<this.state.snakeQueue.length; i++){
      this.snakeHash[`${this.state.snakeQueue[i].row},${this.state.snakeQueue[i].col}`]=true;
    }
    // this.readTextFile();
  }

  resetGame(){
    console.log("reseting game");
    if(this.state.score>localStorage.getItem("highScore")){
      localStorage.setItem("highScore",this.state.score);
    }
    this.snakeHash=[];
    this.setState({ snakeQueue: [ {row:0,col:0}, {row:0,col:1}  ], direction: "right", n:this.state.n, buttonPressed: false, foodPresent: false, food:{}, score: 2, gameOver:false});
    this.startTime = moment();
    this.snakeHash["0,0"]= true;
    this.snakeHash["0,1"]= true;
    // this.readTextFile();
    this.gameloop();

  }

  // readTextFile()
  // {
  //     var rawFile = new XMLHttpRequest();
  //     var that = this;
  //     rawFile.open("GET", fileURL, true);
  //     rawFile.onreadystatechange = function ()
  //     {
  //         if(rawFile.readyState === 4)
  //         {
  //             if(rawFile.status === 200 || rawFile.status == 0)
  //             {
  //                 var allText = rawFile.responseText;
  //                 that.setState({highScore: allText});
  //             }
  //         }
  //     }
  //     rawFile.send(null);
  // }

  render(){
    var d = moment(); //We store time the game started in  instance var startTime. Then, in render, everytime we get current time and show diff of current time and start time!
    console.log("snake queue");
    console.log(this.state.snakeQueue);
    console.log("snake hash");
    console.log(this.snakeHash);//this is kinda conk as console.log prints final state of snakeHash (reference)
    return(
      <div id="app" ref="app" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <button id="buttonRestart" onClick={this.resetGame}>Restart</button>
        <div id="score">Score: {this.state.score}</div>
        <div id="highScore">HighScore: {localStorage.getItem("highScore")}</div>
        <div id="timer">{d.diff(this.startTime, 'seconds')}.{d.diff(this.startTime, 'milliseconds')%1000}sec</div>
        <Board n={this.state.n} snakeQueue={this.state.snakeQueue} food={this.state.food}/>
        <div id="gameOver" style={{display:(this.state.gameOver)?"block":"none"}}>Game Over</div>
      </div>
    );
  }
}


export default App;
