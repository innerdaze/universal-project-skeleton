export default function apiCall({
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

export function validateResCode(data) {
  return (
    data.result.Result.ResMessage.ResCode === 0
  ||
    data.result.Result.ResCode === 0
  )
}

export function validateSession(data) {
  return !Boolean(
    data.result.Result.ResCode === 99
  &&
    data.result.Result.ResMessage === 'Session has expired'
  )
}

export function throwError(data, errorMessage) {
  const error = new Error(errorMessage)
  error.response = data
  throw error
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

      throwError(data, data.result.Result.ResMessage.ResMessage)
    })
}

export function isOnline() {
  return navigator.connection.type !== navigator.connection.NONE
}
