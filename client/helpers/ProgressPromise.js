export default {
  /**
   * Process a list of Promises asynchronously and report the progress after each Promise completes
   *
   * @param {Promise[]} promises. An array of promise to execute - are passed internally to Promise.all.
   * @param {Function} reporter.
   *   A function that will be executed after each promise completes that receives the proportion of
   *   completed promises as a decimal
   * @return {Promise}
   */
  all: (promises, reporter) => {
    let called = 0

    return Promise.all(
      promises.map(promise =>
        promise.then(() => reporter(++called / promises.length))
      )
    )
  }
}
