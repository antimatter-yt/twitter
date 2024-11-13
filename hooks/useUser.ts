import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `api/users/${userId}` : null,
    fetcher,
    {
      shouldRetryOnError: false, // Disable automatic retries on error
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
