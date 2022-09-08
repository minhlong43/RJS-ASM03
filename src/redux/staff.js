import { STAFFS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = STAFFS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFF:
      var newStaff = action.payload;
      newStaff.id = state.length;

      return state.concat(newStaff);

    default:
      return state;
  }
};
