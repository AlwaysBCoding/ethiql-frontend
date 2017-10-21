import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { EventEmitter } from 'events'
import _ from 'lodash'
import Web3 from 'web3'
import firebase from 'firebase'

import TextEditor from './components/TextEditor'
import QueryResult from './components/QueryResult'
import ActionButtons from './components/ActionButtons'
import EthAuth from './components/EthAuth'

import APIService from './services/APIService'

import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuery: "",
      currentCost: 0,
      ethAuth: undefined,
      queryResult: []
    }
  }

  componentWillMount() {
    window.APIService = APIService
    // FIREBASE
    // =====================
    window.firebase = firebase.initializeApp({
      apiKey: "AIzaSyCbvVBA5-oWJxrf2jHVrKgvFAHbVkamLcs",
      authDomain: "ethiql-3d8a6.firebaseapp.com",
      databaseURL: "https://ethiql-3d8a6.firebaseio.com",
      projectId: "ethiql-3d8a6",
      storageBucket: "ethiql-3d8a6.appspot.com",
      messagingSenderId: "324567229823"
    })

    window.firebase.database().ref("/queryResult").on("value", (snap) => {
      console.log(`NEW QUERY RESULT`)
      console.log(snap.val())
      this.setState({queryResult: snap.val()})
    })

    // EVENTS
    // =====================
    this.eventEmitter = new EventEmitter()

    // UpdateQuery
    this.eventEmitter.addListener("updateQuery", ({queryText}) => {
      this.setState({currentQuery: queryText})
      APIService.queryCost({queryText: this.state.currentQuery})
      .then((data) => {
        this.setState({currentCost: data.cost})
      })
    })

    // CalculateCost
    this.eventEmitter.addListener("calculateCost", ({}) => {
      APIService.queryCost({queryText: this.state.currentQuery})
      .then((data) => {
        alert(`QUERY COST: ${data.cost}`)
      })
    })

    // sendQuery
    this.eventEmitter.addListener("sendQuery", ({}) => {
      APIService.queryCost({queryText: this.state.currentQuery})
      .then((data) => {
        this.state.ethAuth.eth.sendTransaction({
          to: "0x42fa96be3c42131955e57fd89a086b5d82690505",
          from: this.state.ethAuth.eth.accounts[0],
          value: data.cost,
          data: this.state.ethAuth.toHex(this.state.currentQuery)
        }, (error, txHash) => {
          APIService.sendTxHash({txHash})
          .then((response) => {
            console.log(`GOT RESPONSE`)
            console.log(response)
          })
        })
      })
    })
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      if(typeof window.web3 !== undefined) {
        this.setState({ethAuth: new Web3(window.web3.currentProvider)})
      } else {
        this.setState({ethAuth: new Web3(new Web3.providers.HttpProvider("https://localhost:8545"))})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="view-container">
          <div className="top-nav">
            <h2>ETHiQL</h2>
            <div className="flex-spacer" />
            <h4>Made with <i className="heart">♥</i> in Dubai</h4>
          </div>
          <div className="top-content">
            <TextEditor
              eventEmitter={this.eventEmitter}
              currentQuery={this.state.currentQuery} />
            <div className="flex-spacer" />
            <ActionButtons
              eventEmitter={this.eventEmitter}
              currentCost={this.state.currentCost} />
          </div>
          <QueryResult
            eventEmitter={this.eventEmitter}
            queryResult={this.state.queryResult} />
          {/*<EthAuth
            eventEmitter={this.eventEmitter}
            ethAuth={this.state.ethAuth} />*/}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
