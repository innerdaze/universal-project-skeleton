import actions from './actions'
import Quagga from 'quagga'
export const scannerAction = actions.scanner
const scan = () => {
  return function(dispatch) {
    dispatch(scannerAction.initializeScanner())

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scannerViewport') // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ['ean']
        }
      },
      err => {
        if (err) {
          console.log(err)
          return
        }

        dispatch(scannerAction.startScanning())

        Quagga.onDetected(data => {
          dispatch(scannerAction.foundBarcode(data))

          Quagga.stop()
        })

        Quagga.start()
      }
    )
  }
}
export default {
  scan
}
