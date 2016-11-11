import React, {Component} from 'react';

class Cell extends Component{
  render(){
    var clr;
    switch(this.props.cellObj.value){
      case 0:
        clr = "black";
      break;
      case 1:
        clr = "green";
      break;
      case 2:
        clr = "red";
      break;
      default:
        console.log("Invalid value for cell "+this.props.cellObj.row+","+this.props.cellObj.col);
      break;
    }
    return(
         <div className="cell" style={{ backgroundColor: clr}}>{this.props.cellObj.row},{this.props.cellObj.col}</div>
        // <div className="cell" style={{backgroundColor: clr}}></div>
    );

  }
}

export default Cell;
