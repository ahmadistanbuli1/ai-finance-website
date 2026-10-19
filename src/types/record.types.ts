export interface ExpenseRecord {
  id: string;
  text: string;
  price: number;
  category: string;
  date: string | Date;
  userId: string | null;
  createdAt: string | Date;
}

export interface AddExpenseResponse {
  record: ExpenseRecord;
}

export interface GetRecordsResponse {
  records: ExpenseRecord[];
}
