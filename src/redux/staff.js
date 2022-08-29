import { STAFFS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = STAFFS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFF:
      var newStaff = action.payload;
      newStaff.id = state.length;
      // newStaff.department = state.length;
      // newStaff.startDate = new Date().toISOString();
      // newStaff.doB = new Date().toISOString();
      // newStaff.salaryScale = state.length;
      // newStaff.annualLeave = state.length;
      // newStaff.overTime = state.length;
      return state.concat(newStaff);

    default:
      return state;
  }
};
