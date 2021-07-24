import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Box,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import PageTitle from "../components/PageTitle";
import styles from "../styles/Historic.module.scss";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { HistoricRequests } from "../types";
import Head from "next/head";
import { useClientContext } from "../contexts/ClientContext";
import { useRouter } from "next/router";

interface RowProps {
  name: string;
  date: string;
  amount: number;
  price: number;
}
function Row(props: RowProps) {
  const { name, date, amount, price } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">R${price.toFixed(2)}</TableCell>
        <TableCell align="center">{date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              Detalhes maiores aqui
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Historic() {
  const [historicRequests, setHistoricRequests] = useState(
    {} as HistoricRequests
  );
  const { clientId } = useClientContext();
  const router = useRouter();

  async function getHistoricRequests() {
    try {
      const response = await api.get(`/clientRequestAllByClientId/${clientId}`);
      setHistoricRequests(response.data);
    } catch (err) {
      toast.error("Não foi possivel pegar o historico");
    }
  }

  const handleNavigate = () => {
    router.push("/");
  };

  useEffect(() => {
    getHistoricRequests();
  }, []);

  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Histórico</title>
      </Head>
      <PageTitle title="Historico" />
      <TableContainer className={styles.container} component={Paper}>
        {historicRequests?.data?.map((request, index) => (
          <Table key={index}>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Preço</TableCell>
                <TableCell align="center">Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {request.request.map((ingredient) => (
                <Row
                  key={ingredient.request_id}
                  name={ingredient.name}
                  date={new Intl.DateTimeFormat("pt-BR").format(
                    new Date(ingredient.created_at)
                  )}
                  amount={ingredient.amount}
                  price={ingredient.price}
                />
              ))}
            </TableBody>
          </Table>
        ))}
      </TableContainer>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} onClick={handleNavigate}>
          <Typography>Página Inicial</Typography>
        </Button>
      </div>
    </div>
  );
}
