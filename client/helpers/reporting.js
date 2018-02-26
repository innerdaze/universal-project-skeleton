/**
 * [reportError description]
 * @param  {Error} error [description]
 * @param  {StackTrace} [stack] [description]
 */
export function logError(error, stack) {
  stack = stack || error.stack

  if (process.env.NODE_ENV === 'development') {
    console.error(error)

    if (window.fabric) {
      window.fabric.Crashlytics.sendNonFatalCrash(e.message, stack)
      window.fabric.Crashlytics.sendCrash()
    }
  } else {
    // TODO: Implement error log file
  }
}
