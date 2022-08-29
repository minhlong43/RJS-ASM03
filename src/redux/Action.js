import * as ActionTypes from "./ActionTypes";

export const staffNew = (
  id,
  name,
  department,
  salaryScale,
  doB,
  startDate,
  annualLeave,
  overTime
) => ({
  type: ActionTypes.ADD_STAFF,
  payload: {
    // name: name,
    // department: department,
    // salaryScale: salaryScale,
    // doB: doB,
    // startDate: startDate,
    // annualLeave: annualLeave,
    // overTime: overTime,
    id,
    name,
    department,
    salaryScale,
    doB,
    startDate,
    annualLeave,
    overTime,
  },
});
