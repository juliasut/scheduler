import React from 'react';
import InterviewerListItem  from './InterviewerListItem';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {

          return (
  
            <InterviewerListItem 
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.interviewer}
              setInterviewer={event => props.setInterviewer(interviewer.id)}
            />

          );
        })}
      </ul>
    </section>
  );
}

// Our InterviewerList takes in three props:
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id


// Our InterviewerListItem component takes in the following props:
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection