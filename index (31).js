// Write your code here
const TabItem = props => {
  const {tabDetails, setActiveTabId, isActive} = props
  const {tabId, displayText} = tabDetails

  const onClickTab = () => {
    setActiveTabId(tabId)
  }

  const tabBtnClassName = isActive ? 'tab-button active' : 'tab-button'

  return (
    <li className="tab-item">
      <button
        type="button"
        onClick={onClickTab}
        className={tabBtnClassName}
      ></button>
    </li>
  )
}

export default TabItem
