import React from "react";
import {
  Users,
  Calendar,
  ClipboardList,
  BookOpen,
  Settings,
  Home,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constant";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeSection,
  role,
  onSectionChange,
}) => {
  const user = {
    role: "admin",
    department: "admin",
    name: "Super Admin",
  };

  const navigation = useRouter();
  const pathname = usePathname();

  const getMenuItems = () => {
    switch (role) {
      case "admin":
        return [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: Home,
            url: ROUTES.ADMIN.DASHBOARD,
          },
          {
            id: "departments",
            label: "Departments",
            icon: Settings,
            url: ROUTES.ADMIN.DEPARTMENT,
          },
          {
            id: "subjects",
            label: "Subjects",
            icon: BookOpen,
            url: ROUTES.ADMIN.SUBJECT,
          },
          { id: "users", label: "Users", icon: Users },
          { id: "timetable", label: "Timetable", icon: Calendar },
          { id: "attendance", label: "Attendance", icon: ClipboardList },
        ];
      case "hod":
        return [
          { id: "subjects", label: "Subjects", icon: BookOpen },
          { id: "users", label: "Users", icon: Users },
          { id: "timetable", label: "Timetable", icon: Calendar },
          { id: "attendance", label: "Attendance", icon: ClipboardList },
        ];
      case "teacher":
        return [
          { id: "users", label: "Students", icon: Users },
          { id: "attendance", label: "Attendance", icon: ClipboardList },
        ];
      case "assistant_teacher":
        return [{ id: "attendance", label: "Attendance", icon: ClipboardList }];
      case "student":
        return [
          { id: "student-portal", label: "My Attendance", icon: GraduationCap },
        ];
      default:
        return null;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-full bg-white shadow-lg transition-transform duration-300 z-40",
        // On mobile: show/hide based on isOpen state
        // On desktop (lg): always show, but allow toggle for collapsing
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64"
      )}
    >
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-sm text-gray-600 capitalize">
            {role.replace("_", " ")}
          </p>
          <p className="text-xs text-gray-500">{user?.department}</p>
        </div>

        <nav className="space-y-2">
          {menuItems?.map((item) => (
            <button
              key={item.id}
              onClick={() => navigation.push(item.url || "")}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                pathname === item.url
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
