class lancamentoBusiness {
  static CalcularTotalizadores(lancamentos) {

    // Encontra as contas unicas na lista de lancamentos
    const contas = new Set();
    lancamentos.forEach((el) => {
      contas.add(el.conta);
    });

    // Constroi os totalizadores
    // Filter - filtra os lancamentos por conta
    // Reduce - soma todos os lancamentos filtrados por conta
    const totalizadores = [];
    contas.forEach((conta) => {
      const valor = lancamentos
        .filter((el) => el.conta === conta)
        .reduce((anterior, elem) => {
          let valor = parseFloat(elem.valor);
          if (elem.tipo === 'D') {
            valor *= -1;
          }
          return anterior + valor;
        }, 0);

      totalizadores.push({ conta, valor });
    });

    return {
      Totalizadores: totalizadores,
      Lancamentos: lancamentos,
    };
  }
}

export default lancamentoBusiness;
