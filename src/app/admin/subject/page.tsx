"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/common/Card";
import { DialogHeader } from "@/components/common/Dialog";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/common/table";
import { IDepartment, ISubject, ITableSubjectAttr } from "@/utils/types/admin";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import FormikTextField from "@/components/common/FormikTextField";
import FormikSelectField from "@/components/common/FormikSelectField";
import { Formik } from "formik";

const mockDepartments: IDepartment[] = [
  {
    id: "1",
    name: "Computer Engineering",
    createdAt: "2024-01-01",
    duration: 4,
  },
  {
    id: "2",
    name: "Mechanical Engineering",
    createdAt: "2024-01-01",
    duration: 4,
  },
  {
    id: "3",
    name: "Electrical Engineering",
    createdAt: "2024-01-01",
    duration: 4,
  },
];

const mockSubjects: ITableSubjectAttr[] = [
  {
    id: 1,
    name: "Database Management System",
    departmentId: 1,
    duration: 4,
  },
  {
    id: 2,
    name: "Data Structures",
    departmentId: 1,
    duration: 4,
  },
  {
    id: 3,
    name: "Computer Networks",
    departmentId: 1,
    duration: 4,
  },
  {
    id: 4,
    name: "Thermodynamics",
    departmentId: 1,
    duration: 4,
  },
];

const AdminSubjectPage: React.FC = () => {
  const [subjects, setSubjects] = useState<ITableSubjectAttr[]>(mockSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<ISubject | null>(null);
  const [formData, setFormData] = useState<ISubject>({
    name: "",
    departmentId: null,
  });

  const resetForm = () => {
    setFormData({ name: "", departmentId: null });
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
    //   const newSubject: ISubject = {
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
    setFormData({
      name: subject.name,
      departmentId: subject.departmentId,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
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
              <Formik
                initialValues={formData}
                enableReinitialize
                onSubmit={(values) => {
                  // handle form submit logic
                }}
              >
                {({ handleSubmit, getFieldProps }) => (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <FormikTextField
                      label="Subject Name"
                      placeholder="Enter subject name"
                      {...getFieldProps("name")}
                    />

                    <FormikSelectField
                      label="Department"
                      {...getFieldProps("departmentId")}
                      options={mockDepartments.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />

                    <Button type="submit" className="w-full">
                      {editingSubject ? "Update Subject" : "Add Subject"}
                    </Button>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.departmentId}</TableCell>
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
                        onClick={() => handleDelete(subject.id)}
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

export default AdminSubjectPage;
