import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, FiberManualRecord } from "@material-ui/icons";
import styles from "../styles/components/RequestDetailRow.module.scss";

interface RequestDetailRowProps {
  requestName: string;
  ingredients: string[];
}

export default function RequestDetailRow(props: RequestDetailRowProps) {
  const { requestName, ingredients } = props;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.root}>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText
          primary={<Typography variant="h6">{requestName}</Typography>}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {ingredients.map((ingredient) => (
            <ListItem button className={styles.listItem} key={ingredient}>
              <ListItemIcon className={styles.listItemIcon}>
                <FiberManualRecord fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
