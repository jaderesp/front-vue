


  export function addToPalette(myDiagram, myPalette) {
    var node = myDiagram.selection.filter(p => p instanceof go.Node).first();
    if (node !== null) {
      myPalette.startTransaction();
      var item = myPalette.model.copyNodeData(node.data);
      myPalette.model.addNodeData(item);
      myPalette.commitTransaction("added item to palette");
    }
  }

  // The user cannot delete selected nodes in the Palette with the Delete key or Control-X,
  // but they can if they do so programmatically.
  export function removeFromPalette(myPalette) {
    myPalette.commandHandler.deleteSelection();
  }
