import React from "react";
import { render } from "@testing-library/react";
import Form from "components/Appointment/Form"


describe("Form", () => {
  const interviewers =[
   {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  it("renders without crashing", () => {
    render(<Form interviewers={interviewers} />);
  });
  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});