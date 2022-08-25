import { useReducer } from "react";
import data from "../../data/data";
import {
  ADD_ITEM,
  CLEAR_SEARCH,
  DELETE_ITEM,
  EDIT_ITEM,
  SEARCH_ITEMS,
  SET_SEARCH_TERM,
} from "../../types";
import MaterialsContext from "./materialsContext";
import materialsReducer from "./materialsReducer";

const MaterialsState = (props) => {
  const initialState = {
    materials: data.materials,
    filteredMaterials: [],
    searchTerm: "",
  };

  const [state, dispatch] = useReducer(materialsReducer, initialState);

  const searchItems = (searchTerm) => {
    if (searchTerm.length > 0) {
      dispatch({
        type: SEARCH_ITEMS,
        payload: state.materials.filter(
          (item) =>
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.line.toLocaleLowerCase().includes(searchTerm.toLowerCase())
        ),
      });
      dispatch({ type: SET_SEARCH_TERM, payload: searchTerm });
    } else {
      dispatch({ type: CLEAR_SEARCH });
    }
  };

  const deleteItem = (id) => {
    if (state.searchTerm.length > 0) {
      dispatch({
        type: SEARCH_ITEMS,
        payload: state.materials
          .filter(
            (item) =>
              item.description
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase()) ||
              item.line
                .toLocaleLowerCase()
                .includes(state.searchTerm.toLowerCase())
          )
          .filter((material) => material.id !== id),
      });
    }

    dispatch({
      type: DELETE_ITEM,
      payload: state.materials.filter((material) => material.id !== id),
    });
  };

  const editItem = (item) => {
    let index = state.materials.indexOf(
      state.materials.filter((material) => material.id === item.id).pop()
    );

    let newArray = (state.materials[index] = item);
    dispatch({ EDIT_ITEM, payload: newArray });

    if (state.searchTerm.length > 0) {
      dispatch({
        type: SEARCH_ITEMS,
        payload: state.materials.filter(
          (item) =>
            item.description
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            item.line
              .toLocaleLowerCase()
              .includes(state.searchTerm.toLowerCase())
        ),
      });
    }
  };

  const addItem = (newItem) => {
    dispatch({ type: ADD_ITEM, payload: newItem });
  };

  return (
    <MaterialsContext.Provider
      value={{
        materials: state.materials,
        filteredMaterials: state.filteredMaterials,
        searchItems,
        deleteItem,
        editItem,
        addItem,
      }}
    >
      {props.children}
    </MaterialsContext.Provider>
  );
};

export default MaterialsState;
