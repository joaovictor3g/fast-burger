import { createContext, useContext, useState } from 'react';
import { Ingredient } from '../types';

interface RequestContextData {
  ingredients: Ingredient[];
  handlePushIngredient(ingredient: Ingredient): void;
  total: number;
  handleSetIngredientStateToEmpty(): void;
}

export const RequestContext = createContext({} as RequestContextData);

export function RequestProvider({ children }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [total, setTotal] = useState(0);

  function handlePushIngredient(_ingredient: Ingredient) {
    if(!ingredients.includes(_ingredient)) {
      ingredients.filter(ing => {
        if(ing.type===_ingredient.type)
          setTotal(prevTotal => prevTotal - ing.price);
      })

      setIngredients(prevIngredients => {    
        return [ ...prevIngredients.filter(ing => ing.type!==_ingredient.type), _ingredient ];
      });

      setTotal(prevTotal => prevTotal + _ingredient.price);
    }
  }

  function handleSetIngredientStateToEmpty() {
    setIngredients([]);
    setTotal(0);
  }
  
  return (
    <RequestContext.Provider
      value={{
        ingredients,
        handlePushIngredient,
        total,
        handleSetIngredientStateToEmpty
      }}
    >
      {children}
    </RequestContext.Provider>
  )
};

export function useRequestContext() {
  return useContext(RequestContext);
}