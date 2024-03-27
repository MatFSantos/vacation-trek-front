import {ButtonGroup,  CircularProgress,  TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { snackbarError, snackbarSuccess } from '../../data/store/config';
import { Container, Content, Button } from './styles';
import { getAuth, emailValidate } from '../../data/utils/common.util';
import { ContainerForm } from "./styles";
import useApi from '../../data/hooks/useApi';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const [fieldsError, setFieldsError] = useState(false)

  const [loading, setLoading] = useState(false);

  /* requests to login and register new user  */
  const request = async () => {
    setLoading(true);
    const [data, error, statusCode] = await useApi({
      method: 'post',
      url: login ? '/user/login' : '/user',
      data: {
        email: email,
        password: pass,
        name: login ? undefined : name,
      }
    })
    setLoading(false);
    if(data && (statusCode === 200 || statusCode === 201)){
      localStorage.setItem("access_token", data.result.token);
      navigate('/', { state: { user: data.result.user }});
      enqueueSnackbar(data.detail, snackbarSuccess);
    }
    else
      enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
  }

  /* to verify if any user is loged */
  useEffect(() => {
    const verifyLogin = async () => {
      let config = getAuth();
      if (config){
        const [data, error, statusCode] = await useApi({
          method: 'post',
          url: '/user/verify-login',
          config: config
        });
        if (data && statusCode == 200)
          navigate('/', { state: { user: data.result }});
        else 
          enqueueSnackbar(`code ${statusCode}: ` + error, snackbarError);
      }
    }
    verifyLogin();
  }, []);

  /* to change variables between login and register */
  const clickButton = (isLogin) => {
    setLogin(isLogin);
    setRegister(!isLogin);
    setEmail("");
    setPass("");
    setName("");
  }

  /* to verify fields */
  const verifyFields = () => {
    if (!email || !emailValidate(email) || email.length > 100){
      setFieldsError(true);
      return;
    } else {
      if (!pass || pass.length > 100){
        setFieldsError(true);
        return;
      } else{
        if (register) {
          if (!name || name.length > 200){
            setFieldsError(true);
            return;
          } else {
            setFieldsError(false)
          }
        } else {
          setFieldsError(false);
        }
      }
    }
  }
  useEffect(() => {
    verifyFields();
  }, [email, name, pass]);

  return (
    <Container>
      <Content>
        <ButtonGroup variant='contained'>
          <Button
            onClick={() => clickButton(true)}
            selected={login}
          >
            Login
          </Button>
          <Button
            onClick={() => clickButton(false)}
            selected={register}
          >
            Register
          </Button>
        </ButtonGroup>
        <ContainerForm>
          {register ?
            <TextField
              InputProps={{style: {color: 'black'}}}
              InputLabelProps={{style: {color: 'black'}}}
              fullWidth
              label="Name"
              variant="outlined"
              sx={{flex: "1 0 130px"}}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          : null}
          <TextField
            InputProps={{style: {color: 'black'}}}
            InputLabelProps={{style: {color: 'black'}}}
            fullWidth
            label="E-mail"
            variant="outlined"
            sx={{flex: "1 0 130px"}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            InputProps={{style: {color: 'black'}}}
            InputLabelProps={{style: {color: 'black'}}}
            fullWidth
            label="Password"
            variant="outlined"
            sx={{flex: "1 0 130px"}}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => request()}
            disabled={loading || fieldsError}
          >
            {loading ? <CircularProgress size={20} /> : ""}
            {login ? "Login" : "Register"}
          </Button>
        </ContainerForm>
      </Content>
    </Container>
  );
}

export default Login;