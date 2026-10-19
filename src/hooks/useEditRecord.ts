// src/hooks/useEditRecord.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recordService } from "@/services/record.service";
import { RecordFormValues } from "@/validations/record.schema";
import { RECORDS_QUERY_KEY } from "@/constants/keys";

export const useEditRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RecordFormValues }) =>
      recordService.updateRecord(id, data),

    onSuccess: () => {
      toast.success("Record updated successfully!");
      // This will instantly refresh the table and charts
      queryClient.invalidateQueries({ queryKey: [RECORDS_QUERY_KEY] });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong while updating.");
    },
  });
};
