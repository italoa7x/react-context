import {
  Button,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useCarrinhoContext } from "common/context/Carrinho";
import Produto from "components/Produto";
import { useContext, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Voltar,
  TotalContainer,
  PagamentoContainer,
} from "./styles";
import { usePagamento } from "../../common/context/Pagamento";
import { UsuarioContext } from "common/context/Usuario";

function Carrinho() {
  const router = useHistory();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, totalPedido, efetuarCompra } = useCarrinhoContext();
  const { formaPagamento, tipoPagamento, mudarFormaPagamento } = usePagamento();
  const { saldo = 0 } = useContext(UsuarioContext);

  const total = useMemo(() => saldo - totalPedido, [saldo, totalPedido]);

  return (
    <Container>
      <Voltar onClick={() => router.goBack()} />
      <h2>Carrinho</h2>
      {carrinho.map((prod) => (
        <Produto {...prod} key={prod.id} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>

        <Select
          value={formaPagamento.id}
          onChange={(e) => mudarFormaPagamento(e.target.value)}
        >
          {tipoPagamento.map((value) => (
            <MenuItem value={value.id} key={value.id}>
              {value.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {totalPedido.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {total.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          efetuarCompra();
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || carrinho.length === 0}
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Carrinho;
