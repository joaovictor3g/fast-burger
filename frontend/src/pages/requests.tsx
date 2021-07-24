import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import PageTitle from "../components/PageTitle";
import RequestRow from "../components/RequestRow";
import { Typography, Button } from "@material-ui/core";
import styles from "../styles/Requests.module.scss";
import { GetServerSideProps } from "next";
import { api } from "../services/api";
import { Ingredient, ParsedIngredients } from "../types";
import {
  useClientContext,
  ClientContextProvider,
} from "../contexts/ClientContext";
import toast from "react-hot-toast";
import { useRequestContext } from "../contexts/RequestContext";
import Link from "next/link";

interface RequestProps {
  data: Ingredient[];
}
export interface Request {
  status: string;
  ingredients: number[];
}

const initialRequest: Request = {
  status: "Esperando",
  ingredients: [],
};
const ingType = ["Pão", "Carne", "Molho", "Saladas", "Bebidas"];

export default function Requests(props: RequestProps) {
  const router = useRouter();
  const [request, setRequest] = useState<Request>(initialRequest);
  const { clientId } = useClientContext();
  const { ingredients, total } = useRequestContext();

  const parseIngredients = (): ParsedIngredients => {
    let parsedDate: ParsedIngredients = [];

    parsedDate = ingType.map((type) => {
      const ing = props.data.filter((ingredient) => ingredient.type === type);
      return {
        type: type,
        ingOptions: ing,
      };
    });
    return parsedDate;
  };

  const ingredientData = parseIngredients();

  const handleSubmit = async () => {
    try {
      await api.post("/request", { clientId, request });

      toast.success("Pedido criado");

      router.push(`/status/${clientId}`);
    } catch (err) {
      toast.error("Não foi possível criar o pedido, tente novamente!");
    }
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Pedidos</title>
      </Head>
      <PageTitle title="Pedidos" />
      
      <Link href="/historic">
        <a className={styles.button}>Ver meu histórico</a>
      </Link>

      <div className={styles.container}>
        <div className={styles.requestContainer}>
          <Typography variant="h5" component="div" className={styles.rowTitle}>
            Pedido de comida
            <span>(Selecione 1 de cada)</span>
          </Typography>
          <RequestRow
            request={request}
            setRequest={setRequest}
            ingredients={ingredientData}
          />
        </div>
        <aside> 
          <h3>Listagem de pedidos </h3>
          {ingredients.map((ingredient) => (
            <div key={ingredient.ingredient_id} className={styles.listRequest}>
              <span>{ingredient.name}</span>
              <span>{
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL'})
                .format(ingredient.price)
              }</span>
            </div>
          ))}

          <div className={styles.totalPrice}>
            <span>Total</span>
            <span>
              {
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL'})
                .format(total)
              }
              </span>
          </div>

          <Button className={styles.button} onClick={handleSubmit}>
            <Typography>Criar Pedido</Typography>
          </Button>
        </aside>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await api.get("/ingredient");
  const data = response.data;

  return {
    props: {
      data,
    },
  };
};
