import React from 'react';
import './styles.scss';

import useVisualMode from 'hooks/useVisualMode';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

// modes of the Appointment to shift between
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


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

  function deleting(id) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      // .catch(() => transition()))
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={ save }
          onCancel={ back }
        />)}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={ save }
          onCancel={ back }
        />)}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && (
      <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={() => deleting(props.id)}
        onCancel={ back }
      />)}
    </article>
  );
}