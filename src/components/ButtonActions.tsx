// src/components/ButtonActions.tsx
"use client";

import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteRecord } from "@/hooks/useDeleteRecord";
import { ExpenseRecord } from "@/types/record.types";
import { EditRecordDialog } from "./EditRecordDialog";

interface ButtonActionsProps {
  // Pass the entire record object to easily feed the edit modal
  record: ExpenseRecord;
}

export const ButtonActions = ({ record }: ButtonActionsProps) => {
  const { mutate: deleteRecord, isPending: isDeleting } = useDeleteRecord();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        {/* زر التعديل */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditModalOpen(true)}
          className="h-8 w-8 text-zinc-500 hover:text-indigo-600 transition-colors"
        >
          <Edit className="w-4 h-4" />
        </Button>

        {/* زر الحذف */}
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          onClick={() => deleteRecord(record.id)}
          className="h-8 w-8 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
        >
          {isDeleting ? (
            <span className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* نافذة التعديل المنبثقة */}
      <EditRecordDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        record={record}
      />
    </>
  );
};
