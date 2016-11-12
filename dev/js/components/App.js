import React, {Component} from 'react';
import Board from './Board';
require('../../css/stylesheet.css');

var snakeHash = [];

class App extends Component{

  constructor(){
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.gameloop = this.gameloop.bind(this);
    this.spawnFood = this.spawnFood.bind(this);
    this.resetGame = this.resetGame.bind(this);
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
        snakeHash[`${exTail.row},${exTail.col}`]=false;//Updating snake hash as well
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
    if(snakeHash[`${head.row},${head.col}`]==true){
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
    snakeHash[`${head.row},${head.col}`]=true;//Updating snake hash as well
    this.setState({snakeQueue: tempSnakeQueue});
}

spawnFood(){
    var foodRow = Math.floor((Math.random() * this.state.n)); //Random number between 0 and n-1
    var foodCol = Math.floor((Math.random() * this.state.n)); //Random number between 0 and n-1
    //Checking if snake is present at random location generated
    while(snakeHash[`${foodRow},${foodCol}`]==true){
      console.log("Snake present at random location generated for food. Generating new location");
      foodRow = Math.floor((Math.random() * this.state.n));
      foodCol = Math.floor((Math.random() * this.state.n));
    }
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

  componentDidMount(){
    console.log("inside component did mount");
    this.refs.app.focus();
    for(var i=0; i<this.state.snakeQueue.length; i++){
      snakeHash[`${this.state.snakeQueue[i].row},${this.state.snakeQueue[i].col}`]=true;
    }
  }

  resetGame(){
    console.log("reseting game");
    snakeHash=[]
    this.setState({ snakeQueue: [ {row:0,col:0}, {row:0,col:1}  ], direction: "right", n:this.state.n, buttonPressed: false, foodPresent: false, food:{row:10, col:10}, score: 2, gameOver:false});
    snakeHash["0,0"]= true;
    snakeHash["0,1"]= true;
    this.gameloop();

  }

  render(){
    console.log("snake queue");
    console.log(this.state.snakeQueue);
    console.log("snake hash");
    console.log(snakeHash);//this is kinda conk as console.log prints final state of snakeHash (reference)
    return(
      <div id="app" ref="app" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <button id="buttonRestart" onClick={this.resetGame}>Restart</button>
        <div id="score">Score: {this.state.score}</div>
        <Board n={this.state.n} snakeQueue={this.state.snakeQueue} food={this.state.food}/>
        <div id="gameOver" style={{display:(this.state.gameOver)?"block":"none"}}>Game Over</div>
      </div>
    );
  }
}


export default App;
