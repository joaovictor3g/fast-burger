import Head from 'next/head';
import { Typography, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import PageTitle from '../components/PageTitle';
import styles from '../styles/ConfirmRequest.module.scss';
import burgerIcon from '../assets/burgerIcon.svg';
import Image from 'next/image';
import {
  createStyles,
  Theme,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { FormEvent, useState } from 'react';
import { Modal } from '../components/Modal';
import { api } from '../services/api';
import { useClientContext } from '../contexts/ClientContext';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function ConfirmRequest() {
  const router = useRouter();
  // const { handleSaveClientId } = useClientContext();

  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    
    const data = {
      name, 
      email,
      password
    }

    try {
      const response = await api.post('/client', data);
      const info = response.data;
      const clientId = info.id;

      // handleSaveClientId(clientId)
      setTimeout(() => {
        router.push(`/login`);
      }, 2000)

    } catch(err) {
      alert('Erro')
    }
  }

  return (
    <>
      <Head>
        <title>Fast Burger | Finalizar</title>
      </Head>
      <PageTitle title="Cadastre-se aqui"/>
      <div className={styles.container}>
        <div className={styles.description}>
          <Image src={burgerIcon} alt="logo da empresa"/>
          <Typography 
            variant="h4" 
            className={styles.pageTitle}
          >
            Para se cadastrar,
            
          </Typography>
          <Typography 
            variant="h4" 
            className={styles.pageTitle}
          >
            preencha os dados a seguir.
            
          </Typography>
        </div>
        
        <form onSubmit={onSubmit}>
          <CssTextField
            error={name!=='' && !name.trim()}
            helperText={name!=='' && !name.trim() && "Nome Incorreto"}
            className={classes.margin}
            label="Nome"
            variant="outlined"
            id="custom-css-outlined-input"
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
            
          />
          <CssTextField
            className={classes.margin}
            label="Email"
            variant="outlined"
            id="custom-css-outlined-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          
          />
          <CssTextField
            className={classes.margin}
            label="Senha"
            variant="outlined"
            id="custom-css-outlined-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          
          />
          <button type="submit">Finalizar Cadastro</button>
        </form>
      </div>
    </>
  );
}