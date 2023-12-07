// Write your code here
import {Component} from 'react'

import DestinationItem from '../DestinationItem'

import './index.css'

class DestinationSearch extends Component {
  state = {
    searchInput: '',
  }
  onchangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    const {destinationDetails} = props
    const searchResult = destinationDetails.filter(eachDetail =>
      eachDetail.name.toLowerCase().includes(searchInput.toLowerCase()),
    ) // <- Corrected the filter method closing parenthesis here

    return (
      <div className="app-container">
        <div className="destination-search-container">
          <h1 className="heading">Destination Search</h1>
          <div className="destination-search-input">
            <input
              className="search-input"
              placeholder="search"
              value={searchInput}
              type="search"
              onChange={this.onchangeSearchInput}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
              type="search icon"
              className="search-icon"
            />
          </div>
          <u1 className="destination-search">
            {searchResult.map(eachDetail => (
              <DestinationItem
                key={eachDetail.id}
                destinationDetails={eachDetail}
              />
            ))}
          </u1>
        </div>
      </div>
    )
  }
}

export default DestinationSearch
