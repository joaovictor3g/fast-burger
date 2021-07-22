import Head from "next/head";
import { Divider, Button, Chip } from "@material-ui/core";
import PageTitle from "../components/PageTitle";
import styles from "../styles/Status.module.scss";
import RequestDetailRow from "../components/RequestDetailRow";

export default function Status(props: {}) {
  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Meu pedido</title>
      </Head>
      <PageTitle title="Meu Pedido" />
      <RequestDetailRow
        requestName="Pedido 01"
        ingredients={["Pão brioche", "Hamburger", "Tomate", "Maionese"]}
      />

      <Divider style={{ width: "90%" }} />

      <Chip
        label="Preparando..."
        variant="outlined"
        className={styles.status}
      />
      <Button className={styles.button}>Página Inicial</Button>
    </div>
  );
}
