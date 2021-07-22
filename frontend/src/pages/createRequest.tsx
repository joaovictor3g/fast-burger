import { useState } from 'react';

import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/CreateRequest.module.scss';
import burgerIcon from '../assets/burgerIcon.svg';

import { Modal } from '../components/Modal';

export default function CreateRequest() {
  const [amount, setAmount] = useState(0);

  function handleChangeAmount(_amount: number) {
    if(amount === 0 && _amount < 0)
      return;

    setAmount(amount + _amount)
  }

  return (
    <div className={styles.container}> 
      <Head>
        <title>Fast Burger | Criar pedido</title>
      </Head>
      <Image src={burgerIcon} alt="burger logo"/>
      <div className={styles.content}>
        <span>Quantidade de Hamburgueres</span>
        <div className={styles.inputButtonGroup}>
          <button onClick={() => handleChangeAmount(-1)} type="button"> - </button>
          <input
            min="0"
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))}
          />
          <button onClick={() => handleChangeAmount(+1)} type="button"> + </button>
        </div>

        <button type="button">Ok</button>
        <Modal />
      </div>
    </div>
  );
}