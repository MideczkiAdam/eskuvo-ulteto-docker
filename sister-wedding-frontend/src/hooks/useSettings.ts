import { useQuery } from '@tanstack/react-query';
import { getSettingsEndpoint } from '../services/authEndpoints';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettingsEndpoint,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,    
  });
}