import { Typography } from "@material-ui/core";
import styles from "../styles/components/PageTitle.module.scss";

interface IProps {
  title: string;
}

export default function PageTitle(props: IProps) {
  const { title } = props;
  return (
    <div className={styles.root}>
      <Typography variant="h4" className={styles.pageTitle}>{title}</Typography>
    </div>
  );
}
