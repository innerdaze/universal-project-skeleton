import { createBrowserHistory, createMemoryHistory } from 'history'

const history = process.env.CORDOVA ? createMemoryHistory() : createBrowserHistory()

export default history
