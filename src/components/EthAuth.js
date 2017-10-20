import React, { Component } from 'react'

class EthAuth extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    var EthAuthAccount
    if(this.props.ethAuth) {
      EthAuthAccount = this.props.ethAuth.eth.accounts[0]
    } else {
      EthAuthAccount = "LOADING..."
    }

    return (
      <div className="eth-auth">
        <div className="auth-display">
          <p>{EthAuthAccount}</p>
        </div>
      </div>
    )
  }

}

export default EthAuth
