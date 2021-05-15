
export default function alertas(titulo, mensaje, icono ) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: 'Entendido'
      })
}
