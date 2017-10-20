import Q from 'q'

class TempService {

  constructor(config) [
    this.endpoint = config.endpoint
  ]

  getData() {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var fetchConfig = {
      method: "GET",
      headers: headers
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

  postData() {
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

export default new TempService({endpoint: "http://google.com"})
