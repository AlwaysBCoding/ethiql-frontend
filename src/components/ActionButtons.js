import React, { Component } from 'react'

class ActionButtons extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _calculateCost(e) {
    this.props.eventEmitter.emit("calculateCost", {})
  }

  _sendQuery(e) {
    this.props.eventEmitter.emit("sendQuery", {})
  }

  render() {
    return (
      <div className="action-buttons">
        {/*<div
          className="action-button gray-button"
          onClick={(e) => { this._calculateCost(e) }}>
          <p>CALCULATE COST</p>
        </div>*/}
        <div
          className="action-button green-button"
          onClick={(e) => { this._sendQuery(e) }}>
          <p>SEND QUERY</p>
          <p>{`Current Cost: ${this.props.currentCost}`}</p>
        </div>
      </div>
    )
  }

}

export default ActionButtons
