import { createContext, useState, useContext } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: (user) => {},
  setToken: (token) => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token); // Save token to local storage
    } else {
      localStorage.removeItem("ACCESS_TOKEN"); // Remove token from local storage
    }
  };
  return (
    <StateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
