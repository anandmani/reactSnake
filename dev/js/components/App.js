import React, {Component} from 'react';
import Board from './Board';
require('../../css/stylesheet.css');

class App extends Component{

  constructor(){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.state = { snakeQueue: [ {row:0,col:0}, {row:0,col:1}  ], direction: "right", n:5 };
  }

 handleKeyPress(event){
   switch(event.keyCode){
     case 87:
        if(this.state.direction!= "down"){
          console.log("up pressed");
          this.setState({direction: "up"});
        }
     break;
     case 38:
       if(this.state.direction!= "down"){
         console.log("up pressed");
         this.setState({direction: "up"});
       }
     break;

     case 65:
       if(this.state.direction!="right"){
         console.log("left pressed");
         this.setState({direction: "left"});
       }
     break;
     case 37:
       if(this.state.direction!="right"){
         console.log("left pressed");
         this.setState({direction: "left"});
       }
     break;

     case 83:
       if(this.state.direction!="up"){
         console.log("down pressed");
         this.setState({direction: "down"});
       }
     break;
     case 40:
       if(this.state.direction!="up"){
         console.log("down pressed");
         this.setState({direction: "down"});
       }
     break;

     case 68:
       if(this.state.direction!="left"){
         console.log("right pressed");
         this.setState({direction: "right"});
       }
     break;
     case 39:
       if(this.state.direction!="left"){
         console.log("right pressed");
         this.setState({direction: "right"});
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
    tempSnakeQueue.shift(); //Removing last element of queue

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

 componentWillMount(){
   var num = prompt("NxN Board. Enter N ");
   num = Number(num);
   this.setState({n:num});
   var that = this;
   var gameloop = function(){
     setTimeout(function(){
       console.log("Moving snake "+that.state.direction);
       that.moveSnake();
       gameloop();
     },1000);
   }

   gameloop();
 }

  render(){

    return(
      <div id="app" tabIndex="1" onKeyDown={this.handleKeyPress}>
        <Board n={this.state.n} snakeQueue={this.state.snakeQueue}/>
      </div>
    );
  }
}


export default App;
