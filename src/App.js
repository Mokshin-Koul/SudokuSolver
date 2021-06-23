import React, { Component } from "react";
import "./board.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      solve: false,
      touched: false,
    };
  }
  componentDidMount() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      const boardRow = [];
      for (let j = 0; j < 9; j++) {
        const cell = {
          value: "",
          x: i,
          y: j,
        };
        boardRow.push(cell);
      }
      board.push(boardRow);
    }
    this.setState({
      board: board,
    });
  }

  isSafe(board, i, j, element) {
    for (let t = 0; t < 9; t++) {
      if (parseInt(board[i][t].value) === element) {
        return [false, "same row"];
      }
      if (parseInt(board[t][j].value) === element) {
        return [false, "same column"];
      }
      //console.log(3*parseInt(i/3)+parseInt(t/3),3*parseInt(j/3)+t%3)
      if (
        parseInt(
          board[3 * parseInt(i / 3) + parseInt(t / 3)][
            3 * parseInt(j / 3) + parseInt(t % 3)
          ].value
        ) === element
      ) {
        return [false, "same box"];
      }
    }
    return [true, "safe"];
  }

  sudokuSolver() {
    const board = [...this.state.board]
    if (!this.state.touched) {
      alert("First enter some values to start!!!");
      return;
    }
    this.setState({
      solve: true,
    });
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j].value === "") {
          for (let k = 1; k <= 9; k++) {
            const [isSafe, area] = this.isSafe(board, i, j, k);
            if (isSafe) {
              board[i][j].value = k.toString();
               this.setState({
                   board: board
               })
                 console.log(board)

              if (this.sudokuSolver() === true) {
                return true;
              } else {
                board[i][j].value = "";
                     this.setState({
                      board: board
                  })
              }
            }
          }
          return false;
        }
      }
    }
    this.setState({
        solve: false
    })
    return true;
  }

   setValue(e,cell) {
       const board = [...this.state.board]
       const [isSafe,area] = this.isSafe(board,cell.x,cell.y,parseInt(e.target.value))
       const check = document.querySelector(`.Cell-${cell.x}-${cell.y}`).classList.contains('text-bold')
       const solve = this.state.solve
       if(!solve && !check) {
          document.querySelector(`.Cell-${cell.x}-${cell.y}`).classList.add('text-bold')
       }
       if(e.target.value === '') {
          document.querySelector(`.Cell-${cell.x}-${cell.y}`).classList.remove('text-bold')
       }
       if(!isSafe) {
           alert(`You cannot put same values in ${area}`)
           board[cell.x][cell.y].value = ''
           this.setState({
              board: board
          })
           return;
       }
      board[cell.x][cell.y].value = e.target.value
      if(!e.target.value) {
          this.setState({
              touched: false
          })
          return;
      }
      this.setState({
          board: board,
          touched: true
      })
   }

  clearSudoku() {
    const board = [...this.state.board];
    board.forEach((current) => {
      current.forEach((cell) => {
        cell.value = "";
        document
          .querySelector(`.Cell-${cell.x}-${cell.y}`)
          .classList.remove("text-bold");
      });
    });
    this.setState({
      board: board,
      touched: false,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="Board">
          {this.state.board.map((current, pos) => {
            return (
              <div className="BoardRow" key={pos}>
                {current.map((cell, index) => {
                  const classes = ["Cell", `Cell-${cell.x}-${cell.y}`];
                  return (
                    <input
                      key={index}
                      type="text"
                      className={classes.join(" ")}
                      value={cell.value}
                      onChange={(e) => this.setValue(e, cell)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="sudoku-solve">
          <button onClick={() => this.sudokuSolver()}>
            Solve Sudoku
          </button>
          <button onClick={() => this.clearSudoku()}>Reset Sudoku</button>
        </div>
      </div>
    );
  }
}

export default App;
