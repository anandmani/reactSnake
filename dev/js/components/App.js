import React, {Component} from 'react';
import Board from './Board';
require('../../css/stylesheet.css');

class App extends Component{


  render(){
    var n = prompt("NxN Board. Enter N ");
    n = Number(n);
    return(
      <Board n={n}/>
    );
  }
}


export default App;
