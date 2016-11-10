import React, {Component} from 'react';

class Snake extends Component{

  constructor(){
      super();
      this.state = { snakeQueue: [ {row:0,col:0} ]};

      this.drawSnake = this.drawSnake.bind(this);
  }

  drawSnake(snakeSegment, index){
    this.props.updateCell(snakeSegment.row,snakeSegment.col,1) //value = 1 to denote snake occupies that cell
  }

  render(){
    console.log("Snake at positions : ");
    this.state.snakeQueue.map(this.drawSnake)
    return(
        <div/>
    );
  }
}

export default Snake;
