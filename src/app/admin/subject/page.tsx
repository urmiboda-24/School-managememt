// src/pages/admin/subjects/index.tsx (for Pages Router)
// OR src/app/admin/subjects/page.tsx (for App Router)
"use client";

import React, { useState, useEffect } from "react";
import { Plus, PencilIcon, Trash2Icon } from "lucide-react"; // Import PencilIcon and Trash2Icon for DataTable
import { Button } from "@/components/common/Button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card"; // Not directly used in this AdminSubjectPage, but keep if used elsewhere
import { DialogHeader } from "@/components/common/Dialog";
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
import { CommonTable } from "@/components/common/DtataTable";
// import CommonDataTable from "@/components/common/DtataTable";

// Mock Data (as provided by you)
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
  {
    id: 5,
    name: "Operating Systems",
    departmentId: 1,
    duration: 3,
  },
  {
    id: 6,
    name: "Fluid Mechanics",
    departmentId: 2,
    duration: 4,
  },
  {
    id: 7,
    name: "Digital Electronics",
    departmentId: 3,
    duration: 3,
  },
  {
    id: 8,
    name: "Thermodynamics",
    departmentId: 1,
    duration: 4,
  },
  {
    id: 9,
    name: "Operating Systems",
    departmentId: 1,
    duration: 3,
  },
  {
    id: 10,
    name: "Fluid Mechanics",
    departmentId: 2,
    duration: 4,
  },
  {
    id: 11,
    name: "Fluid Mechanics",
    departmentId: 2,
    duration: 4,
  },
];

const columns = [
  { header: "Product Name", accessor: "productName" },
  { header: "Color", accessor: "color" },
  { header: "Category", accessor: "category" },
  { header: "Price", accessor: "price" },
  {
    header: "Action",
    accessor: "action",
    render: (row: any) => (
      <a href="#" className="font-medium text-blue-600 hover:underline">
        Edit
      </a>
    ),
  },
];

const data = [
  {
    productName: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    productName: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
  {
    productName: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    price: "$99",
  },
  {
    productName: "Apple Watch",
    color: "Black",
    category: "Watches",
    price: "$199",
  },
  {
    productName: "Apple iMac",
    color: "Silver",
    category: "PC",
    price: "$2999",
  },
  {
    productName: "Apple AirPods",
    color: "White",
    category: "Accessories",
    price: "$399",
  },
  { productName: "iPad Pro", color: "Gold", category: "Tablet", price: "$699" },
  {
    productName: "Magic Keyboard",
    color: "Black",
    category: "Accessories",
    price: "$99",
  },
  {
    productName: "Smart Folio iPad Air",
    color: "Blue",
    category: "Accessories",
    price: "$79",
  },
  {
    productName: "AirTag",
    color: "Silver",
    category: "Accessories",
    price: "$29",
  },
];
const AdminSubjectPage: React.FC = () => {
  const [allSubjects, setAllSubjects] =
    useState<ITableSubjectAttr[]>(mockSubjects); // Store all subjects
  const [displaySubjects, setDisplaySubjects] = useState<any[]>([]); // Subjects currently displayed in the table
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<ISubject | null>(null);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortField, setSortField] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<
    "asc" | "desc" | null
  >(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 1;

  const [formData, setFormData] = useState<ISubject>(() => ({
    name: editingSubject ? editingSubject.name : "",
    departmentId: editingSubject ? editingSubject.departmentId : null,
  }));

  // Update formData when editingSubject changes
  useEffect(() => {
    if (editingSubject) {
      setFormData({
        name: editingSubject.name,
        departmentId: editingSubject.departmentId,
      });
    } else {
      setFormData({ name: "", departmentId: null });
    }
  }, [editingSubject]);

  const resetForm = () => {
    setFormData({ name: "", departmentId: null });
    setEditingSubject(null);
  };

  const getDepartmentName = (departmentId: number) => {
    // departmentId is number in mockSubjects
    return (
      mockDepartments.find((d) => parseInt(d.id) === departmentId)?.name ||
      "Unknown"
    );
  };

  const handleFormSubmit = (values: ISubject) => {
    // if (editingSubject) {
    //   // Logic for updating an existing subject
    //   setAllSubjects(
    //     allSubjects.map((s) =>
    //       s.id === editingSubject.id
    //         ? {
    //             ...s,
    //             name: values.name,
    //             departmentId: values.departmentId as number,
    //           }
    //         : s
    //     )
    //   );
    // } else {
    //   // Logic for adding a new subject
    //   const newId = Math.max(...allSubjects.map((s) => s.id)) + 1; // Simple ID generation
    //   const newSubject: ITableSubjectAttr = {
    //     id: newId,
    //     name: values.name,
    //     departmentId: values.departmentId as number,
    //     duration: 4, // Default duration, adjust as needed
    //   };
    //   setAllSubjects([...allSubjects, newSubject]);
    // }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <>
      {" "}
      {/* Pass activePath to highlight current link */}
      <div className="space-y-6">
        {/* Header with Title and Add Button */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">
            Subject Management
          </h2>
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
                onSubmit={handleFormSubmit}
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
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <CommonTable
            columns={columns}
            data={data}
            pageSize={pageSize}
            currentPage={page}
            sortField={sortField || undefined}
            sortDirection={sortDirection || undefined}
            searchTerm={searchTerm}
            onSearch={(term) => {
              setSearchTerm(term);
              setPage(1);
            }}
            onSort={(field, direction) => {
              setSortField(field || null);
              setSortDirection(direction);
            }}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </>
  );
};

export default AdminSubjectPage;
