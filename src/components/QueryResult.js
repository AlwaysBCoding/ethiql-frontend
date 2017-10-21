import React, { Component } from 'react'
import _ from 'lodash'

class QueryResult extends Component {

  render() {
    var QueryResultTableHeaders = []
    var QueryResultTableData = []

    if(this.props.queryResult.length > 0) {
      _.each(_.keys(this.props.queryResult[0]), (header) => {
        QueryResultTableHeaders.push(<th key={header} className="table-header-item">{header}</th>)
      })

      _.each(this.props.queryResult, (row, index) => {
        var QueryResultTableRowData = []

        _.each(_.values(row), (item, index) => {
          QueryResultTableRowData.push(
            <td className="table-body-item" key={`item-${index}`}>
              {JSON.stringify(item)}
            </td>
          )
        })

        QueryResultTableData.push(
          <tr className="table-body-row" key={`row-${index}`}>
            {QueryResultTableRowData}
          </tr>
        )
      })
    }

    return (
      <div className="query-result">
        <table className="query-result-table" cellspacing="0" cellpadding="0">
          <thead className="table-header">
            {QueryResultTableHeaders}
          </thead>
          <tbody className="table-body">
            {QueryResultTableData}
          </tbody>
        </table>
      </div>
    )
  }

}

export default QueryResult
