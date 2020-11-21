import * as data from './data.json';
import './App.css';
import React from 'react';
import InfoContainer from './components/infocontainer'

class App extends React.Component {

  componentDidMount() {
    this.setState({
      current: data[0],
      activeClass: 1
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      current: {},
      activeClass: 1,
    }
    this.cardEl = React.createRef();
    this.leftEl = React.createRef();
    this.floaters = React.createRef();
    this.circle = React.createRef();
    this.imageEl = React.createRef();
  }

  handleEnter = () => {
    this.cardEl.current.style.transition = '0.5s ease'
    this.cardEl.current.style.width = '50%'
    setTimeout(() => { this.cardEl.current.style.transition = 'none' }, 500)
    this.circle.current.style.minHeight = '0px';
    this.circle.current.style.minWidth = '0px'
    this.floaters.current.style.transform = "translateZ(80px)"
    this.imageEl.current.style.transform = "translateZ(100px)"
  }

  handleMove = e => {
    let xAxis = (((e.pageX - this.leftEl.current.clientWidth) / 2) - (window.innerWidth - this.leftEl.current.clientWidth) / 4) / 25
    let yAxis = (window.innerHeight / 2 - (e.clientY)) / 25
    this.cardEl.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
  }

  handleLeave = () => {
    this.cardEl.current.style.transform = `rotateY(0deg) rotateX(0deg)`
    this.cardEl.current.style.transition = '1s ease'
    this.cardEl.current.style.width = '100%'
    this.circle.current.style.minHeight = '30vh';
    this.circle.current.style.minWidth = '30vh'
  }

  handleClick = (each) => {
    this.setState({ current: each })
    this.setState({ activeClass: each.id })
  }

  render() {
    return (
      <div className="App" >
        <div className="left-container"
          ref={this.leftEl}>
          {data.default.map(each => <InfoContainer
            activeClass={this.state.activeClass}
            customClickEvent={() => this.handleClick(each)}
            key={each.id}
            user={each} />)}
        </div>
        <div className="right-container"
          onMouseMove={this.handleMove}
          onMouseLeave={this.handleLeave}
          onMouseEnter={this.handleEnter}>
          <div className="card-holder" ref={this.cardEl}>
            <div className="circle" ref={this.circle} />
              <img className="picture" src={this.state.current.img} alt={this.state.current.name} ref={this.imageEl} />
            <div className="info" ref={this.floaters}>
              <h1>
                {this.state.current.name}
              </h1>
              <h3>
                {this.state.current.job} | {this.state.current.age}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
