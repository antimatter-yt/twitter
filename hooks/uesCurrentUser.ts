import fetcher from "@/lib/fetcher";
import useSWR from 'swr';

const useCurrentUser = ()=>{
    const { data, error, isLoading, mutate } = useSWR('api/current', fetcher, {
        shouldRetryOnError: false, // Disable automatic retries on error
    });
     return{
        data, error, isLoading, mutate
    }
}

export default useCurrentUser;