import actions from './actions'
import Quagga from 'quagga'
  const scan=()=> {
    return function (dispatch) {
      dispatch(actions.initializeScanner())
  
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scannerViewport')    // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ['ean']
        }
      }, err => {
        if (err) {
          console.log(err)
          return
        }
  
        dispatch(actions.startScanning())
  
        Quagga.onDetected(data => {
          dispatch(actions.foundBarcode(data))
  
          Quagga.stop()
        })
  
        Quagga.start()
      })
    }
  }
  export default {
    scan
  }