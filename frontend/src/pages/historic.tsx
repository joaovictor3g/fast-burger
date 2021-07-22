import { useState } from "react";
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
  return (
    <div className={styles.root}>
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
            <Row name="Emiliano" date="10/10/2018" amount={1} />
            <Row name="Felipe" date="15/10/2018" amount={2} />
            <Row name="Victor" date="20/10/2018" amount={3} />
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
