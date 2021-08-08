import { useState } from "react"

// Custom hook that manages state while moving through the app
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  // keep track of the modes history, so we can go backwards. Store history as a stateful array in our Hook.
  // We'll interact with history through the transition and back actions.
  const [history, setHistory] = useState([initial]);

  // allows to advance to any other mode. When transition is called, add the new mode to history array.
  // When replace is true, set the history so that the current mode(last element of history array) is replaced with the given mode
  function transition(mode, replace = false) {
    setMode(mode);
    setHistory(replace ? [...history.slice(0, -1), mode] : [...history, mode]);
  }

  // allows to return to the prev mode
  // history array length has to have at least one element (history.length = 1), initial mode

  function back() {
    if (history.length > 1) {
      setHistory([...history.slice(0, -1)]);
      // set the mode to the previous item in our history array, second to last
      setMode(history[history.length - 2]);
    };
  }

  return { mode, transition, back };
}