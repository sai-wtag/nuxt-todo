import Swal from 'sweetalert2'

export default function toast(type, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    showCloseButton: true,
  })

  Toast.fire({
    icon: type,
    title: message,
  })
}
