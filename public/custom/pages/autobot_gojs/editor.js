import * as eventos from './eventos/selectEvents.js'
import {addToPalette,removeFromPalette} from './controles/palete.js'

/* funções para serem utilizadas dentro do components inseridos dinamicamente via string vars html */
let base_url = $("#baseUrl").val() + "/";
let api_url = $("#apiUrl").val();

 var myDiagram;
 var myPalette;
  var names = {}; 
  var node;

  // manipular itens: https://gojs.net/latest/learn/graphObject.html

  export function  initGoJs() {

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;  // for conciseness in defining templates
 /* ======= LAYOUT ========= */
    myDiagram =
      $(go.Diagram, "gojsDiv",
        {
          initialAutoScale: go.Diagram.UniformToFill,
          //definir o lsyout para o diagrama
          layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 })
        });


       // initialize Palette
      myPalette =
        $(go.Palette, "myPaletteDiv",
          {
            nodeTemplate: myDiagram.nodeTemplate,
            contentAlignment: go.Spot.Center,
            layout:
              $(go.GridLayout,
                { wrappingColumn: 1, cellSize: new go.Size(2, 2) }),
            "ModelChanged": e => {     // just for demonstration purposes,
              if (e.isTransactionFinished) {  // show the model data in the page's TextArea
                document.getElementById("mySavedPaletteModel").textContent = e.model.toJson();
              }
            }
          });

      // now add the initial contents of the Palette
      myPalette.model.nodeDataArray = [
        { text: "Circle", color: "blue", figure: "Circle" },
        { text: "Square", color: "purple", figure: "Square" },
        { text: "Ellipse", color: "orange", figure: "Ellipse" },
        { text: "Rectangle", color: "red", figure: "Rectangle" },
        { text: "Rounded\nRectangle", color: "green", figure: "RoundedRectangle" },
        { text: "Triangle", color: "purple", figure: "Triangle" },
      ];




   /* ====== BOTÃO ====== */
    // Defina um modelo de nó simples que consiste em texto seguido por um botão expandir/recolher (+/-)
    myDiagram.nodeTemplate =
      $(go.Node, "Horizontal",
        { selectionChanged: eventos.nodeSelectionChanged },  // this event handler is defined below
        { click: function(e, obj){ console.log('\r\n Botão Direito clicado',e)}},
        
        $(go.Panel, "Auto",
          $(go.Shape, { fill: "#1F4963", stroke: null }),
          $(go.TextBlock,
            {
              font: "bold 13px Helvetica, bold Arial, sans-serif",
              stroke: "white", margin: 3
            },
            new go.Binding("text", "key"))
        ),
        $("TreeExpanderButton")
      );


    /* ============ RELACIONAMENTO ========== */

    // Definir um modelo de traço relacional sem ponta de seta.
    myDiagram.linkTemplate =
      $(go.Link,
        { selectable: false },
        $(go.Shape));  // the link shape

    // crie o modelo para a árvore DOM
    myDiagram.model =
      new go.TreeModel( {
        isReadOnly: true,  // não permitir que o usuário exclua ou copie ítens
        // construir a árvore em uma matriz de dados do nó (item)
        nodeDataArray: traverseDom(document.activeElement)
      });


      return;
  }



  /* ============ LISTAR ITENS PARA O EDITOR (EXPORTAR) ============== */

  // Percorra o DOM, começando no documento, e retorne um Array de objetos de dados do nó representando a árvore DOM
  // Uso típico: traverseDom(document.activeElement)
  // O segundo e o terceiro argumentos são internos, usados ​​ao recorrer através do DOM
  function traverseDom(node, parentName, dataArray) {
    if (parentName === undefined) parentName = null;
    if (dataArray === undefined) dataArray = [];
    // skip everything but HTML Elements
    if (!(node instanceof Element)) return;
    // Ignore the navigation menus
    if (node.id === "navSide" || node.id === "navTop") return;
    // add this node to the nodeDataArray
    var name = getName(node);
    var data = { key: name, name: name };
    dataArray.push(data);
    // add a link to its parent
    if (parentName !== null) {
      data.parent = parentName;
    }
    // encontrar todas os itens (filhos CHILDREN)
    var l = node.childNodes.length;
    for (var i = 0; i < l; i++) {
      traverseDom(node.childNodes[i], name, dataArray);

      /* aplicar ação a cada item */

    }
    return dataArray; /* IDÉIA: PODE SER FEITO BACKUP ATRAVÉS DESTE ARRAY  */
  }


  /* ============== ID UNICO ============ */
  // Dê a cada ítem um nome exclusivo
  function getName(node) {
    var n = node.nodeName;
    if (node.id) n = n + " (" + node.id + ")";
    var namenum = n;  // make sure the name is unique
    var i = 1;
    while (names[namenum] !== undefined) {
      namenum = n + i;
      i++;
    }
    names[namenum] = node;
    return namenum;
  }



  //window.addEventListener('DOMContentLoaded', initGoJs);


