import Head from 'next/head';
import { Typography, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import PageTitle from '../components/PageTitle';
import styles from '../styles/Login.module.scss';
import Link from 'next/link';
import Cookies from 'js-cookie';

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
import toast from 'react-hot-toast';
import { GetServerSideProps } from 'next';

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

export default function Login() {
  const router = useRouter();
  const { handleSaveClientId } = useClientContext();

  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    
    const data = { 
      email,
      password
    };

    try {
      const response = await api.post('/session', data);
      const info = response.data;
      const clientId = info.client_id;
      handleSaveClientId(clientId);
      
      toast.success('Login com sucesso!!!');

      setTimeout(() => {
        router.push(`/requests`);
      }, 2000)

    } catch(err) {
      console.log(err);
      toast.error('Informações incorretas, verifique e tente novamente', {
        duration: 2000
      })
    }
  }

  return (
    <>
      <Head>
        <title>Fast Burger | Login</title>
      </Head>
      <PageTitle title="Finalizar pedido"/>
      <div className={styles.container}>
        <div className={styles.description}>
          <Typography 
            variant="h4" 
            className={styles.pageTitle}
          >
            Faça seu login
            
          </Typography>
        </div>
        
        <form onSubmit={onSubmit}>
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
            label="Password"
            variant="outlined"
            id="custom-css-outlined-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          
          />
          <Link href="/confirmRequest">
            <a className={styles.notSigned}>Não tem cadastro?</a>
          </Link>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
