import { createContext, useContext, useEffect, useState } from "react";
import { usePagamento } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = "Carrinho Context";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
  const [totalPedido, setTotalPedido] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeProdutos,
        setQuantidadeProdutos,
        totalPedido,
        setTotalPedido,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidadeProdutos,
    setQuantidadeProdutos,
    totalPedido,
    setTotalPedido,
  } = useContext(CarrinhoContext);

  const { setSaldo } = useContext(UsuarioContext);

  const { formaPagamento } = usePagamento();

  function adicionarProduto(produto) {
    const existeProduto = carrinho.some((value) => value.id === produto.id);

    if (!existeProduto) {
      produto.quantidade = 1;
      return setCarrinho((currentValue) => [...currentValue, produto]);
    }
    setCarrinho(_mudarQuantidade(produto.id));
  }

  function removerProduto(id) {
    const prod = carrinho.find((value) => value.id === id);
    const isUltimo = prod?.quantidade === 1;

    if (isUltimo) {
      return setCarrinho((currentValue) =>
        currentValue.filter((item) => item.id !== id)
      );
    }
    setCarrinho(_subtrairProduto(id));
  }

  function efetuarCompra() {
    setCarrinho([]);
    setSaldo((currentValue) => currentValue - totalPedido);
  }

  function _mudarQuantidade(id) {
    return carrinho.map((value) => {
      if (value.id === id) value.quantidade += 1;
      return value;
    });
  }

  function _subtrairProduto(id) {
    return carrinho.map((value) => {
      if (value.id === id) value.quantidade -= 1;
      return value;
    });
  }

  useEffect(() => {
    const { novaQuantidade, novoTotal } = carrinho.reduce(
      (currentValue, nextProd) => ({
        novaQuantidade: currentValue.novaQuantidade + nextProd.quantidade,
        novoTotal:
          currentValue.novoTotal + nextProd.valor * nextProd.quantidade,
      }),
      {
        novaQuantidade: 0,
        novoTotal: 0,
      }
    );
    setQuantidadeProdutos(novaQuantidade);
    setTotalPedido(novoTotal * formaPagamento.juros);
  }, [carrinho, setQuantidadeProdutos, setTotalPedido, formaPagamento]);
  return {
    carrinho,
    setCarrinho,
    quantidadeProdutos,
    totalPedido,
    adicionarProduto,
    removerProduto,
    efetuarCompra,
  };
};
