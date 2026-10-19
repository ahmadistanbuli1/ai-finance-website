"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";

import {
  recordSchema,
  RecordFormValues,
  CATEGORIES,
} from "@/validations/record.schema";
import { ExpenseRecord } from "@/types/record.types";
import { useEditRecord } from "@/hooks/useEditRecord";
import { ErrorMessage } from "./ErrorMessage";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditRecordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExpenseRecord;
}

export const EditRecordDialog = ({
  isOpen,
  onClose,
  record,
}: EditRecordDialogProps) => {
  const { mutateAsync: updateRecord, isPending: isUpdating } = useEditRecord();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    // Pre-fill the form with existing record data
    defaultValues: {
      text: record.text,
      price: record.price,
      category: record.category,
      // Format the date to YYYY-MM-DD for the date input
      date: new Date(record.date).toISOString().split("T")[0],
    },
  });

  // Reset form when the record changes (e.g., opening a different record)
  useEffect(() => {
    reset({
      text: record.text,
      price: record.price,
      category: record.category,
      date: new Date(record.date).toISOString().split("T")[0],
    });
  }, [record, reset]);

  const onSubmit = async (data: RecordFormValues) => {
    try {
      await updateRecord({ id: record.id, data });
      onClose(); // Close the modal upon success
      reset();
    } catch {
      // Error handled by useEditRecord's onError toast
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800/80">
        <DialogHeader>
          <DialogTitle>Edit Record</DialogTitle>
          <DialogDescription>
            Update the details of your transaction.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="editText">Expense Description</Label>
            <Input id="editText" {...register("text")} />
            <ErrorMessage message={errors.text?.message} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="editDate">Date</Label>
              <Input id="editDate" type="date" {...register("date")} />
              <ErrorMessage message={errors.date?.message} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="editPrice">Amount ($)</Label>
              <Input
                id="editPrice"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
              />
              <ErrorMessage message={errors.price?.message} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <ErrorMessage message={errors.category?.message} />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} className="gap-2">
              {isUpdating ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
