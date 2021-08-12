import { useState, useEffect } from 'react';
import axios from 'axios';

/*
  Our useApplicationData Hook will return an object with four keys.

  The state object will maintain the same structure.
  The setDay action can be used to set the current day.
  The bookInterview action makes an HTTP request and updates the local state.
  The cancelInterview action makes an HTTP request and updates the local state.
*/

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: [],
    interviewers: {},
  });

  // function to update the dayList when sidebar is clicked
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (state, day) => {
    const currentDay = day || state.day;

    // We need to find the current day object
    const currentDayObj = state.days.find(
      (dayObj) => dayObj.name === currentDay
    );
    const currentDayObjIndex = state.days.findIndex(
      (dayObj) => dayObj.name === currentDay
    );

    // We need to ask for the appointment ids
    const listOfApptIds = currentDayObj.appointments;

    // We need to check every appointment to see if they're free or not
    const listOfFreeAppointments = listOfApptIds.filter(
      (apptId) => !state.appointments[apptId].interview
    );

    // We need to update the spots values on the day object
    const newSpots = listOfFreeAppointments.length;

    const updatedState = { ...state };
    updatedState.days = [...state.days];
    const updatedDay = { ...currentDayObj };
    updatedDay.spots = newSpots;
    updatedState.days[currentDayObjIndex] = updatedDay;

    return updatedState;
  };

  // function(takes appointment id and interview {}) passed to each Appointment to change the local state when we book an interview using save function
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    /*
      Make the request with the correct endpoint using the appointment id, with the interview data in the body, we should receive a 204 No Content response.
      When the response comes back we update the state using the existing setState.
      Transition to SHOW when the promise returned by props.bookInterview resolves. This means that the PUT request is complete.
    */
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState(updateSpots({ ...state, appointments }));
      });
  }

  /*
    Takes appointment id, finds the right slot and sets interview {} to null
    Spreading layer by layer working up the data structure
  */
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState(updateSpots({ ...state, appointments }));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
