import { combineReducers, createStore } from "redux";
import { Departments } from "./departments";
import { Role } from "./role";
import { Staffs } from "./staff";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      role: Role,
    })
  );
  return store;
};
