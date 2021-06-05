//Cargar el archivo
$.ajax({
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWCnovTNw6eFV8zbzA92dDBZkme3TX6x1k2QSpqfnOtiFgPt4Amu4AbntlJcd_ewLXkG-DMLzgrXqL/pub?output=csv",
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
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnBq9hqtML0gBxX-cYRyWI6rZ1KLAA0PKRzMeVQAG6Khq0ZRIGlYcpg9QFNQBsVAHXfjRs9_isOSCe/pub?output=csv",
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
        SalchipapaEspecial: arregloDeLista[14],
        DedoDeQueso: arregloDeLista[15],
        Ensalada: arregloDeLista[16],
        Donas: arregloDeLista[17],
        TortaDeQueso: arregloDeLista[18],
        Muffins: arregloDeLista[19],
        RollosDeCanela: arregloDeLista[20],
        MousseChocolate: arregloDeLista[21],
        Tiramisu: arregloDeLista[22],
      });
    }

    
    //Parsear el valor de grupos a entero
    
    for (let i = 0; i < infoSnacks.length; i++) {
      infoSnacks[i].Grupo = parseInt(infoSnacks[i].Grupo);
    }
    for (let i = 0; i < infoJuegos.length; i++) {
      infoJuegos[i].Grupo = parseInt(infoJuegos[i].Grupo);
    }
    
    //console.log(infoJuegos);
    //console.log(infoSnacks);


    //Logica

    //Metodo final, recibe (Número del grupo a evaluar, tipo de comida que eligió el grupo que puede ser: 'snacks' o 'juegos', el valor del vecindario (K))

    //Interacciones con el html
    var btn;
    btn = document.querySelector('.searchBtn');
    
    btn.addEventListener('click',() =>{
      let grupo = document.querySelector('.groupInput').value;
      let tipo = document.querySelector('#tipo').innerText;
      let Kvalue = 5;
      recommendation(grupo, tipo, Kvalue);
    })
    
    
    //Funciones

    function recommendation(grupo, tipo, k) {
      var topValue = 3;
      //Con este bloque de codigo se consigue el top 3 de algo de lo que haya seleccionado
    var recommendation = getRecommendationWithLeastMisseryMethod(grupo, tipo);
    var topThree = recommendation.slice(recommendation.length-1,recommendation.length)
    console.log(topThree);  
    document.querySelector('.resultt').innerHTML = topThree[0][0];
      //Con este bloque de codigo se consigue el top 3 de la otra base de datos
    var recommendation2 = getRecommendationOfOtherDB(grupo, tipo, k);
    var topThree2 = recommendation2.slice(recommendation2.length-topValue,recommendation2.length);
    topThree2.sort((a, b) => {
      if (a[1] < b[1]) { return 1 }
      if (a[1] > b[1]) { return -1 }
      return 0;
    });
    console.log(topThree2);  
    var showResults = document.querySelectorAll('.recommendResults');
    document.querySelector('.resultPercent').innerHTML = (Math.round(topThree2[0][1]*10))+'%';
      for (let i = 0; i < showResults.length; i++) {
        showResults[i].innerHTML = topThree2[i][0];
      }
    }

    function getRecommendationOfOtherDB(grupo, tipo, k) {
      var infoDB;
      var infoDB2;
      switch (tipo) {
        case 'juegos':
          infoDB = infoJuegos;
          infoDB2 = infoSnacks;
          break;
      
        case 'snacks':
          infoDB = infoSnacks;
          infoDB2 = infoJuegos;
          break;
      }
      var neighbourhood = getNeighbourhood(grupo,infoDB,k);
    var test = getInfoOfOtherDB(neighbourhood, infoDB2);
    return getAveragePointsOfOtherDB(test)
    }

    function getAveragePointsOfOtherDB(firstArray) {
      var newArray = [];
      var array = transformGroupObjectsToGroupArrays(firstArray);
      for (let i = 1; i < array[array.length-1].length-1; i++) {
        newArray[i] = [];
      }
      for (let i = 2; i < array[array.length-1].length; i++) {
        newArray[i-1].push(array[array.length-1][i][0])
      }
      let finalResult = getAverageOfGroup(array);
      finalResult.shift();
      finalResult.shift();
      finalResult.sort((a, b) => {
        if (a[1] < b[1]) { return -1 }
        if (a[1] > b[1]) { return 1 }
        return 0;
      });
      return finalResult
    }

    function getInfoOfOtherDB(array,db) {
      let newArray = [];
      for (let i = 0; i < array.length; i++) {
        for (let i2 = 0; i2 < db.length; i2++) {
          if (db[i2].Grupo == array[i][0]) {
            newArray.push(db[i2]);
          } 
        }
      }
      return newArray
    }

    function getNeighbourhood(grupo, tipo, k) {
      var neighbourhoodOfGroups = getSimilCosenoValuesOfGroup(grupo, tipo); 
    return getNeighbourhoodOfGroup(neighbourhoodOfGroups, k);
    }

    function getNeighbourhoodOfGroup(array, k) {
      array.pop();
      let result = array.slice(array.length-k, array.length)
      return result
    }

    function getSimilCosenoValuesOfGroup(grupo, tipo) {
      var infoDB;
      switch (tipo) {
        case 'juegos':
          infoDB = infoJuegos;
          break;
      
        case 'snacks':
          infoDB = infoSnacks;
          break;
      }
      var test1 = setGroupsDataInArrays(tipo);
    var similCosenoValues = [];
    for (let i = 0; i < test1.length; i++) {
      similCosenoValues.push([test1[i][1][1],similCoseno(test1[grupo-1], test1[i])])
    }
    similCosenoValues.sort((a, b) => {
      if (a[1] < b[1]) { return -1 }
      if (a[1] > b[1]) { return 1 }
      return 0;
    });
    return similCosenoValues
    }

    function similCoseno(grupo1, grupo2) {
      let result = 0;
      result = (productoPunto(grupo1, grupo2)) / ((magnitud(grupo1))*(magnitud(grupo2)));
      return result;
    }

    function productoPunto(grupo1, grupo2) {
      var newValue = 0;
      for (let i = 2; i < grupo1.length; i++) {
        newValue += (grupo1[i][1]*grupo2[i][1]);
      }
      return newValue
    }

    function magnitud(grupo) {
      var newValue = 0;
      for (let i = 2; i < grupo.length; i++) {
        let newVal = (grupo[i][1]*grupo[i][1]);
        newValue+= newVal;
      }
      return Math.sqrt(newValue);
    }

    function setGroupsDataInArrays(tipo) {
      var infoGroupsObjects = setDataInGroups(tipo);
      var infoGroupsArrays = [];
    for (let i = 1; i < infoGroupsObjects.length; i++) {
      let item = transformGroupObjectsToGroupArrays(infoGroupsObjects[i]);
      infoGroupsArrays.push(getAverageOfGroup(item));
    }
    return infoGroupsArrays;
    }

    function transformGroupObjectsToGroupArrays(array) {
      let newArray = [];
      for (let i = 1; i < array.length + 1; i++) {
        newArray[i] = [];
      }
      for (let i = 0; i < array.length; i++) {
        Object.entries(array[i]).forEach(([key, value]) => {
          newArray[i+1].push([key,value])
        });
      }
      return newArray
    }

    function getAverageOfGroup(array) {
      let newArray = [];
      for (let i = 1; i < array[array.length-1].length ; i++) {
        newArray[i] = [];
      }
      
      for (let i = 2; i < array[array.length-1].length ; i++) {
        let newValue = 0;
        newArray[i].push(array[array.length-1][i][0]);
        
        for (let i2 = 1; i2 < array.length; i2++) {
          newValue+= parseInt(array[i2][i][1]);        
        }   
        newArray[i].push(newValue/(array.length-1));
      }
      
      newArray[1].push("Grupo", array[array.length-1][1][1])
      return newArray
    }

    function getRecommendationWithLeastMisseryMethod(grupo, tipo) { 
      var infoGroups;
      var index;
      var genInfo;
      switch (tipo) {
        case 'juegos':
          infoGroups = setDataInGroups(infoJuegos);
          index = indexJuegos;
          genInfo = infoJuegos;
          break;
      
        case 'snacks':
          infoGroups = setDataInGroups(infoSnacks);
          index = indexSnacks;
          genInfo = infoSnacks;
          break;
      }
      var misseryListIndex = getLeastMisseryList(infoGroups[grupo], index);
      var misseryListValues = getValuesFromLeastMisseryList(infoGroups[grupo], misseryListIndex);
      var resultsMisseryValuesAverage = getAveragePoints(misseryListValues, genInfo);
      var result = [];
      result.push(resultsMisseryValuesAverage[0]);
      resultsMisseryValuesAverage.sort((a, b) => {
        if (a[1] < b[1]) { return -1 }
        if (a[1] > b[1]) { return 1 }
        return 0;
      });
      for (let i = 0; i < resultsMisseryValuesAverage.length; i++) {
        result.push(resultsMisseryValuesAverage[i]); 
      }
      let finalArray = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i][0] !== 'Grupo') {
          finalArray.push(result[i])
        }
      }
      return finalArray
    }

    function setDataInGroups(array) {
      var newArray = [];
      var grupo = 1;
      array.sort((a, b) => {
        if (a.Grupo < b.Grupo) { return -1 }
        if (a.Grupo > b.Grupo) { return 1 }
        return 0;
      });

      for (let i = 0; i < array.length; i++) {
        if (array[i+1]) {
          if (array[i].Grupo !== array[i+1].Grupo) {
            grupo++;
          }
        }
      }

       for (let i = 1; i < grupo + 1; i++) {
        newArray[i] = [];
      } 

      for (let i = 0; i < array.length; i++) {
        newArray[array[i].Grupo].push(array[i]);
      }
      return newArray
    }
    
    function getLeastMisseryList(list, keys) {
      // Se sacaran las bebidas mas "miserables"
      let misseryList = [];
      // Primero recorremos los vecinos de bebidas
      list.forEach(neighbour => {
          // Luego se recorren las bebidas para encontrar las mas miserables
          for (let i = 2; i < keys.length; i++) {
            if (neighbour[keys[i]] < 5) {
              // Si es menor a 5, se buscara esa bebida en la lista de bebidas mas miserables
              let temp = misseryList.find(elem => {
                  return elem === keys[i];
              })
              // Si la bebida no esta en la lista de bebidas miserables, la agregara
              if (!temp) {
                  misseryList.push(keys[i]);
              }
            } 
          }
      });
      // Se duplica la lista de bebidas
      let leastMisseryList = [...keys];
      // Ahora se eliminan las menos favoritas
      misseryList.forEach(elem => {
          let deleteDrinkIndex = leastMisseryList.indexOf(elem);
          leastMisseryList.splice(deleteDrinkIndex, 1);
      });
      // Retorna la lista de bebidas menos miserables
      return leastMisseryList;
  }

    function getValuesFromLeastMisseryList(array, keys) {
      var groupValues= [];
      for (let i = 0; i < array.length ; i++) {
        groupValues[i] = [];
      }
      for (let i = 0; i < array.length; i++) {
        Object.entries(array[i]).forEach(([key, value]) => {
          for (let i2 = 0; i2 < keys.length; i2++) {
            if (keys[i2] == String(key)) {
              groupValues[i].push([key,value]);
            }
          }
        });
      }
      return groupValues
    }

    function getAveragePoints(array,initialList) {
      var grupo;
      for (let i = 0; i < initialList.length; i++) {
        if (initialList[i].Nombre == array[0][0][1]) {
          grupo = initialList[i].Grupo
        }
      }
      var newArray = [];
      for (let i = 0; i < array[0].length; i++) {
        let newValue = 0;
        for (let i2 = 0; i2 < array.length; i2++) {
          newValue += parseInt(array[i2][i][1]); 
        }
        newArray.push([array[0][i][0], (newValue/array.length)])
      }
      return newArray
    }
  }
}

