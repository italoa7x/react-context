import { createContext, useContext, useState } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento Context";

export const PagamentoProvider = ({ children }) => {
  const tipoPagamento = [
    {
      id: 1,
      nome: "Boleto",
      juros: 1,
    },
    {
      id: 2,
      nome: "Cartão de crédito",
      juros: 1.3,
    },
    {
      id: 3,
      nome: "PIX",
      juros: 1,
    },
    {
      id: 4,
      nome: "Crediário",
      juros: 1.5,
    },
  ];

  const [formaPagamento, setFormaPagamento] = useState({
    id: 1,
    nome: "Boleto",
    juros: 1,
  });

  return (
    <PagamentoContext.Provider
      value={{ tipoPagamento, formaPagamento, setFormaPagamento }}
    >
      {children}
    </PagamentoContext.Provider>
  );
};

export const usePagamento = () => {
  const { tipoPagamento, setFormaPagamento, formaPagamento } =
    useContext(PagamentoContext);

  function mudarFormaPagamento(id) {
    const pagamentoAtual = tipoPagamento.find((value) => value.id === id);

    setFormaPagamento(pagamentoAtual);
  }
  return {
    tipoPagamento,
    formaPagamento,
    mudarFormaPagamento,
  };
};
