import React, { Component } from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/sql'
import 'brace/theme/cobalt'

class TextEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _handleChange(text) {
    this.props.eventEmitter.emit("updateQuery", {
      queryText: text
    })
  }

  render() {
    return (
      <div className="text-editor">
        <AceEditor
          mode="sql"
          theme="cobalt"
          onChange={(text) => { this._handleChange(text) }}
          value={this.props.currentQuery}
          name="main-text-editor"
          editorProps={{}} />
      </div>
    )
  }

}

export default TextEditor
