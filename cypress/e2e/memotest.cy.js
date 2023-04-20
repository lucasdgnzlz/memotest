const URL = "192.168.1.41:8080";
const cantidadCuadrosModoFacil = 12;

context("Memotest", () => {
  beforeEach(() => {
    cy.visit(URL);
  });

  describe("Prueba modo fácil", () => {
    it("Selecciona dificultad 'fácil'", () => {
      cy.get(".boton-facil").click();
    });

    it("Se asegura que la grilla de dificultad 'fácil' esté visible", () => {
      cy.get(".boton-facil").click();
      cy.get(".contenedor-grilla-facil").should("be.visible");
    });

    it("Presiona botón 'play'", () => {
      cy.get(".boton-facil").click();
      cy.get(".boton-play").click();
    });

    it("Comprueba que los cuadros tengan colores aleatorios", () => {
      cy.get(".boton-facil").click();
      cy.get(".boton-play").click();

      cy.get(".cuadro-facil").then(($primerListaCuadros) => {
        cy.visit(URL);

        cy.get(".boton-facil").click();
        cy.get(".boton-play").click();

        cy.get(".cuadro-facil").then(($segundaListaCuadros) => {
          chai.expect(!Cypress._.isEqual($primerListaCuadros, $segundaListaCuadros)).to.equal(true);
        });
      });
    });

    it("Selecciona dos cuadros con distintos colores", () => {
      cy.get(".boton-facil").click();
      cy.get(".boton-play").click();

      cy.get(".cuadro-facil").then(($listaCuadros) => {
        let listaCuadrosOrdenada = ordenarCuadrosPorColores($listaCuadros);

        listaCuadrosOrdenada[0][1].click();
        listaCuadrosOrdenada[1][0].click();
      });
    });

    it("Resuelve el juego", () => {
      cy.get(".boton-facil").click();
      cy.get(".boton-play").click();

      cy.get(".cuadro-facil").then(($listaCuadros) => {
        let listaCuadrosOrdenada = ordenarCuadrosPorColores($listaCuadros);

        for (let i = 0; i < listaCuadrosOrdenada.length; i++) {
          listaCuadrosOrdenada[i][0].click();
          listaCuadrosOrdenada[i][1].click();
        }
      });
    });

    it("Reinicia el juego", () => {
      cy.get(".boton-facil").click();
      cy.get(".boton-play").click();
      cy.get(".boton-reset").click();
    });
  });

  describe("Prueba modo intermedio", () => {
    it("Selecciona la dificultad 'intermedio'", () => {
      cy.get(".boton-intermedio").click();
    });

    it("Se asegura de que la grilla de dificultad 'intermedio' esté visible", () => {
      cy.get(".boton-intermedio").click();
      cy.get(".contenedor-grilla-intermedio").should("be.visible");
    });

    it("Presiona botón 'play'", () => {
      cy.get(".boton-intermedio").click();
      cy.get(".boton-play").click();
    });

    it("Comprueba que los cuadros tengan colores aleatorios", () => {
      cy.get(".boton-intermedio").click();
      cy.get(".boton-play").click();

      cy.get(".cuadro-intermedio").then(($primerListaCuadros) => {
        cy.visit(URL);

        cy.get(".boton-intermedio").click();
        cy.get(".boton-play").click();

        cy.get(".cuadro-intermedio").then(($segundaListaCuadros) => {
          chai.expect(!Cypress._.isEqual($primerListaCuadros, $segundaListaCuadros)).to.equal(true);
        });
      });
    });

    it("Selecciona dos cuadros de distinto color", () => {
      cy.get(".boton-intermedio").click();
      cy.get(".boton-play").click();

      cy.get(".cuadro-intermedio").then(($listaCuadrosIntermedio) => {
        let listaCuadrosOrdenada = ordenarCuadrosPorColores($listaCuadrosIntermedio);

        listaCuadrosOrdenada[0][1].click();
        listaCuadrosOrdenada[2][1].click();
      });
    });

    it("Resuelve el juego", () => {
      cy.get(".boton-intermedio").click();
      cy.get(".boton-play").click();

      cy.get(".cuadro-intermedio").then(($listaCuadros) => {
        let listaCuadrosOrdenada = ordenarCuadrosPorColores($listaCuadros);

        for (let i = 0; i < listaCuadrosOrdenada.length; i++) {
          listaCuadrosOrdenada[i][0].click();
          listaCuadrosOrdenada[i][1].click();
        }
      });
    });

    it("Reinicia el juego", () => {
      cy.get(".boton-intermedio").click();
      cy.get(".boton-play").click();
      cy.get(".boton-reset").click();
    });
  });
});

function ordenarCuadrosPorColores(listaCuadros) {
  let listaCuadrosOrdenada = [];

  for (let i = 0; i < listaCuadros.length - 1; i++) {
    for (let j = i + 1; j < listaCuadros.length; j++) {
      if (listaCuadros[i].className === listaCuadros[j].className) {
        listaCuadrosOrdenada.push([listaCuadros[i], listaCuadros[j]]);
      }
    }
  }

  return listaCuadrosOrdenada;
}
