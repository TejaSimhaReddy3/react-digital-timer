import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeInSeconds: 0,
  timeMaxInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  renderTimer = () => {
    const {timeMaxInMinutes, timeInSeconds} = this.state
    const timeRemaining = timeMaxInMinutes * 60 - timeInSeconds

    const minutes = Math.floor(timeRemaining / 60)
    const seconds = Math.floor(timeRemaining % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  incrementElapsedSeconds = () => {
    const {timeInSeconds, timeMaxInMinutes} = this.state
    const isTimerCompleted = timeInSeconds === timeMaxInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timeMaxInMinutes} = this.state
    const isTimerCompleted = timeInSeconds === timeMaxInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementElapsedSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onReset = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const timeStateImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timeStateContainer">
        <button
          className="timeControlButton"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={timeStateImgUrl}
            className="timeStateImageClass"
            alt={altText}
          />
          <p className="timeStateP">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="timeControlButton"
          type="button"
          onClick={this.onReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timeStateImageClass"
          />
          <p className="timeStateP">Reset</p>
        </button>
      </div>
    )
  }

  onDecrementTimer = () => {
    const {timeMaxInMinutes} = this.state

    if (timeMaxInMinutes > 1) {
      this.setState(prevState => ({
        timeMaxInMinutes: prevState.timeMaxInMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timeMaxInMinutes: prevState.timeMaxInMinutes + 1,
    }))
  }

  renderTimeIncrementAndDecrements = () => {
    const {timeInSeconds, timeMaxInMinutes} = this.state
    const isButtonDisabled = timeInSeconds > 0

    return (
      <div className="timerIncrementsAndDecrementsController">
        <p className="pillaPara">Set Timer limit</p>
        <div className="limitsController">
          <button
            className="timerPlusMinusButtons"
            disabled={isButtonDisabled}
            onClick={this.onDecrementTimer}
            type="button"
          >
            -
          </button>
          <div className="timeInMinutesContainer">
            <p className="timeInMinutesValue">{timeMaxInMinutes}</p>
          </div>
          <button
            className="timerPlusMinusButtons"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bgContainer">
        <h1 className="mainHeading">Digital Timer</h1>
        <div className="timeDisplayContainer">
          <div className="timerContainer">
            <div className="timeElapsed">
              <h1 className="timeHeading">{this.renderTimer()}</h1>
              <p className="labelText">{labelText}</p>
            </div>
          </div>
          <div className="timeControllerContainer">
            {this.renderTimeController()}
            {this.renderTimeIncrementAndDecrements()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
