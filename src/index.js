import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

      return (
        <button className="square" 
                onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]}
                     onClick={() => this.props.onClick(i)} />;
    }
  
    render() {  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
      };
    }
      handleClick = (idx) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); //Makes a copy of squares
        if(calculateWinner(current.squares || squares[idx]))
          return;
        squares[idx] = this.state.xIsNext ? 'X': 'O';
        this.setState(
          {
            history: history.concat([
              {
                squares: squares
              }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
          });
        console.log(this.state.squares);
      }
      //Unlike the array push() method you might be more familiar with, 
      //the concat() method doesn’t mutate the original array, so we prefer it.
      jumpTo(step){
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }
      render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((val, index) => {
        const description = `Go To Move # ${index}`;
        return (
          <li key = {index}>
            <button onClick={() => this.jumpTo(index)}>{description}</button>
            </li>
        );
      });
      let status;
      if(winner){
        status = `Winner is ${winner}`;
      }else{
        status = `Next Players is ${this.state.xIsNext ? 'X': 'O'}`;
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
                    onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  