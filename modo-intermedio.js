const $cuadrosGrillaIntermedio = document.querySelectorAll(".cuadro-intermedio");

let coloresDificultadIntermedio = [
  "color-rojo",
  "color-azul",
  "color-verde",
  "color-amarillo",
  "color-naranja",
  "color-rosa",
  "color-violeta",
  "color-marron",
];

function gestionarModoIntermedio() {
  if (posicionesColores.length === 0) {
    ocultarBotonJugar();
    mostrarBotonReset();
    asignarOrdenColores($cuadrosGrillaIntermedio);
    pintarCuadros($cuadrosGrillaIntermedio);
  } else {
    return false;
  }
}

$cuadrosGrillaIntermedio.forEach(function (cuadro) {
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
              ocultarCuadrosElegidos();
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
