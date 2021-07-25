import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import burgerIcon from '../assets/burgerIcon.svg';
import { GetServerSideProps } from 'next';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Burger | Início</title>
        <meta name="description" content="Aplicação para montar seu pedido de forma rápida e sucinta" />
        <meta property="og:description" content="Aplicação para montar seu pedido de forma rápida e sucinta" />
        <meta property="og:url" content="https://fast-burger-six.vercel.app/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}> 
        <Image src={burgerIcon} alt="burger logo"/>

        <Link href="/login">
          <a>Realizar pedido</a>
        </Link>
      </div>
    </div>
  )
};

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const response = await fetch('https://api.github.com/users/joaovictor3g/repos');

  const dataJson = await response.json();
  const data = dataJson;
  
  return {
    props: {
      data
    }
  }
}
