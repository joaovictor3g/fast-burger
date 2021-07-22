import { useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import PageTitle from "../components/PageTitle";
import RequestRow from "../components/RequestRow";
import { Typography } from "@material-ui/core";
import styles from "../styles/Requests.module.scss";

const ingredientData = [
  {
    type: "Pão",
    ingOptions: [
      {
        name: "Pão brioche",
        description: "Uma descrição do pão",
        ingredient_id: 1,
        amount: 2,
        price: 2.5,
        type: "Pão",
      },
      {
        name: "Pão baguette",
        description: "Uma descrição do pão baguette",
        ingredient_id: 2,
        amount: 4,
        price: 4.5,
        type: "Pão",
      },
    ],
  },
  {
    type: "Carne",
    ingOptions: [
      {
        name: "Hamburger bovino",
        description: "Uma descrição do hamburger bovino",
        ingredient_id: 3,
        amount: 2,
        price: 2.5,
        type: "Carne",
      },
      {
        name: "Hamburger suíno",
        description: "Uma descrição do hamburger suíno",
        ingredient_id: 4,
        amount: 4,
        price: 4.5,
        type: "Carne",
      },
    ],
  },
  {
    type: "Molho",
    ingOptions: [
      {
        name: "Maionese",
        description: "Uma descrição do hamburger bovino",
        ingredient_id: 5,
        amount: 2,
        price: 2.5,
        type: "Carne",
      },
      {
        name: "Ketchup",
        description: "Uma descrição do hamburger suíno",
        ingredient_id: 6,
        amount: 4,
        price: 4.5,
        type: "Carne",
      },
      {
        name: "Mostarda",
        description: "Uma descrição do hamburger suíno",
        ingredient_id: 7,
        amount: 4,
        price: 4.5,
        type: "Carne",
      },
    ],
  },
];

export interface Request {
  status: string;
  ingredients: number[];
}

const initialRequest: Request[] = [
  {
    status: "Esperando",
    ingredients: [],
  },
  {
    status: "Esperando",
    ingredients: [],
  },
];

export default function Requests(props: {}) {
  const [request, setRequest] = useState<Request[]>(initialRequest); // TODO: se for mais de um pedido por criação, criar uma estrutura de pedidos muliplos
  const router = useRouter();
  const query = router.query;
  const amount = query.amount;

  return (
    <div className={styles.root}>
      <Head>
        <title>Fast Burger | Pedidos</title>
      </Head>
      <PageTitle title="Pedidos" />
      <div className={styles.container}>
        {
          // interates over array of requests to generates RequestRow components
          request.map((request, index) => (
            <div key={index}>
              <Typography
                variant="h5"
                component="div"
                className={styles.rowTitle}
              >
                Pedido 0{index + 1}
              </Typography>
              <RequestRow
                key={index}
                requestIndex={index}
                request={request}
                setRequest={setRequest}
                ingredients={ingredientData}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
