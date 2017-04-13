export function checkStatusAndParseJSON(response) {
  return response.json()
    .then((data) => {
      if (data.result.Result.ResMessage.ResCode === 0) {
        return data
      }

      var error = new Error(data.result.Result.ResMessage.ResMessage)
      error.response = response
      throw error
    })
}

export function isOnline() {
  return navigator.connection.type !== navigator.connection.NONE
}
