// import {
//   AddExpenseResponse,
//   ExpenseRecord,
//   GetRecordsResponse,
// } from "@/types/record.types";
// import { RecordFormValues } from "@/validations/record.schema";

// export const recordService = {
//   suggestCategory: async (description: string): Promise<string> => {
//     const response = await fetch("/api/suggest-category", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ description }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch category suggestion");
//     }

//     const data: { category: string } = await response.json();
//     return data.category;
//   },

//   addRecord: async (payload: RecordFormValues): Promise<AddExpenseResponse> => {
//     const response = await fetch("/api/records", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to add expense record");
//     }

//     return data;
//   },

//   getRecords: async (): Promise<ExpenseRecord[]> => {
//     const response = await fetch("/api/records", {
//       method: "GET",
//     });

//     const data: GetRecordsResponse & { error?: string } = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to fetch expense records");
//     }

//     return data.records;
//   },

//   deleteRecord: async (id: string): Promise<{ message: string }> => {
//     // إرسال الـ ID في الرابط بدلاً من الـ body
//     const response = await fetch(`/api/records?id=${id}`, {
//       method: "DELETE",
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to delete expense record");
//     }

//     return data;
//   },

//   updateRecord: async (
//     id: string,
//     payload: RecordFormValues,
//   ): Promise<AddExpenseResponse> => {
//     const response = await fetch(`/api/records?id=${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to update expense record");
//     }

//     return data;
//   },
// };

import {
  AddExpenseResponse,
  ExpenseRecord,
  GetRecordsResponse,
} from "@/types/record.types";
import { RecordFormValues } from "@/validations/record.schema";
import { request, jsonHeaders } from "@/functions";

const BASE_URL = "/api/records";

export const recordService = {
  suggestCategory: async (description: string): Promise<string> => {
    const data = await request<{ category: string }>("/api/suggest-category", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ description }),
    });
    return data.category;
  },

  addRecord: (payload: RecordFormValues): Promise<AddExpenseResponse> =>
    request<AddExpenseResponse>(BASE_URL, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    }),

  getRecords: async (): Promise<ExpenseRecord[]> => {
    const data = await request<GetRecordsResponse>(BASE_URL);
    return data.records;
  },

  deleteRecord: (id: string): Promise<{ message: string }> =>
    request<{ message: string }>(`${BASE_URL}?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),

  updateRecord: (
    id: string,
    payload: RecordFormValues,
  ): Promise<AddExpenseResponse> =>
    request<AddExpenseResponse>(`${BASE_URL}?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    }),
};
