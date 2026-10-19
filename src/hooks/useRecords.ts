import { useQuery } from "@tanstack/react-query";
import { recordService } from "@/services/record.service";
import { RECORDS_QUERY_KEY } from "@/constants/keys";

export const useRecords = () => {
  return useQuery({
    queryKey: [RECORDS_QUERY_KEY],
    queryFn: recordService.getRecords,
  });
};
