import React, {Component} from 'react';
import Cell from './Cell';

class Board extends Component{

  constructor(props) {  //Constructor is not mandatory in an ES6 class. It is required only when you want to give inital state (getInitialState) or componentDidMount. I want too print value of n when Board mounts.
       super(props);  //Whenever there is a constructor, super is mandatory. Super gives 'this' the context
       //We use super(props) instead of super() whenever we want to use props inside the constructor.
       console.log("Board dimension: "+ this.props.n);
       this.drawcell = this.drawCell.bind(this);
       this.getRows = this.getRows.bind(this);

       var cellsArray = [];

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
       this.state = { cellsArray: cellsArray };
   }

   drawCell(cellObj, index){
       return(
         <Cell key={index} cellObj={cellObj}/>
       );
   }

   getRows(rowArray, index){
      return rowArray.map(this.drawCell);
   }

  //  componentWillMount(){
  //    //Copying cellsArray to tempCellsArray by value (not by reference) because state should be immutable
  //    //we cant directly  this.state.cellsArray[row][col].value = value; as this does not trigger a state change. Hence we do this.setState!
  //   //  this.state.cellsArray[row][col].value = value;
  //   //  this.setState({cellsArray: this.state.cellsArray})
  //   //Note: cellsArray is an Array. We cant copy it with = as it is copied by reference. Thus we need to use spread. But, cellsArray is a 2D array. Therefore, spread alone is not enough as the rowArrays inside wll be copied by reference.
   //
  //    console.log(".......");
  //    var tempCellsArray = [...this.state.cellsArray];
  //    for(var i =0; i< tempCellsArray.length; i++){
  //        tempCellsArray[i] = tempCellsArray[i].slice();
  //        for(var j=0; j< tempCellsArray.length; j++){
  //            tempCellsArray[i][j] = Object.assign({},tempCellsArray[i][j]);
  //        }
  //    }
   //
  //    this.props.snakeQueue.map(function(snakeCell,index){
  //      console.log("snake in "+snakeCell.row+","+snakeCell.col);
  //      tempCellsArray[snakeCell.row][snakeCell.col].value = 1;
  //    })
   //
  //    this.setState({cellsArray: tempCellsArray});
  //  }

   componentWillReceiveProps(){
     //Copying cellsArray to tempCellsArray by value (not by reference) because state should be immutable
     //we cant directly  this.state.cellsArray[row][col].value = value; as this does not trigger a state change. Hence we do this.setState!
    //  this.state.cellsArray[row][col].value = value;
    //  this.setState({cellsArray: this.state.cellsArray})
    //Note: cellsArray is an Array. We cant copy it with = as it is copied by reference. Thus we need to use spread. But, cellsArray is a 2D array. Therefore, spread alone is not enough as the rowArrays inside wll be copied by reference.

     var tempCellsArray = [...this.state.cellsArray];
     for(var i =0; i< tempCellsArray.length; i++){
         tempCellsArray[i] = tempCellsArray[i].slice();
         for(var j=0; j< tempCellsArray.length; j++){
             tempCellsArray[i][j] = Object.assign({},tempCellsArray[i][j],{value:0}); //Clearing board. Snake will be drawn fully again. But react's virtual dom will re-render only head and tail(if need be)
         }
     }

     if(typeof(this.props.food.row)!="undefined"){  //Adding this line because initially food is not present
      tempCellsArray[this.props.food.row][this.props.food.col].value = 2;
    }

     this.props.snakeQueue.map(function(snakeCell,index){       //Rendering snake after food so that snake goes on top of food
      //  console.log("snake in "+snakeCell.row+","+snakeCell.col);
       tempCellsArray[snakeCell.row][snakeCell.col].value = 1;
     })



     this.setState({cellsArray: tempCellsArray});
   }

   render(){
        return(
          <div id="board" style={{height:`${30*this.props.n}px`, width:`${30*this.props.n}px`}}>
            {this.state.cellsArray.map(this.getRows)}

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
