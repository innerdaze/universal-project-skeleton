import { createBrowserHistory, createMemoryHistory, createHashHistory } from 'history'

const history = process.env.CORDOVA ? createMemoryHistory() : createBrowserHistory()

// export default history
export default createHashHistory()
