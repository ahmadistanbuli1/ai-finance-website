// "use client";

// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PlusCircle, Sparkles } from "lucide-react";
// import {
//   recordSchema,
//   RecordFormValues,
//   CATEGORIES,
// } from "@/validations/record.schema";
// import { useSuggestCategory } from "@/hooks/useSuggestCategory";
// import { ErrorMessage } from "./ErrorMessage";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useAddRecord } from "@/hooks/useAddRecord";

// const AddNewRecord = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     getValues,
//     setValue,
//     setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm<RecordFormValues>({
//     resolver: zodResolver(recordSchema),
//     defaultValues: {
//       text: "",
//       price: 0,
//       category: "",
//       date: "",
//     },
//   });

//   const { mutateAsync: suggestCategory, isPending: isSuggesting } =
//     useSuggestCategory();
//   const { mutateAsync: addRecord, isPending: isAdding } = useAddRecord();

//   // Handler for AI Suggestion Button
//   const handleAiSuggest = async () => {
//     const currentDescription = getValues("text");

//     if (!currentDescription || currentDescription.trim().length < 3) {
//       setError("text", {
//         message: "Enter a description first to use AI suggestion",
//       });
//       return;
//     }

//     try {
//       clearErrors("category");
//       const suggested = await suggestCategory(currentDescription);
//       setValue("category", suggested, { shouldValidate: true });
//     } catch {
//       setError("category", {
//         message: "AI suggestion failed, please select manually",
//       });
//     }
//   };

//   const onSubmit = async (data: RecordFormValues) => {
//     console.log("Validated Data:", data);
//     try {
//       await addRecord(data);
//       reset(); // Clear form fields only when the record is saved successfully
//     } catch {
//       // Error is already handled and toasted by useAddRecord's onError
//     }
//   };

//   return (
//     <section className="col-span-1 lg:col-span-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 shadow-2xs">
//       <div className="mb-5 border-b border-zinc-100 dark:border-zinc-900 pb-3">
//         <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
//           Add New Record
//         </h2>
//         <p className="text-xs text-zinc-500 mt-0.5">
//           Track your daily expenses and transactions.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Div 1: Description & Date */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1.5">
//             <Label htmlFor="text">Expense Description</Label>
//             <Input
//               id="text"
//               placeholder="e.g. Coffee, Internet Bill"
//               {...register("text")}
//             />
//             <ErrorMessage message={errors.text?.message} />
//           </div>

//           <div className="space-y-1.5">
//             <Label htmlFor="date">Expense Date</Label>
//             <Input id="date" type="date" {...register("date")} />
//             <ErrorMessage message={errors.date?.message} />
//           </div>
//         </div>

//         {/* Div 2: Category (with AI Button) & Amount */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1.5">
//             <div className="flex items-center justify-between">
//               <Label>Category</Label>
//               <button
//                 type="button"
//                 onClick={handleAiSuggest}
//                 disabled={isSuggesting}
//                 className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 cursor-pointer"
//               >
//                 <Sparkles className="w-3 h-3" />
//                 {isSuggesting ? "Thinking..." : "AI Suggest"}
//               </button>
//             </div>

//             <Controller
//               name="category"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   value={field.value}
//                   onValueChange={(val) => field.onChange(val ?? "")}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {CATEGORIES.map((category) => (
//                       <SelectItem key={category} value={category}>
//                         {category}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             <ErrorMessage message={errors.category?.message} />
//           </div>

//           <div className="space-y-1.5">
//             <Label htmlFor="price">Amount ($)</Label>
//             <Input
//               id="price"
//               type="number"
//               step="0.01"
//               placeholder="0.00"
//               {...register("price", { valueAsNumber: true })}
//             />
//             <ErrorMessage message={errors.price?.message} />
//           </div>
//         </div>

//         {/* <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
//           <PlusCircle className="w-4 h-4 mr-2" />
//           {isSubmitting ? "Adding..." : "Add Record"}
//         </Button> */}
//         <Button
//           type="submit"
//           disabled={isAdding}
//           className="w-full mt-2 cursor-pointer"
//         >
//           <PlusCircle className="w-4 h-4 mr-2" />
//           {isAdding ? "Saving..." : "Add Record"}
//         </Button>
//       </form>
//     </section>
//   );
// };

// export default AddNewRecord;

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Sparkles } from "lucide-react";
import {
  recordSchema,
  RecordFormValues,
  CATEGORIES,
} from "@/validations/record.schema";
import { useSuggestCategory } from "@/hooks/useSuggestCategory";
import { useAddRecord } from "@/hooks/useAddRecord";
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

// تاريخ اليوم بتوقيت جهاز المستخدم بصيغة YYYY-MM-DD، مثال: "2026-10-18"
const getToday = (): string => new Date().toLocaleDateString("en-CA");

const AddNewRecord = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    setError,
    setFocus,
    clearErrors,
    formState: { errors },
  } = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      text: "",
      price: 0,
      category: "",
      date: getToday(),
    },
  });

  const { mutateAsync: suggestCategory, isPending: isSuggesting } =
    useSuggestCategory();
  const { mutateAsync: addRecord, isPending: isAdding } = useAddRecord();

  // زر اقتراح التصنيف بالذكاء الاصطناعي
  const handleAiSuggest = async () => {
    const currentDescription = getValues("text");

    if (!currentDescription || currentDescription.trim().length < 3) {
      setError("text", {
        message: "Enter a description first to use AI suggestion",
      });
      setFocus("text"); // ننقل المؤشر لحقل الوصف ليكتب فيه مباشرة
      return;
    }

    try {
      clearErrors("category");
      const suggested = await suggestCategory(currentDescription);
      setValue("category", suggested, { shouldValidate: true });
    } catch {
      setError("category", {
        message: "AI suggestion failed, please select manually",
      });
    }
  };

  const onSubmit = async (data: RecordFormValues) => {
    try {
      await addRecord(data);
      reset(); // نفرّغ الحقول فقط عند نجاح الحفظ
      setFocus("text"); // جاهز لإدخال سجل جديد مباشرة
    } catch {
      // الخطأ يُعرض مسبقًا عبر toast داخل useAddRecord
    }
  };

  return (
    <section className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 shadow-2xs">
      <div className="mb-5 border-b border-zinc-100 dark:border-zinc-900 pb-3">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Add New Record
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Track your daily expenses and transactions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* الصف 1: الوصف والتاريخ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="text">Expense Description</Label>
            <Input
              id="text"
              placeholder="e.g. Coffee, Internet Bill"
              aria-invalid={!!errors.text}
              {...register("text")}
            />
            <ErrorMessage message={errors.text?.message} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="date">Expense Date</Label>
            <Input
              id="date"
              type="date"
              aria-invalid={!!errors.date}
              {...register("date")}
            />
            <ErrorMessage message={errors.date?.message} />
          </div>
        </div>

        {/* الصف 2: التصنيف (مع زر الذكاء الاصطناعي) والمبلغ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="category">Category</Label>
              <button
                type="button"
                onClick={handleAiSuggest}
                disabled={isSuggesting}
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                {isSuggesting ? "Thinking..." : "AI Suggest"}
              </button>
            </div>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val ?? "")}
                >
                  <SelectTrigger
                    id="category"
                    className="w-full"
                    aria-invalid={!!errors.category}
                  >
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

          <div className="space-y-1.5">
            <Label htmlFor="price">Amount ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              aria-invalid={!!errors.price}
              onFocus={(e) => e.target.select()} // يحدد الرقم 0 ليُستبدل مباشرة عند الكتابة
              {...register("price", { valueAsNumber: true })}
            />
            <ErrorMessage message={errors.price?.message} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isAdding}
          className="w-full mt-2 cursor-pointer"
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <PlusCircle className="w-4 h-4 mr-2" />
          )}
          {isAdding ? "Saving..." : "Add Record"}
        </Button>
      </form>
    </section>
  );
};

export default AddNewRecord;
