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
        <div
          className="action-button calculate-cost"
          onClick={(e) => { this._calculateCost(e) }}>
          <p>CALCULATE COST</p>
        </div>
        <div
          className="action-button send-query"
          onClick={(e) => { this._sendQuery(e) }}>
          <p>SEND QUERY</p>
        </div>
      </div>
    )
  }

}

export default ActionButtons
