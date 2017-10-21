import Q from 'q'

class APIService {

  constructor(config) {
    this.endpoint = config.endpoint
  }

  queryCost({queryText}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/api/explain?q=${encodeURI(queryText)}`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  sendTxHash({txHash}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var apiData = {
      "tx": txHash
    }

    var fetchConfig = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(apiData)
    }

    fetch(`${this.endpoint}/api/tx`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  sendQuery() {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var apiData = {
      "someKey": "someValue"
    }

    var fetchConfig = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(apiData)
    }

    fetch(`${this.endpoint}/data`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

}

export default new APIService({endpoint: "http://127.0.0.1:3000"})
