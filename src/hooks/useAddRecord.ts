import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recordService } from "@/services/record.service";
import { RecordFormValues } from "@/validations/record.schema";
import { RECORDS_QUERY_KEY } from "@/constants/keys";


export const useAddRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RecordFormValues) => recordService.addRecord(data),

    onSuccess: () => {
      toast.success("Expense record added successfully!");
      // Automatically refresh any component listening to ["records"] (Chart & Stats)
      queryClient.invalidateQueries({ queryKey: [RECORDS_QUERY_KEY] });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong while saving.");
    },
  });
};
