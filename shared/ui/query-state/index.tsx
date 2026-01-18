import { RiAlertLine } from "react-icons/ri";
import Loader from "../loader";

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  loadingLabel?: string;
  errorLabel?: string;
};

export default function QueryState({
  isLoading,
  isError,
  onRetry,
  loadingLabel = "Loading...",
  errorLabel = "Something went wrong",
}: QueryStateProps) {
  if (isLoading) return <Loader className="py-8" title={loadingLabel} />;

  if (isError) {
    return (
      <div className="flex gap-3 mt-4 p-4 rounded-md bg-red-900/20 border border-red-800/50">
        <RiAlertLine className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-400 font-medium">{errorLabel}</p>
          <button
            type="button"
            className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 transition-colors rounded text-sm font-medium text-white"
            onClick={onRetry}
            aria-label="Retry loading"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
