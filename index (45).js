import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const startImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="heading-item">
        <p className="heading">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickStar}
          data-testId="star"
        >
          <img src={startImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
