import Quagga from 'quagga'
import {
  INITIALIZE_SCANNER,
  START_SCANNING,
  END_SCANNING,
  FOUND_BARCODE
} from '../constants/ActionTypes'

export function initializeScanner() {
  return {
    type: INITIALIZE_SCANNER
  }
}

export function startScanning() {
  return {
    type: START_SCANNING
  }
}

export function endScanning() {
  return {
    type: END_SCANNING
  }
}

export function foundBarcode(data) {
  return {
    type: FOUND_BARCODE,
    data: data
  }
}

export function scan() {
  return function (dispatch) {
    dispatch(initializeScanner())

    Quagga.init({
      inputStream : {
        name : 'Live',
        type : 'LiveStream',
        target: document.querySelector('#scannerViewport')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ['ean']
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }

        dispatch(startScanning())

        Quagga.onDetected(data => {
          dispatch(foundBarcode(data))

          Quagga.stop()
        })

        Quagga.start();
    });
  }
}
