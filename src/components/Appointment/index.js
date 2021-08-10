import React from 'react';
import './styles.scss';

import Confirm from './Confirm';
import Empty from "./Empty";
import Error from './Error';
import Form from './Form';
import Header from "./Header";
import Show from "./Show";
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

// Modes of the Appointment to shift between
const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const EMPTY = "EMPTY";
const ERROR_SAVE = "ERROR_SAVE";
const SAVING = "SAVING";
const SHOW = "SHOW";


export default function Appointment(props) {
  // State hook to transition forward and backward in history
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
  

  // Helper to update mode when deleting appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }


  // Helper to update mode when deleting appointment
  function destroy(id) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }


  // Conditional rendering based on current mode
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
          onSave={save}
          onCancel={back}
        />)}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />)}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && (
      <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={() => destroy(props.id)}
        onCancel={ back }
      />)}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back} />}
    </article>
  );
}