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
    if (isLoading) return <p className="font-medium">{loadingLabel}</p>;
  
    if (isError) {
      return (
        <div className="mt-4 space-y-2">
        <p className="text-red-600">{errorLabel}</p>
        <button
          type="button"
          className="underline text-blue-600"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
      );
    }
  
    return null;
  }