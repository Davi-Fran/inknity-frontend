import type { FC } from "react";

export const ErrorModal = ({ open, message, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-xl
        animate-fade
      "
    >
      <div
        className="
          bg-inknity-background/80 
          border border-inknity-purple/40
          shadow-lg shadow-inknity-purple/20
          rounded-2xl p-6 w-[90%] max-w-sm 
          backdrop-blur-xl
        "
      >
        <h2 className="text-lg font-semibold text-inknity-white mb-2">
          Algo deu errado 💔
        </h2>

        <p className="text-inknity-white/80 text-sm mb-4">
          {message}
        </p>

        <button
          onClick={onClose}
          className="
            w-full py-2 rounded-lg 
            bg-inknity-purple text-white font-medium
            hover:bg-inknity-purple/80 transition
          "
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
