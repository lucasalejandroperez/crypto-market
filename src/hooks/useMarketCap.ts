import { useMutation, useQuery, useQueryClient } from "react-query";
import CoinGeckoApi from "../api/coinGeckoApi";
import { ICoinGeckoInterfaces } from '../models/coinGeckoInterfaces';

const key = "marketcap";

export const useMarketCap = ( orderBy:string ) => {
  return useQuery<ICoinGeckoInterfaces[], Error>([key], () => CoinGeckoApi.CoinGecko.markets( orderBy ));
}

export const useMutateMarketData = ( orderBy:string ) => {

  const queryClient = useQueryClient();

  return useMutation(
    newTodo => CoinGeckoApi.CoinGecko.markets( orderBy ),
    {
      // When mutate is called:
      onMutate: async (newTodo: ICoinGeckoInterfaces[]) => {

        //setText('')
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([key]);
        await queryClient.invalidateQueries([key]);

        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData<ICoinGeckoInterfaces[]>([key]);

        // Optimistically update to the new value
        if (previousTodos) {
          queryClient.setQueryData<ICoinGeckoInterfaces[]>([key], newTodo)
        }

        return { previousTodos }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData<ICoinGeckoInterfaces[]>([key], context.previousTodos)
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([key])
      },
    }
  )

}
