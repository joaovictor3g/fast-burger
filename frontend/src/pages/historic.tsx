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

interface RowProps {
  name: string;
  date: string;
  amount: number;
}
function Row(props: RowProps) {
  const { name, date, amount } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow onClick={() => setOpen(!open)}>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{amount}</TableCell>
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
  const [historicRequests, setHistoricRequests] = useState({} as HistoricRequests);

  async function getHistoricRequests() {
    try {
      const response = await api.get(`/clientRequestByClientId/85d67611-6142-487e-9fe6-7f6e9e80be34`);

      setHistoricRequests(response.data);
      
    } catch(err) {
      toast.error('Não foi possivel pegar o historico')
    }
  }

  useEffect(() => {
    getHistoricRequests()
  }, [])

  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Histórico</title>
      </Head>
      <PageTitle title="Historico" />
      <TableContainer className={styles.container} component={Paper}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicRequests.data?.map((historic) => (
              <Row key={historic.request_id} name={historicRequests.name} date={new Intl.DateTimeFormat('pt-BR').format(new Date(historic.created_at))} amount={historic.amount} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.buttonContainer}>
        <Button className={styles.button}>
          <Typography>Página Inicial</Typography>
        </Button>
      </div>
    </div>
  );
}
