# Interview Scheduler


### A project built during [Lighthouse Labs](https://github.com/lighthouse-labs) Immersive Web Development Bootcamp.

Development focuses on a single page application (SPA) called Interview Scheduler, built using React. It allows users to book and cancel interviews.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest tests are used through the development of the project.


# Final Product

![User experience]()
![Storybook Components]()
![Jest]()
![Cypress]()


## Project Features


- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.


## Project Stack

React, Axios, JSX, HTML, SASS, JavaScript

Express, Node.js, PostgreSQL

Testing: Storybook, Webpack Dev Server, Jest, Cypress

## Dependencies

- axios
- classnames
- normalize.css
- prop-types
- react
- react-dom
- react-hooks-testing-library
- react-scripts
- react-test-renderer
- babel/core
- storybook/addon-actions
- storybook/addon-backgrounds
- storybook/addon-links
- storybook/addons
- storybook/react
- testing-library/jest-dom
- testing-library/react
- testing-library/react-hooks
- babel-loader
- cypress
- node-sass


## Setup

Install dependencies with `npm install`.


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## For Scheduler API - clone and start the server
```sh
git clone https://github.com/lighthouse-labs/scheduler-api.git
```
