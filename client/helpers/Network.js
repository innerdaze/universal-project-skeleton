export default async function apiCall({
  service = failIfMissing('service'),
  params = {},
  success = json => json,
  failure = error => error
}) {
  return fetch(`${config.apiRoot}/json`, {
    method: 'post',
    body: JSON.stringify({
      method: service,
      params
    })
  })
  .then(res => res.json())
  .then(success)
  .catch(failure)
}

export function checkStatusAndParseJSON(response) {
  return response.json()
    .then(data => {
      if (
        data.result.Result.ResMessage.ResCode === 0
      ||
        data.result.Result.ResCode === 0
      ) {
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
