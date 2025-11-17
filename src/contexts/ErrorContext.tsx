import { createContext, useContext, useState } from "react";
import { ErrorModal } from "../components/ErrorModal";

interface ErrorContextData {
  triggerError: (msg: string | null) => void
}

const ErrorContext = createContext<ErrorContextData | null>(null);

interface Props {
  children: React.ReactNode
}

export const ErrorProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | null>(null);

  const triggerError = (msg: string | null) => setMessage(msg);
  const clearError = () => setMessage(null);

  return (
    <ErrorContext.Provider value={{ triggerError }}>
      {children}

      <ErrorModal open={!!message} message={message} onClose={clearError} />
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);