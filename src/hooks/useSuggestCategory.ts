import { useMutation } from "@tanstack/react-query";
import { recordService } from "@/services/record.service";

export const useSuggestCategory = () => {
  return useMutation({
    mutationFn: (description: string) =>
      recordService.suggestCategory(description),
  });
};
