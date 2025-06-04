export interface IDepartment {
  id: string;
  name: string;
  duration: number | null;
  createdAt: string;
}

export interface ISubject {
  name: string;
  departmentId: number | null;
}

export interface ITableSubjectAttr {
  id: number;
  name: string;
  departmentId: number;
  duration: number;
}
