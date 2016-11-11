import React, {Component} from 'react';
import Board from './Board';
require('../../css/stylesheet.css');


class App extends Component{

  constructor(){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.gameloop = this.gameloop.bind(this);
    this.spawnFood = this.spawnFood.bind(this);
    this.state = { snakeQueue: [ {row:0,col:0}, {row:0,col:1}  ], direction: "right", n:5, buttonPressed: false, foodPresent: false, food:{}, score: 0};
  }

  //Adding state buttonPressed because, when snake is moving down, we press right,up fast within one game loop duration, then snake moves up from down. Because there was an intermediate right pressed. To avoid this, we accept only one input per game loop duration.
 handleKeyPress(event){
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
    console.log(this.state.snakeQueue);

    if(head.row == this.state.food.row && head.col == this.state.food.col){
      this.setState({score: this.state.score+1, foodPresent: false});
    }
    else {
        tempSnakeQueue.shift(); //Removing last element of queue
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
    tempSnakeQueue.push(head);
    this.setState({snakeQueue: tempSnakeQueue});
}

spawnFood(){
    var foodRow = Math.floor((Math.random() * this.state.n)); //Random number between 0 and n-1
    var foodCol = Math.floor((Math.random() * this.state.n)); //Random number between 0 and n-1
    console.log("Spawning food at "+foodRow+","+foodCol);
    this.setState({food: {row:foodRow, col:foodCol}, foodPresent: true});
}


gameloop(){
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
   this.gameloop();
 }

  render(){
    return(
      <div id="app" tabIndex="1" onKeyDown={this.handleKeyPress}>
        <button id="buttonRestart">Restart</button>
        <div id="score">Score: {this.state.score}</div>
        <Board n={this.state.n} snakeQueue={this.state.snakeQueue} food={this.state.food}/>
      </div>
    );
  }
}


export default App;
