import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "components/DayList";
const axios = require('axios');


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "4pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Palmer Sylvia",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
  
];


export default function Application(props) {
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get("/api/days").then((response) => {
    
      setDays([...response.data])
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
            days={days}
            day={days.name}
            setDay={setDays}
          />
          </nav>
          <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
        </>}
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
