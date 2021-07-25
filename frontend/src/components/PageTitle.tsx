import { Typography } from "@material-ui/core";
import { useClientContext } from "../contexts/ClientContext";
import styles from "../styles/components/PageTitle.module.scss";
import { useRouter } from 'next/router';

interface IProps {
  title: string;
}

export default function PageTitle(props: IProps) {
  const { title } = props;

  const { pathname } = useRouter();

  const { handleSignOut } = useClientContext();

  return (
    <div className={styles.root}>
      <Typography variant="h4" className={styles.pageTitle}>{title}</Typography>
      {(pathname!=='/login' && pathname!=='/confirmRequest') && 
        <button className={styles.signOut} onClick={handleSignOut}>SAIR</button>
      }
    </div>
  );
}
