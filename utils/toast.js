import Toastify from 'toastify-js'
// import 'toastify-js/src/toastify.css'
import { SUCCESS, ERROR } from '@/utils/constants.js'

const styleProperties = {
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  lineHeight: '21.09px',
  borderRadius: '5px',
}

const getStyle = (type) => {
  switch (type) {
    case SUCCESS:
      return {
        background: '#0BC375',
        ...styleProperties,
      }
    case ERROR:
      return {
        background: '#E85F5F',
        ...styleProperties,
      }
  }
}

const toast = (type, message) => {
  Toastify({
    text: message,
    duration: 1500,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: getStyle(type),
  }).showToast()
}

export default toast
