import fetcher from "@/lib/fetcher";
import useSWR from 'swr';

const useUsers = ()=>{
    const { data, error, isLoading, mutate } = useSWR('api/users', fetcher, {
        shouldRetryOnError: false, // Disable automatic retries on error
    });
     return{
        data, error, isLoading, mutate
    }
}

export default useUsers;