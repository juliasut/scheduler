// The selector function will return an array of appointments for the given day.
// accepts state as an argument and returns data that is derived from that state.
// const selectedDay = state.days.filter(stateDay => stateDay.name === day)[0];
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(stateDay => stateDay.name === day);
  if (!state.days || !selectedDay) return [];
  // loop through appointment ids array of the given day and sub it with an appointment object with the same id from state data
  return selectedDay.appointments.map(id => state.appointments[id]);
}

// This function will return an object that contains the interview data if it is passed an object that contains an interviewer (id).
// (input)
// interview:
    // {
    //  student: "Lydia Miller-Jones",
    //  interviewer: 1
    // }
// (output)
// interview:
  // {  
  //   student: "Lydia Miller-Jones",
  //   interviewer: {  
  //     id: 1,
  //     name: "Sylvia Palmer",
  //     avatar: "https://i.imgur.com/LpaY82x.png"
  //   }
  // }

export function getInterview(state, interview) {
  if (!interview) return null;
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
// spread interview object and set new interviewer key -> later interviewer value overwrites the prev one
  return { ...interview, interviewer};
}