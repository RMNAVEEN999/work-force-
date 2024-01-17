import {components} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends components {
  state = {
    nameInput: '',
    commentsInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentsInput} = this.state
    const initialBackGroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentsInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackGroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentsInput: '',
    }))
  }

  onChangeCommentsInput = event => {
    this.setState({
      commentsInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentsInput, commentsList} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="comments-container">
          <form className="form" onSubmit={this.onAddComment}>
            <p className="description">Say sometime about 4.0 Technologies </p>
            <input
              type="text"
              placeholder="Your Name"
              className="name-input"
              value={nameInput}
              onChange={this.onChangeNameInput}
            />
            <textarea
              rows="6"
              placeholder="Your comments"
              className="comments-input"
              value={commentsInput}
              onChange={this.onChangeCommentsInput}
            />
            <button type="submit" className="add-button">
              Add Comments
            </button>
          </form>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr className="line" />
        <p className="heading1">
          <span className="comments-count">{commentsList.length}</span>
          Comments
        </p>
        <ul className="comments-list">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}
export default Comments
