import { createContext, useContext, useState } from "react";
import { ErrorModal } from "../components/ErrorModal";

const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const triggerError = (msg) => setMessage(msg);
  const clearError = () => setMessage(null);

  return (
    <ErrorContext.Provider value={{ triggerError }}>
      {children}

      <ErrorModal open={!!message} message={message} onClose={clearError} />
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);