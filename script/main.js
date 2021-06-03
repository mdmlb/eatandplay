//Cargar el archivo
$.ajax({
  url: "/data/db_juegos.csv",
  dataType: "text"
}).done(successFunction);

function successFunction(data) {
  var datosFila = data.split("\n");
  var infoJuegos = [];
  var indexJuegos;

  indexJuegos = datosFila[0].split(",");

  for (let index = 1; index < datosFila.length; index++) {
    //Lectura de una linea
    let dataLinea = datosFila[index];
    arregloDeLista = dataLinea.split(",");
    infoJuegos.push({
      Nombre: arregloDeLista[1],
      Grupo: parseInt(arregloDeLista[2]),
      Monopoly: parseInt(arregloDeLista[3]),
      Uno: parseInt(arregloDeLista[4]),
      Parques: parseInt(arregloDeLista[5]),
      Jenga: parseInt(arregloDeLista[6]),
      Domino: parseInt(arregloDeLista[7]),
      Pictionary: parseInt(arregloDeLista[8]),
      Scrabble: parseInt(arregloDeLista[9]),
      Cluedo: parseInt(arregloDeLista[10]),
      CuatroEnLinea: parseInt(arregloDeLista[11]),
      SerpientesYEscaleras: parseInt(arregloDeLista[12]),
      Blackjack: parseInt(arregloDeLista[13]),
      DamasChinas: parseInt(arregloDeLista[14]),
      BatallaNaval: parseInt(arregloDeLista[15]),
      Ajedrez: parseInt(arregloDeLista[16]),
      AdivinaQuien: parseInt(arregloDeLista[17]),
      Bingo: parseInt(arregloDeLista[18]),
      Rompecabezas: parseInt(arregloDeLista[19]),
      Stop: parseInt(arregloDeLista[20]),
      Memoria: parseInt(arregloDeLista[21]),
      Loteria: parseInt(arregloDeLista[22])
    });
  }

  $.ajax({
    url: "/data/db_snacks.csv",
    dataType: "text"
  }).done(setBebidasInfo);

  function setBebidasInfo(data) {

    var datosFila = data.split("\n");

    var infoSnacks = [];
    var indexSnacks;

    indexSnacks = datosFila[0].split(",");

    for (let index = 1; index < datosFila.length; index++) {
      //Lectura de una linea
      let dataLinea = datosFila[index];
      arregloDeLista = dataLinea.split(",");
      infoSnacks.push({
        Nombre: arregloDeLista[1],
        Grupo: arregloDeLista[2],
        Nachos: arregloDeLista[3],
        Alitas: arregloDeLista[4],
        Antipasto: arregloDeLista[5],
        EmpanadasCarne: arregloDeLista[6],
        EmpanadasPollo: arregloDeLista[7],
        Marranitas: arregloDeLista[8],
        Aborrajado: arregloDeLista[9],
        PapaRellena: arregloDeLista[10],
        SalchichonConPapa: arregloDeLista[11],
        PizzaJamonQueso: arregloDeLista[12],
        SalchipapaClasica: arregloDeLista[13],
        SalchipapaEspecial: arregloDeLista[13],
        DedoDeQueso: arregloDeLista[13],
        Ensalada: arregloDeLista[13],
        Donas: arregloDeLista[13],
        TortaDeQueso: arregloDeLista[13],
        Muffins: arregloDeLista[13],
        RollosDeCanela: arregloDeLista[13],
        MousseChocolate: arregloDeLista[13],
        Tiramisu: arregloDeLista[13],
      });
    }

    console.log(infoJuegos);
    //console.log(infoSnacks);

    //Logica
    var infoGroups = setDataInGroups(infoJuegos);
    var misseryList = getLeastMisseryList(infoGroups[1], indexJuegos);
    getValuesFromLeastMisseryList(infoGroups[1], misseryList);


    //Funciones
    function setDataInGroups(array) {
      var newArray = [];
      array.sort((a, b) => {
        if (a.Grupo < b.Grupo) { return -1 }
        if (a.Grupo > b.Grupo) { return 1 }
        return 0;
      });

      for (let i = 0; i < array[array.length - 1].Grupo + 1; i++) {
        newArray[i] = [];
      }

      for (let i = 0; i < array.length; i++) {
        newArray[array[i].Grupo].push(array[i]);
      }
      console.log(newArray);
      return newArray
    }
    
    function getLeastMisseryList(list, keys) {
      // Se sacaran las bebidas mas "miserables"
      let misseryList = [];
      // Primero recorremos los vecinos de bebidas
      list.forEach(neighbour => {
          // Luego se recorren las bebidas para encontrar las mas miserables
          keys.forEach(drink => {
              if (neighbour[drink] < 5) {
                  // Si es menor a 5, se buscara esa bebida en la lista de bebidas mas miserables
                  let temp = misseryList.find(elem => {
                      return elem === drink;
                  })
                  // Si la bebida no esta en la lista de bebidas miserables, la agregara
                  if (!temp) {
                      misseryList.push(drink);
                  }
              }
          })
      });
      // Se duplica la lista de bebidas
      let leastMisseryList = [...keys];
      // Ahora se eliminan las menos favoritas
      misseryList.forEach(elem => {
          let deleteDrinkIndex = leastMisseryList.indexOf(elem);
          leastMisseryList.splice(deleteDrinkIndex, 1);
      });
      // Retorna la lista de bebidas menos misrebales
      console.log(leastMisseryList);
      return leastMisseryList;
  }

    function getValuesFromLeastMisseryList(array, keys) {
      var groupValues= [];
      for (let i = 0; i < array[array.length - 1].Grupo + 2; i++) {
        groupValues[i] = [];
      }
      console.log(groupValues);
      for (let i = 0; i < array.length; i++) {
        Object.entries(array[i]).forEach(([key, value]) => {
          for (let i2 = 0; i2 < keys.length; i2++) {
            if (keys[i2] == String(key)) {
              console.log(key,value);
              groupValues[i].push([key,value]);
            }
            
          }
        });

      }
      console.log(groupValues);
      return groupValues
    }


  }
}