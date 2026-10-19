import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recordService } from "@/services/record.service";
import { RECORDS_QUERY_KEY } from "@/constants/keys";

export const useDeleteRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recordService.deleteRecord(id),

    onSuccess: () => {
      toast.success("Record deleted successfully.");
      // تحديث الجدول والإحصائيات فوراً
      queryClient.invalidateQueries({ queryKey: [RECORDS_QUERY_KEY] });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete record.");
    },
  });
};
