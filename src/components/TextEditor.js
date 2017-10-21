import React, { Component } from 'react'
import _ from 'lodash'
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

  _handleChange(text, eventEmitter) {
    eventEmitter.emit("updateQuery", {
      queryText: text
    })
  }

  render() {
    var debouncedFunction = _.debounce(this._handleChange, 2500, {})

    return (
      <div className="text-editor">
        <AceEditor
          mode="sql"
          theme="cobalt"
          onChange={(text) => { debouncedFunction(text, this.props.eventEmitter) }}
          value={this.props.currentQuery}
          name="main-text-editor"
          editorProps={{}} />
      </div>
    )
  }

}

export default TextEditor
