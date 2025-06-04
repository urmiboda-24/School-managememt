export type TRequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IRequestParams {
  endPoint: string;
  method: TRequestMethod;
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  withToken?: boolean; // optional flag
  isFormData?: boolean;
}
