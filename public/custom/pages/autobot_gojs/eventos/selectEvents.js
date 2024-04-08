
  /* =============== ITEMS SELECIONADO (MUDAR DE COR) ========= */
  // Quando um Node é selecionado, realce o elemento HTML correspondente.
  export function nodeSelectionChanged(node) {

    if (node.isSelected) {
           /* abrir modal */
      $('#optdraw_modal').modal('show');

    }
  }
