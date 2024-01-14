// Write your code here

import {Component} from 'react'

import './index.css'

class ReviewsCarousel extends Component {
  state = {
    activeReviewIndex: 0,
  }

  onClickRightArrow = () => {
    const {activeReviewIndex} = this.state
    const {reviewsList} = this.props

    if (activeReviewIndex < reviewsList.length - 1) {
      this.setState(prevState => ({
        activeReviewIndex: prevState.activeReviewIndex + 1,
      }))
    }
  }

  renderActiveReview = review => {
    const {imgUrl, username, companyName, description} = review
    return (
      <div className="review-container">
        <img alt={username} src={imgUrl} />
        <p className="user-name">{username}</p>
        <p className="company-name">{companyName}</p>
        <p className="descrption">{description}</p>
      </div>
    )
  }

  onClickLeftArrow = () => {
    const {activeReviewIndex} = this.state

    if (activeReviewIndex > 0) {
      this.setState(prevState => ({
        activeReviewIndex: prevState.activeReviewIndex - 1,
      }))
    }
  }

  render() {
    const {reviewsList} = this.props
    const {activeReviewIndex} = this.state
    const currentReviewDetails = reviewsList[activeReviewIndex]

    return (
      <div className="app-container">
        <div className="reviews-container">
          <h1 className="heading">Reviews</h1>
          <div className="camal-container">
            <button
              type="button"
              className="left-arrow"
              onClick={this.onClickLeftArrow}
              testid="leftArrow"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png "
                alt="left arrow"
              />
            </button>
            {this.renderActiveReview(currentReviewDetails)}
            <button
              type="button"
              onClick={this.onClickRightArrow}
              testid="rightArrow"
              className="right-arrow"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png "
                alt="right arrow"
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default ReviewsCarousel