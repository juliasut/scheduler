// The selector function will return an array of appointments for the given day.
// accepts state as an argument and returns data that is derived from that state.
// const selectedDay = state.days.filter(stateDay => stateDay.name === day)[0];
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(stateDay => stateDay.name === day);
  if (!state.days || !selectedDay) return [];
  // loop through appointment ids array of the given day and sub it with an appointment object with the same id from state data
  return selectedDay.appointments.map(id => state.appointments[id]);
}