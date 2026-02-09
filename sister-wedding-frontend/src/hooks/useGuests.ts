import { useQuery } from '@tanstack/react-query';
import { getGuestsEndpoint } from '../services/authEndpoints';

export function useGuests() {
  return useQuery({
    queryKey: ['guests'],
    queryFn: getGuestsEndpoint,
    retry: false,
  });
}