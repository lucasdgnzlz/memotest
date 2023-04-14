const $cuadrosGrillaFacil = document.querySelectorAll(".cuadro-facil");

const coloresDificultadFacil = [
  "color-rojo",
  "color-azul",
  "color-verde",
  "color-amarillo",
  "color-naranja",
  "color-rosa",
];

function gestionarModoFacil() {
  if (posicionesColores.length === 0) {
    ocultarBotonJugar();
    mostrarBotonReset();
    asignarOrdenColores($cuadrosGrillaFacil);
    pintarCuadros($cuadrosGrillaFacil);
  } else {
    return false;
  }
}

$cuadrosGrillaFacil.forEach(function (cuadro) {
  cuadro.addEventListener("click", (e) => {
    if (juegoComenzado && cuadrosElegidos.length < 2) {
      if (!comprobarColoresEncontrados(e)) {
        if (indicadorTurnos === 1) {
          indicadorTurnos++;
          guardarCuadroElegido(e);
          mostrarCuadroElegido(e);
        } else if (indicadorTurnos === 2) {
          if (!comprobarCuadroElegido(e)) {
            guardarCuadroElegido(e);
            mostrarCuadroElegido(e);

            if (comprobarColoresCuadros()) {
              guardarColoresEncontrados();
              comprobarEstadoJuego();
              actualizarTituloJuegoTerminado();
              cuadrosElegidos = [];
              indicadorTurnos = 1;
            } else {
              indicadorTurnos = 1;

              setTimeout(function () {
                ocultarCuadrosElegidos();
                cuadrosElegidos = [];
              }, 0850);
            }
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
});
