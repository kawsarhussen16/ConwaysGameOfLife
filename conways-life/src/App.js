import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      start: 0,
      generation: 1,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }
  selectRandomBox = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }
  playByRole = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });

  }
  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playByRole, 100);
  }
  restart = (e) => {
    e.preventDefault();
    window.location.reload();
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.playByRole, 100);
  }
  pauseButton = () => {
    clearInterval(this.intervalId);
  }
  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  }
  componentDidMount() {
    this.selectRandomBox();
    this.playButton();
  }

  render() {
    return (
      <div className="App">
        <h1> The Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          clear={this.clear}
          restart={this.restart}
          pause={this.pauseButton}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />

        <h2> Generation : {this.state.generation} </h2>
        <Rules />

      </div>
    );
  }
}

class Box extends React.Component {
  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = (this.props.cols * 16) + 1;
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            col={j}
            row={i}
          />
        );
      }
    }
    return (
      <div className=" grid" style={{ width: width }}>
        {rowsArr}
      </div>
    )
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}> {}Play </button>
          <button className="btn btn-default" onClick={this.props.pause} > Pause </button>
          <button className="btn btn-default" onClick={this.props.clear}> Clear </button>
          <button className="btn btn-default" onClick={this.props.restart} > Restart </button>

        </ButtonToolbar>
      </div>
    )
  }
}
class Rules extends React.Component {
  render() {
    return (
      <div className="rules">
        <h1>Rules for Conway's Game of Life</h1>

        <p>
          <>At the heart of this game are four rules that determine if a cell is live or dead. All depend on how many of that cell's neighbors are alive. </>
          <ul>
            <li> <strong>Births: </strong>Each dead cell adjacent to exactly three live neighbors will become live in the next generation.</li>

            <li> <strong>Death by isolation: </strong>Each live cell with one or fewer live neighbors will die in the next generation.  </li>
            <li> <strong>Death by overcrowding: </strong>Each live cell with four or more live neighbors will die in the next generation.</li>
            <li> <strong>Survival: </strong>Each live cell with either two or three live neighbors will remain alive for the next generation.  </li>

          </ul>
          <>  Another important fact about the rules for the game of life is that all rules apply to all cells at the same time.  </>
        </p>
      </div>
    )
  }
}


function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
