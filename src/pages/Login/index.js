import { Button } from "@material-ui/core";
import { Container, Titulo, InputContainer } from "./styles";
import { Input, InputLabel, InputAdornment } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UsuarioContext } from "common/context/Usuario";
import { useContext } from "react";
function Login() {
  const router = useHistory();
  const { nome, setNome, saldo, setSaldo } = useContext(UsuarioContext);

  function handleLogin(e) {
    e.preventDefault();

    if(nome && saldo){
      router.push("/feira");
    }else{
      alert('Digite o nome/saldo para prosseguir!!')
    }

  }
  return (
    <Container>
      <Titulo>Insira o seu nome</Titulo>
      <InputContainer>
        <InputLabel>Nome</InputLabel>
        <Input
          type="text"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Saldo</InputLabel>
        <Input
          value={saldo}
          onChange={(e) => setSaldo(e.target.value)}
          type="number"
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
        />
      </InputContainer>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Avançar
      </Button>
    </Container>
  );
}

export default Login;
