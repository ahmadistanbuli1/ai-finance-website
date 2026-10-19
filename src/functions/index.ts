// Shared helper: sends the request, parses JSON, and throws a clear error
export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  // If the server returns a non-JSON body (like an HTML 500 page), use {}
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data as T;
}

// Shared headers for requests that send a JSON body
export const jsonHeaders = { "Content-Type": "application/json" };
