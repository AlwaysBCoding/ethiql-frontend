import React, { Component } from 'react'
import _ from 'lodash'

class QueryResult extends Component {

  render() {
    var QueryResultTableHeaders = []
    var QueryResultTableData = []

    if(this.props.queryResult.length > 0) {
      _.each(this.props.queryResult[0], (header) => {
        QueryResultTableHeaders.push(<th key={header}>{header}</th>)
      })

      _.each(_.drop(this.props.queryResult), (row, index) => {
        var QueryResultTableRowData = []

        _.each(row, (item, index) => {
          QueryResultTableRowData.push(
            <td key={`item-${index}`}>
              {item}
            </td>
          )
        })

        QueryResultTableData.push(
          <tr key={`row-${index}`}>
            {QueryResultTableRowData}
          </tr>
        )
      })
    }

    return (
      <div className="query-result">
        <table className="query-result-table">
          <thead>
            <tr>
              {QueryResultTableHeaders}
            </tr>
          </thead>
          <tbody>
            {QueryResultTableData}
          </tbody>
        </table>
      </div>
    )
  }

}

export default QueryResult
