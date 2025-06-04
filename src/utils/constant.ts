export const ROUTES = {
  LOGIN: "/login",
  HOME: "/",
  SIGN_UP: "/signup",
  FAQs: "/faq",
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    DEPARTMENT: "/admin/department",
    SUBJECT: "/admin/subject",
  },
  HOD: {
    DASHBOARD: "/hod/dashboard",
    SUBJECT: "/admin/subject",
  },
  TEACHER: {
    DASHBOARD: "/teacher/dashboard",
    USER: "teacher/user",
  },
  ASSISTANTTEACHER: {
    DASHBOARD: "/assistantTeacher/dashboard",
    USER: "assistantTeacher/user",
  },
  STUDENT: {
    DASHBOARD: "/student/dashboard",
  },
};

export const API_ROUTES = {
  ADMIN: {
    FEEDBACK_DETAILS: "/dashboard/analytics/feedback-details",
  },
  AUTH: {
    LOGIN: `/login`,
  },
};

export enum ROLE {
  Admin = "admin",
  Teacher = "teacher",
  HOD = "hod",
  Students = "students",
  AssistantTeachers = "AssistantTeachers ",
}

export const USER_HEADER_ITEMS = [
  { id: 1, title: "Home", route: "" },
  { id: 2, title: "Events", route: "" },
  { id: 3, title: "Contact Us", route: "" },
  { id: 4, title: "FAQs", route: "" },
];

export const LOG_IN_IMAGE_BANNER_LINK =
  "https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?semt=ais_hybrid&w=740";

export const PAGINATION_OPTIONS = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];
export type Column<T> = {
  header: string | React.ReactNode;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
  sortKey?: (row: T) => string | number;
  isSortable?: boolean;
};

export type Action<T> = {
  icon: React.ReactNode;
  onClick: (row: T) => void;
  tooltip?: string;
  disabled?: (row: T) => boolean;
};
export type DataTable<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  loading?: boolean;
  showSerialNumber?: boolean;
};

export interface IRequestType {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  __v: number;
}

export interface IRequestResponse {
  success: boolean;
  data: IRequestType[];
}
