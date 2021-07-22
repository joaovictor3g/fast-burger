import { useState, SetStateAction, Dispatch } from "react";
import {
  Collapse,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Request } from "../pages/requests";
import styles from "../styles/components/RequestRow.module.scss";

export interface RequestProps {
  request: Request;
  setRequest: Dispatch<SetStateAction<Request[]>>;
  requestIndex: number;
  ingredients: {
    type: string;
    ingOptions: {
      name: string;
      price: number;
      description;
      amount: number;
      type: string;
      ingredient_id: number;
    }[];
  }[];
}

export default function RequestRow(props: RequestProps) {
  const { request, setRequest, ingredients, requestIndex } = props;
  const [opened, setOpened] = useState(0);

  const handleToggle = (value: number, index) => () => {
    const ingIds: number[] = ingredients.map((ing) =>
      ing.ingOptions.map((opt) => opt.ingredient_id)
    )[index];

    const currentIndex = request.ingredients.indexOf(value);
    let newChecked = [...request.ingredients];

    if (ingIds.indexOf(value) > -1) {
      if (newChecked.some((ing) => ingIds.indexOf(ing) > -1)) {
        newChecked = newChecked.filter((ing) => ingIds.indexOf(ing) === -1);
      }

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
    }

    setRequest((prevState) => {
      prevState[requestIndex].ingredients = newChecked;
      return [...prevState];
    });
  };

  return (
    <div className={styles.root}>
      <List>
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.type}>
            <div>
              <ListItem
                button
                onClick={() => setOpened(opened === index + 1 ? 0 : index + 1)}
              >
                <ListItemIcon>
                  {opened === index + 1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                <ListItemText primary={ingredient.type} />
              </ListItem>
              {ingredient.ingOptions.map((ingOption) => (
                <Collapse
                  key={ingOption.ingredient_id}
                  in={opened === index + 1}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      style={{ paddingLeft: 40 }}
                      onClick={handleToggle(ingOption.ingredient_id, index)}
                    >
                      <ListItemIcon className={styles.listIcon}>
                        <Checkbox
                          edge="start"
                          checked={
                            request.ingredients.indexOf(
                              ingOption.ingredient_id
                            ) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemAvatar>
                        <Avatar style={{ height: 35, width: 35 }}>In</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={ingOption.name} />
                    </ListItem>
                  </List>
                </Collapse>
              ))}
            </div>
          </div>
        ))}
      </List>
    </div>
  );
}
