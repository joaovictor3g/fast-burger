import Head from 'next/head';
import { Typography, TextField } from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import styles from '../styles/ConfirmRequest.module.scss';

import {
  createStyles,
  Theme,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { FormEvent, useState } from 'react';
import { Modal } from '../components/Modal';

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
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>Fast Burger | Finalizar</title>
      </Head>
      <PageTitle title="Finalizar pedido"/>
      <div className={styles.container}>
        <div className={styles.description}>
          <Typography 
            variant="h4" 
            className={styles.pageTitle}
          >
            Para finalizar o  pedido,
            
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
          
          />
          <button type="submit">Finalizar Pedido</button>
        </form>
      </div>
      <Modal />
    </>
  );
}