import { useState, useEffect} from "react";
import axios from "axios";

/*
  Our useApplicationData Hook will return an object with four keys.

  The state object will maintain the same structure.
  The setDay action can be used to set the current day.
  The bookInterview action makes an HTTP request and updates the local state.
  The cancelInterview action makes an HTTP request and updates the local state.
*/

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  // function to update the dayList when sidebar is clicked
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
    .then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);


  // function(takes appointment id and interview {}) passed to each Appointment to change the local state when we book an interview using save function
  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment};

    /*
      Make the request with the correct endpoint using the appointment id, with the interview data in the body, we should receive a 204 No Content response.
      When the response comes back we update the state using the existing setState.
      Transition to SHOW when the promise returned by props.bookInterview resolves. This means that the PUT request is complete.
    */
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({ ...state, appointments})
      })
      .catch(err => console.log(err));
  }

  /*
    Takes appointment id, finds the right slot and sets interview {} to null
    Spreading layer by layer working up the data structure
  */
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null};
    const appointments = { ...state.appointments, [id]: appointment};

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({...state, appointments})
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}