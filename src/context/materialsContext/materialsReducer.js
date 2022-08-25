import {
    ADD_ITEM,
  CLEAR_SEARCH,
  DELETE_ITEM,
  EDIT_ITEM,
  SEARCH_ITEMS,
  SET_SEARCH_TERM,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        filteredMaterials: action.payload,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        filteredMaterials: [],
        searchTerm: "",
      };

    case DELETE_ITEM:
      return {
        ...state,
        materials: action.payload,
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case EDIT_ITEM:
      return {
        ...state,
        materials: action.payload,
      };
case ADD_ITEM:
    return {
        ...state,
        materials: [...state.materials, action.payload]
    }
    default:
      return state;
  }
};
