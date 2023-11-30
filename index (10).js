// Write your code here

import {Component} from 'react'

import './index.css'

class ClickCounter extends Component {
  state = {
    count: 0,
  }

  onIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <h1 className="heading">
          The Button
          <br />
          <span className="valu">{count}</span>
        </h1>
        <p className="descrption">click to button</p>
        <div className="button-contaoner">
          <button className="button" type="button" onClick={this.onIncrease}>
            Click Me!
          </button>
        </div>
      </div>
    )
  }
}

export default ClickCounter
