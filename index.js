const $botonesElegirDificultad = document.querySelectorAll(".botones-dificultad");
const $botonComenzarAJugar = document.querySelector(".boton-play");
const $botonReiniciar = document.querySelector(".boton-reset");

let juegoComenzado = false;

let dificultadElegida = "";

let coloresYaEncontrados = [];
let posicionesColores = [];
let cuadrosElegidos = [];

let indicadorTurnos = 1;

function verificarClasesBotonesDificultad(e) {
  if (e.target.classList.contains("boton-facil")) {
    return "facil";
  } else if (e.target.classList.contains("boton-intermedio")) {
    return "intermedio";
  } else {
    return "El botón presionado no contiene una clase característica";
  }
}

function ocultarBotonesDificultad() {
  const $contenedorBotonesDificultad = document.querySelector(".contenedor-botones-dificultad");
  $contenedorBotonesDificultad.id = "elemento-oculto";
}

function mostrarBotonesDificultad() {
  const $contenedorBotonesDificultad = document.querySelector(".contenedor-botones-dificultad");
  $contenedorBotonesDificultad.id = "";
}

function ocultarTituloElegirDificultad() {
  const $tituloElegirDificultad = document.querySelector(".contenedor-texto-dificultad");
  $tituloElegirDificultad.id = "elemento-oculto";
}

function mostrarTituloElegirDificultad() {
  const $tituloElegirDificultad = document.querySelector(".contenedor-texto-dificultad");
  $tituloElegirDificultad.id = "";
}

function mostrarGrillaCorrespondiente(dificultadElegida) {
  if (dificultadElegida === "facil") {
    const $grillaDificultadFacil = document.querySelector(".contenedor-grilla-facil");
    $grillaDificultadFacil.id = "";
  } else if (dificultadElegida === "intermedio") {
    const $grillaDificultadIntermedio = document.querySelector(".contenedor-grilla-intermedio");
    $grillaDificultadIntermedio.id = "";
  } else {
    return false;
  }
}

function ocultarGrilla() {
  if (dificultadElegida === "facil") {
    const $grillaDificultadFacil = document.querySelector(".contenedor-grilla-facil");
    $grillaDificultadFacil.id = "elemento-oculto";
  } else if (dificultadElegida === "intermedio") {
    const $grillaDificultadIntermedio = document.querySelector(".contenedor-grilla-intermedio");
    $grillaDificultadIntermedio.id = "elemento-oculto";
  } else {
    return false;
  }
}

function mostrarBotonJugar() {
  const $botonJugar = document.querySelector(".boton-play");
  $botonJugar.id = "";
}

function ocultarBotonJugar() {
  const $botonJugar = document.querySelector(".boton-play");
  $botonJugar.id = "elemento-oculto";
}

function mostrarBotonReset() {
  const $botonReset = document.querySelector(".boton-reset");
  $botonReset.id = "";
}

function ocultarBotonReset() {
  const $botonReset = document.querySelector(".boton-reset");
  $botonReset.id = "elemento-oculto";
}

function quitarClasesColores() {
  if (dificultadElegida === "facil") {
    $cuadrosGrillaFacil.forEach(function (cuadro) {
      coloresDificultadFacil.forEach(function (color) {
        if (cuadro.classList.contains(color)) {
          cuadro.classList.remove(color);
        }
      });
    });
  } else if (dificultadElegida === "intermedio") {
    $cuadrosGrillaIntermedio.forEach(function (cuadro) {
      coloresDificultadIntermedio.forEach(function (color) {
        if (cuadro.classList.contains(color)) {
          cuadro.classList.remove(color);
        }
      });
    });
  }
}

function asignarOrdenColores(listaCuadros) {
  for (let i = 0; posicionesColores.length < listaCuadros.length; i++) {
    if (dificultadElegida === "facil") {
      let indexAleatorio = generarNumeroAleatorio(coloresDificultadFacil.length);

      if (verificarRepeticionColores(coloresDificultadFacil[indexAleatorio]) === "") {
        posicionesColores.push(coloresDificultadFacil[indexAleatorio]);
      }
    } else if (dificultadElegida === "intermedio") {
      let indexAleatorio = generarNumeroAleatorio(coloresDificultadIntermedio.length);

      if (verificarRepeticionColores(coloresDificultadIntermedio[indexAleatorio]) === "") {
        posicionesColores.push(coloresDificultadIntermedio[indexAleatorio]);
      }
    }
  }
}

function generarNumeroAleatorio(listaColores) {
  const min = 0;
  const max = listaColores - 1;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function verificarRepeticionColores(colorAleatorio) {
  const MAXIMO_REPETICIONES_COLOR = 2;
  let vecesQueSeRepiteElColor = 0;

  if (posicionesColores.length === 0) {
    return "";
  } else {
    for (let i = 0; i < posicionesColores.length; i++) {
      if (posicionesColores[i] === colorAleatorio) {
        vecesQueSeRepiteElColor++;

        if (vecesQueSeRepiteElColor === MAXIMO_REPETICIONES_COLOR) {
          return "El color ya está dos veces en la lista";
        }
      }
    }
  }

  if (vecesQueSeRepiteElColor < MAXIMO_REPETICIONES_COLOR) {
    return "";
  }
}

function pintarCuadros(listaCuadros) {
  for (let i = 0; i < listaCuadros.length; i++) {
    listaCuadros[i].classList.add(posicionesColores[i]);
  }
}

function guardarCuadroElegido(e) {
  cuadrosElegidos.forEach(function (cuadro) {
    if (cuadro === e.target) {
      return false;
    }
  });

  cuadrosElegidos.push(e.target);
}

function mostrarCuadroElegido(e) {
  e.target.id = "";
}

function ocultarCuadrosElegidos() {
  for (let i = 0; i < cuadrosElegidos.length; i++) {
    cuadrosElegidos[i].id = "color-oculto";
  }
}

function ocultarTodosLosCuadros() {
  if (dificultadElegida === "facil") {
    $cuadrosGrillaFacil.forEach(function (cuadro) {
      cuadro.id = "color-oculto";
    });
  } else if (dificultadElegida === "intermedio") {
    $cuadrosGrillaIntermedio.forEach(function (cuadro) {
      cuadro.id = "color-oculto";
    });
  }
}

function comprobarCuadroElegido(e) {
  return e.target === cuadrosElegidos[0];
}

function comprobarColoresCuadros() {
  return cuadrosElegidos[0].className === cuadrosElegidos[1].className;
}

function guardarColoresEncontrados() {
  if (dificultadElegida === "facil") {
    coloresDificultadFacil.forEach(function (color) {
      if (cuadrosElegidos[0].classList.contains(color)) {
        coloresYaEncontrados.push(color);
      }
    });
  } else if (dificultadElegida === "intermedio") {
    coloresDificultadIntermedio.forEach(function (color) {
      if (cuadrosElegidos[0].classList.contains(color)) {
        coloresYaEncontrados.push(color);
      }
    });
  }
}

function comprobarColoresEncontrados(e) {
  let colorCuadro = "";

  coloresDificultadFacil.forEach(function (color) {
    if (e.target.classList.contains(color)) {
      colorCuadro = color;
    }
  });

  for (let i = 0; i < coloresYaEncontrados.length; i++) {
    if (coloresYaEncontrados[i] === colorCuadro) {
      return "Este color ya fue encontrado";
    }
  }

  return "";
}

function comprobarEstadoJuego() {
  if (dificultadElegida === "facil") {
    if (coloresYaEncontrados.length === coloresDificultadFacil.length) {
      juegoComenzado = false;
    }
  } else if (dificultadElegida === "intermedio") {
    if (coloresYaEncontrados.length === coloresDificultadIntermedio.length) {
      juegoComenzado = false;
    }
  }
}

function actualizarTituloJuegoTerminado() {
  if (juegoComenzado === false) {
    const $tituloActual = document.querySelector(".titulo");
    $tituloActual.innerText = "Juego terminado!";
  }
}

function restaurarTituloOriginal() {
  const $tituloActual = document.querySelector(".titulo");
  $tituloActual.innerText = "Memotest";
}

$botonesElegirDificultad.forEach(function (botones) {
  botones.addEventListener("click", (e) => {
    if (verificarClasesBotonesDificultad(e) === "facil") {
      dificultadElegida = "facil";
      ocultarTituloElegirDificultad();
      ocultarBotonesDificultad();
      mostrarBotonJugar();
      mostrarGrillaCorrespondiente(verificarClasesBotonesDificultad(e));
    } else if (verificarClasesBotonesDificultad(e) === "intermedio") {
      dificultadElegida = "intermedio";
      ocultarTituloElegirDificultad();
      ocultarBotonesDificultad();
      mostrarBotonJugar();
      mostrarGrillaCorrespondiente(verificarClasesBotonesDificultad(e));
    }
  });
});

$botonComenzarAJugar.addEventListener("click", () => {
  if (dificultadElegida === "facil") {
    juegoComenzado = true;
    gestionarModoFacil();
  } else if (dificultadElegida === "intermedio") {
    juegoComenzado = true;
    gestionarModoIntermedio();
  }
});

$botonReiniciar.addEventListener("click", () => {
  ocultarBotonReset();
  ocultarGrilla();
  mostrarBotonesDificultad();
  mostrarTituloElegirDificultad();
  quitarClasesColores();
  restaurarTituloOriginal();
  ocultarTodosLosCuadros();
  juegoComenzado = false;
  dificultadElegida = "";
  coloresYaEncontrados = [];
  posicionesColores = [];
  cuadrosElegidos = [];
  indicadorTurnos = 1;
});
