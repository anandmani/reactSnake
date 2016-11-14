import React, {Component} from 'react';
import Cell from './Cell';


var cellsArray = [];//this is a global variable although it cannot be accessed directly from other files. Therefore it's life is throughtout the program. So, when Board is re-rendered, it does not lose its value, It retains it


class Board extends Component{

  constructor(props) {  //Constructor is not mandatory in an ES6 class. It is required only when you want to give inital state (getInitialState) or componentDidMount. I want too print value of n when Board mounts.
       super(props);  //Whenever there is a constructor, super is mandatory. Super gives 'this' the context
       //We use super(props) instead of super() whenever we want to use props inside the constructor.
       console.log("Board dimension: "+ this.props.n);
       this.drawcell = this.drawCell.bind(this);
       this.getRows = this.getRows.bind(this);
      //  this.lol  = 1;     //this is an instance variable. Use it when you dont need a variable to be a state and want it to be accessible throughout the class. It's value is retained between renders. This is because a class object is not destroyed between renders! it's just sitting there passively without being rendered. Not to misunderstand. Just because this class sits in a different file, it gets destroyed. It's all one big code chunk just simply scattered.
       for(var i = 0; i< this.props.n; i++){
           var rowArray = [];
           for(var j =0; j<this.props.n; j++){
               rowArray.push({
                            row: i,
                            col: j,
                            value: 0,  //value 0 = empty cell, 1 = snake, 2 = food
                          })
           }
           cellsArray.push(rowArray);
         }

   }

   drawCell(cellObj, index){
       return(
         <Cell key={index} cellObj={cellObj}/>
       );
   }

   getRows(rowArray, index){
      return rowArray.map(this.drawCell);
   }

   componentWillReceiveProps(){ //Tried refactoring this function further. Instead of whiping whole baord clean on every Props received, tried to clear only the ex tail. But we need to clear tail, food (and even whole snake when restart button is pressed). To many extra props have to be passed down to Board. Thus, sticking to this method.

    console.log("inside board");
    console.log(this.props.snakeQueue);

    for(var i = 0; i< this.props.n; i++){ //clean board. Need to paint snake and food
        for(var j =0; j<this.props.n; j++){
          cellsArray[i][j].value = 0;
      }
    }

    if(typeof(this.props.food.row)!="undefined"){  //Adding this line because initially food is not present
      cellsArray[this.props.food.row][this.props.food.col].value = 2;
    }

     this.props.snakeQueue.map(function(snakeCell,index){       //Rendering snake after food so that snake goes on top of food
      //  console.log("snake in "+snakeCell.row+","+snakeCell.col);
       cellsArray[snakeCell.row][snakeCell.col].value = 1;   //When collision with boundary happens. this is where Error is thrown as there is no '.value' defined.
     })

   }

   render(){
        console.log("rendering board");
        // this.lol = this.lol+1
        // console.log(this.lol);  //this is the instance variable declared in the constructor
        return(
          <div id="board" style={{height:`${30*this.props.n}px`, width:`${30*this.props.n}px`, left:`-${this.props.n*30/2}px`}}>
            {cellsArray.map(this.getRows)}

          </div>
        );
  }

}


Board.propTypes = {
  n : React.PropTypes.number,
};

// Board.defaultProps = {     //There is no point of this because, even if we cancel prompt asking us to input n, App will pass a prop n = null
//   n: 30,
// };


export default Board;
