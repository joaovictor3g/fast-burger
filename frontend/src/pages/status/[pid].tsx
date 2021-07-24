import Head from "next/head";
import { Divider, Button, Chip } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import styles from "../../styles/Status.module.scss";
import RequestDetailRow from "../../components/RequestDetailRow";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Ingredient } from "../../types";
import toast from "react-hot-toast";

interface ClientRequestProps {
  success: boolean;
  count: number;
  data: {
    ingredient_id: number;
    name: string;
    price: number;
    description: string;
    amount: number;
    type: string;
  }[];
}

export default function Status() {
  const router = useRouter();
  const { pid } = router.query;
  const [requests, setRequests] = useState<ClientRequestProps>(
    {} as ClientRequestProps
  );
  const [open, setOpen] = useState(false);
  const [selectedIng, setSelectedIng] = useState<Ingredient>({} as Ingredient);


  async function getRequestsByClientId() {
    console.log(pid)
    try {
      const response = await api.get<ClientRequestProps>(
        `/clientRequestByClientId/${pid}`
      );

      setRequests(response.data);
    } catch (err) {
      toast.error('Erro ao carregar pedidos');
    }
  }

  useEffect(() => {
    getRequestsByClientId();
  }, [pid]);

  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Meu pedido</title>
      </Head>
      <PageTitle title="Meu Pedido" />
      <RequestDetailRow
        requestName="Detalhes do pedido"
        ingredients={requests?.data}
        setSelectedIng={setSelectedIng}
        handleOpen={() => setOpen(true)}
      />

      <Divider style={{ width: "90%" }} />

      <Chip
        label="Preparando..."
        variant="outlined"
        className={styles.status}
      />
      <Modal
        description={selectedIng?.description}
        title={selectedIng?.name}
        isOpen={open}
        handleClose={() => setOpen(false)}
      />
      <Button className={styles.button}>Página Inicial</Button>
    </div>
  );
}
