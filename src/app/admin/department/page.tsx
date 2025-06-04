"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash } from "lucide-react";
import { IDepartment } from "@/utils/types/admin";

const DepartmentManager: React.FC = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([
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
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);
  const [formData, setFormData] = useState({ name: "", duration: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (editingDepartment) {
    //   setDepartments((deps) =>
    //     deps.map((dep) =>
    //       dep.id === editingDepartment.id ? { ...dep, ...formData } : dep
    //     )
    //   );
    // } else {
    //   const newDepartment: IDepartment = {
    //     id: Date.now().toString(),
    //     name: formData.name,
    //     duration: formData.,
    //     createdAt: new Date().toISOString(),
    //   };
    //   setDepartments((deps) => [...deps, newDepartment]);
    // }
    // setFormData({ name: "", code: "" });
    setEditingDepartment(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (department: IDepartment) => {
    setEditingDepartment(department);
    setFormData({ name: department.name, duration: department.duration || 0 });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments((deps) => deps.filter((dep) => dep.id !== id));
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
                setFormData({ name: "", duration: 0 });
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                placeholder="Department Code"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: +e.target.value })
                }
                required
              />
              <Button type="submit" className="w-full">
                {editingDepartment ? "Update" : "Create"} Department
              </Button>
            </form>
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
              <CardTitle className="flex justify-between items-center">
                <span>{department.name}</span>

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
                Code: {department.duration}
              </p>
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

export default DepartmentManager;
