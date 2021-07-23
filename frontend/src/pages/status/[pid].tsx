import Head from "next/head";
import { Divider, Button, Chip } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import styles from "../../styles/Status.module.scss";
import RequestDetailRow from "../../components/RequestDetailRow";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

interface ClientRequestProps {
  success: boolean,
  count: number,
  data: {
    ingredient_id: number,
    name: string,
    price: number,
    description: string,
    amount: number,
    type: string
  }[],
}

export default function Status() {
  const router = useRouter();
  const { pid } = router.query;

  const [requests, setRequests] = useState<ClientRequestProps>();

  async function getRequestsByClientId() {
    try {
      const response = await api.get<ClientRequestProps>(`/clientRequestByClientId/${pid}`);

      setRequests(response.data);
    } catch(err) {
      return alert('Erro');
    }
  }

  useEffect(() => {
    getRequestsByClientId();
  }, []);

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
