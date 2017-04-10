import { browserHistory, hashHistory } from 'react-router'

const history = process.env.CORDOVA ? hashHistory : browserHistory

export default history
