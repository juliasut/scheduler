import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // When the user clicks the Cancel button, we clear the form values
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };


  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList
      interviewers={props.interviewers} 
      value={interviewer} 
      onChange={setInterviewer} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm>Save</Button>
    </section>
  </section>
</main>
  );
}

// As part of our Edit story, the Form component should take the following props:

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function
// As part of our Create story, the Form component should take the following props:

// interviewers:Array
// onSave:Function
// onCancel:Function