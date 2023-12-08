// Write your code here.
import {Component} from 'react'

import './index.css'

class LettersCalculator extends Component {
  state = {
    inputPhrase: '',
  }
  onChangeInputPhrase = event => {
    const {value} = event.target

    this.setState({inputPhrase: value})
  }
  render() {
    const {inputPhrase} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Calculate the Letters you enter</h1>
        <label className="Enter-the-phrase">Enter the phrase</label>
        <input
          type="text"
          placeholder="Enter the phrase"
          value={inputPhrase}
          onChange={this.onChangeInputPhrase}
        />

        <img
          className="letters-calculator"
          alt="letters calculator"
          src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png"
        />
        <p className="letter-count">No.of letters:{inputPhrase.length}</p>
      </div>
    )
  }
}
export default LettersCalculator
