import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-red-500 animate-in slide-in-from-top-1 fade-in duration-200">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
};
