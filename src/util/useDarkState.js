import React from "react";

const useDarkState = () => {
  const [darkState, setDarkState] = React.useState(() => {
    const stickyValue = window.localStorage.getItem("darkState");
    return stickyValue !== null ? JSON.parse(stickyValue) : false;
  });

  React.useEffect(() => {
    window.localStorage.setItem("darkState", JSON.stringify(darkState));
  }, [darkState]);

  const toggleDarkState = () => {
    setDarkState(!darkState);
  };

  return [darkState, toggleDarkState];
};

export default useDarkState;
