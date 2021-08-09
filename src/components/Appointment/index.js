import React from 'react';
import './styles.scss';

import useVisualMode from 'hooks/useVisualMode';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';

// modes of the Appointment to shift between
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
      
      const interview = {
        student: name,
        interviewer
      };
      console.log("interview: ", interview);
      console.log("props.id: ", props.id);
      transition(SAVING);

      console.log("Next calling bookInterview: ", interview);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(err => console.log(err));
    }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // onEdit={}
          // onDelete={}
        />)}
      {mode === CREATE && (
        <Form
          // name={props.interview.student}
          interviewers={props.interviewers}
          // interviewer={props.interview.interviewer.id}
          onSave={ save }
          onCancel={ back }
        />)}
      {mode === SAVING && <Status message="SAVING" />}
    </article>
  );
}