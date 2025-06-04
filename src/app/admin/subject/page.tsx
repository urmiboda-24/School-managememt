"use client";

// import React, { useState } from "react";
// import { Plus, EditIcon, TrashIcon } from "lucide-react";
// import { Button } from "@/components/common/Button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/common/Card";
// import { DialogHeader } from "@/components/common/Dialog";
// import { IDepartment, ISubject, ITableSubjectAttr } from "@/utils/types/admin";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
// } from "@radix-ui/react-dialog";
// import FormikTextField from "@/components/common/FormikTextField";
// import FormikSelectField from "@/components/common/FormikSelectField";
// import { Formik } from "formik";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/common/Table";
// import { DynamicTable } from "@/components/common/DaynamicTable";
// import { DEFAULT_PAGINATION } from "@/utils/constant";

// const mockDepartments: IDepartment[] = [
//   {
//     id: "1",
//     name: "Computer Engineering",
//     createdAt: "2024-01-01",
//     duration: 4,
//   },
//   {
//     id: "2",
//     name: "Mechanical Engineering",
//     createdAt: "2024-01-01",
//     duration: 4,
//   },
//   {
//     id: "3",
//     name: "Electrical Engineering",
//     createdAt: "2024-01-01",
//     duration: 4,
//   },
// ];

// const mockSubjects: ITableSubjectAttr[] = [
//   {
//     id: 1,
//     name: "Database Management System",
//     departmentId: 1,
//     duration: 4,
//   },
//   {
//     id: 2,
//     name: "Data Structures",
//     departmentId: 1,
//     duration: 4,
//   },
//   {
//     id: 3,
//     name: "Computer Networks",
//     departmentId: 1,
//     duration: 4,
//   },
//   {
//     id: 4,
//     name: "Thermodynamics",
//     departmentId: 1,
//     duration: 4,
//   },
// ];

// const AdminSubjectPage: React.FC = () => {
//   const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
//   const [sortKey, setSortKey] = useState<keyof ISubject | "">("");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [subjects, setSubjects] = useState<ITableSubjectAttr[]>(mockSubjects);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingSubject, setEditingSubject] = useState<ISubject | null>(null);
//   const [formData, setFormData] = useState<ISubject>({
//     name: "",
//     departmentId: null,
//   });

//   const resetForm = () => {
//     setFormData({ name: "", departmentId: null });
//     setEditingSubject(null);
//   };

//   const handleSort = (key: keyof ISubject) => {
//     const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
//     setSortKey(key);
//     setSortOrder(newOrder);
//   };

//   const handlePageChange = (page: number) => {
//     setPagination((prev) => ({ ...prev, page }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // if (editingSubject) {
//     //   setSubjects(
//     //     subjects.map((s) =>
//     //       s.id === editingSubject.id ? { ...editingSubject, ...formData } : s
//     //     )
//     //   );
//     // } else {
//     //   const newSubject: ISubject = {
//     //     id: Date.now().toString(),
//     //     ...formData,
//     //   };
//     //   setSubjects([...subjects, newSubject]);
//     // }
//     setIsDialogOpen(false);
//     resetForm();
//   };

//   const handleEdit = (subject: ISubject) => {
//     setEditingSubject(subject);
//     setFormData({
//       name: subject.name,
//       departmentId: subject.departmentId,
//     });
//     setIsDialogOpen(true);
//   };

//   const handleDelete = (id: number) => {
//     setSubjects(subjects.filter((s) => s.id !== id));
//   };

//   const getDepartmentName = (departmentId: string) => {
//     return (
//       mockDepartments.find((d) => d.id === departmentId)?.name || "Unknown"
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Subject Management</CardTitle>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={resetForm}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Subject
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {editingSubject ? "Edit Subject" : "Add New Subject"}
//                 </DialogTitle>
//               </DialogHeader>
//               <Formik
//                 initialValues={formData}
//                 enableReinitialize
//                 onSubmit={(values) => {
//                   // handle form submit logic
//                 }}
//               >
//                 {({ handleSubmit, getFieldProps }) => (
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <FormikTextField
//                       label="Subject Name"
//                       placeholder="Enter subject name"
//                       {...getFieldProps("name")}
//                     />

//                     <FormikSelectField
//                       label="Department"
//                       {...getFieldProps("departmentId")}
//                       options={mockDepartments.map((d) => ({
//                         label: d.name,
//                         value: d.id,
//                       }))}
//                     />

//                     <Button type="submit" className="w-full">
//                       {editingSubject ? "Update Subject" : "Add Subject"}
//                     </Button>
//                   </form>
//                 )}
//               </Formik>
//             </DialogContent>
//           </Dialog>
//         </CardHeader>
//         <CardContent>
//           <DynamicTable
//             data={subjects}
//             totalPages={pagination.totalPages}
//             currentPage={pagination.page}
//             sortKey={sortKey}
//             sortOrder={sortOrder}
//             onSort={() => handleSort}
//             handlePageChange={handlePageChange}
//             columns={[{ key: "name", label: "Name", sortable: true }]}
//             actions={(row) => (
//               <div className="flex items-center justify-end gap-x-3">
//                 <button
//                   className="hover:text-primary"
//                   // onClick={() => handleEdit(row.id)}
//                 >
//                   <EditIcon />
//                 </button>
//                 <button
//                   className="hover:text-primary"
//                   // onClick={() => openDeleteConfirmation(row.id)}
//                 >
//                   <TrashIcon />
//                 </button>
//               </div>
//             )}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminSubjectPage;

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { IDepartment, ISubject, ITableSubjectAttr } from "@/utils/types/admin";

const mockDepartments: IDepartment[] = [
  {
    id: "1",
    name: "Computer Engineering",
    duration: 4,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Mechanical Engineering",
    duration: 4,
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Electrical Engineering",
    duration: 4,
    createdAt: "2024-01-01",
  },
];

const mockSubjects: ITableSubjectAttr[] = [
  {
    id: 1,
    name: "Database Management System",
    duration: 4,
    departmentId: 1,
  },
  {
    id: 2,
    name: "Data Structures",
    duration: 4,
    departmentId: 1,
  },
];

const SubjectManager: React.FC = () => {
  const [subjects, setSubjects] = useState<ITableSubjectAttr[]>(mockSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<ISubject | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    departmentId: "",
    year: 1 as 1 | 2 | 3 | 4,
    credits: 0,
  });

  const resetForm = () => {
    setFormData({ name: "", code: "", departmentId: "", year: 1, credits: 0 });
    setEditingSubject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (editingSubject) {
    //   setSubjects(
    //     subjects.map((s) =>
    //       s.id === editingSubject.id ? { ...editingSubject, ...formData } : s
    //     )
    //   );
    // } else {
    //   const newSubject: Subject = {
    //     id: Date.now().toString(),
    //     ...formData,
    //   };
    //   setSubjects([...subjects, newSubject]);
    // }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (subject: ISubject) => {
    setEditingSubject(subject);
    // setFormData({
    //   name: subject.name,
    //   departmentId: subject.departmentId,

    // });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // setSubjects(subjects.filter((s) => s.id !== id));
  };

  const getDepartmentName = (departmentId: string) => {
    return (
      mockDepartments.find((d) => d.id === departmentId)?.name || "Unknown"
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subject Management</CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSubject ? "Edit Subject" : "Add New Subject"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Subject Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code">Subject Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.departmentId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, departmentId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select
                    value={formData.year.toString()}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        year: parseInt(value) as 1 | 2 | 3 | 4,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        credits: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingSubject ? "Update Subject" : "Add Subject"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.departmentId}</TableCell>
                  <TableCell>{subject.duration}</TableCell>

                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(subject)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(subject.id.toString())}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectManager;
