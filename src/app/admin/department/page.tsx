"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/common/Card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "@/components/common/Dialog";
import FormikTextField from "@/components/common/FormikTextField";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { IDepartment } from "@/utils/types/admin";
import { DepartmentSchema } from "@/utils/helper/schema";
import { Button } from "@/components/common/Button";

const AdminDepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([
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
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);

  const initialValues: IDepartment = {
    name: editingDepartment?.name || "",
    id: "",
    createdAt: new Date().toString(),
    duration: editingDepartment?.duration || null,
  };

  const handleSubmit = (
    values: IDepartment,
    { resetForm }: FormikHelpers<IDepartment>
  ) => {
    if (editingDepartment) {
      setDepartments((prev) =>
        prev.map((dep) =>
          dep.id === editingDepartment.id ? { ...dep, name: values.name } : dep
        )
      );
    } else {
      const newDepartment: IDepartment = {
        id: Date.now().toString(),
        name: values.name,
        createdAt: new Date().toISOString(),
        duration: values.duration,
      };
      setDepartments((prev) => [...prev, newDepartment]);
    }

    resetForm();
    setEditingDepartment(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (department: IDepartment) => {
    setEditingDepartment(department);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments((prev) => prev.filter((dep) => dep.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Departments</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingDepartment(null);
                // setFormData({ name: "", code: "" });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingDepartment ? "Edit Department" : "Add New Department"}
              </DialogTitle>
            </DialogHeader>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={DepartmentSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form className="space-y-4">
                  <FormikTextField
                    name="name"
                    label="Department Name"
                    placeholder="Enter your department name"
                    type="text"
                  />

                  <FormikTextField
                    name="duration"
                    label="Duration"
                    placeholder="Enter Duration"
                    type="number"
                  />

                  <Button type="submit" className="w-full">
                    {editingDepartment ? "Update" : "Create"} Department
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card
            key={department.id}
            className="transition-transform hover:scale-105"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center gap-2">
                <span className="text-[18px]">{department.name}</span>

                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(department)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(department.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Created: {new Date(department.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDepartmentPage;
