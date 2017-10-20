import React, { Component } from 'react'

class TextEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _handleBlur(e) {
    this.props.eventEmitter.emit("updateQuery", {
      queryText: e.target.value
    })
  }

  render() {
    return (
      <div className="text-editor">
        <textarea
          onBlur={(e) => { this._handleBlur(e) }}>
        </textarea>
      </div>
    )
  }

}

export default TextEditor
