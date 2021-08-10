import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  // const { bookInterview, cancelInterview } = props;
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  });

  
  // function to update the dayList when sidebar is clicked
  const setDay = day => setState({ ...state, day });



  // function(takes appointment id and interview) passed to each Appointment to change the local state when we book an interview using save function
  function bookInterview(id, interview) {
    
    const appointment = { ...state.appointments[id], interview: { ...interview }};
    const appointments = { ...state.appointments, [id]: appointment};

    // Make the request with the correct endpoint using the appointment id, with the interview data in the body, we should receive a 204 No Content response.
    // When the response comes back we update the state using the existing setState.
    // Transition to SHOW when the promise returned by props.bookInterview resolves. This means that the PUT request is complete.
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({ ...state, appointments})
      })
      .catch(err => console.log(err));
  }




  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null};
    const appointments = { ...state.appointments, [id]: appointment};

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({...state, appointments})
      });
  }
  
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
  
  // Create an array of Appointment objects for the day
  const appointments = getAppointmentsForDay(state, state.day);

  // Create interviewers array for the day
  const interviewers = getInterviewersForDay(state, state.day);

  // Generate Appointment component

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return (
        <Appointment 
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            />
          </nav>
          <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
        </>}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
