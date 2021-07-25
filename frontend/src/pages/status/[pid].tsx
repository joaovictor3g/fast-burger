import Head from "next/head";
import { Divider, Button, Chip } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import styles from "../../styles/Status.module.scss";
import RequestDetailRow from "../../components/RequestDetailRow";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Ingredient } from "../../types";
import toast from "react-hot-toast";
import Link from "next/link";
import { useClientContext } from "../../contexts/ClientContext";
import { useRouter } from "next/router";

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
    image_url: string;
  }[];
}

export default function Status() {
  const { clientId } = useClientContext();
  const [requests, setRequests] = useState<ClientRequestProps>(
    {} as ClientRequestProps
  );
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedIng, setSelectedIng] = useState<Ingredient>({} as Ingredient);

  async function getRequestsByClientId() {
    try {
      const response = await api.get<ClientRequestProps>(
        `/clientRequestByClientId/${clientId}`
      );

      console.log(response.data)

      setRequests(response.data);
    } catch (err) {
      toast.error("Erro ao carregar pedidos");
    }
  }

  useEffect(() => {
    getRequestsByClientId();
  }, [clientId]);

  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Meu pedido</title>
      </Head>
      <PageTitle title="Meu Pedido" />
      <Link href="/historic">
        <a className={styles.linkButton}>Ver meu histórico</a>
      </Link>

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
        img={selectedIng?.image_url}
      />
      <Button className={styles.button} onClick={() => router.push('/requests')}>Realizar novo pedido</Button>
    </div>
  );
}
