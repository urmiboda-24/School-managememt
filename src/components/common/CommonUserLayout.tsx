"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// custom componetns
// import Sidebar from "@/components/common/Sidebar";

// Constant
import { ROLE } from "@/utils/constant";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface CommonUserLayoutProps {
  children: ReactNode;
  role:
    | ROLE.Admin
    | ROLE.Students
    | ROLE.Teacher
    | ROLE.HOD
    | ROLE.AssistantTeachers;
}

const CommonUserLayout: React.FC<CommonUserLayoutProps> = ({
  role,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          role={role}
        />

        {/* Main content area with proper spacing for sidebar on desktop */}
        <main className="flex-1 p-6 pt-24 lg:pl-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden opacity-[0.2]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CommonUserLayout;
