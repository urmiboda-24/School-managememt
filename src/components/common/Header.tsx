import React from "react";
import { Menu, LogOut } from "lucide-react";
import { Logout } from "@/utils/helper";
import CustomButton from "./CustomButton";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <CustomButton onClick={onMenuToggle} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </CustomButton>
          <h1 className="text-xl font-bold text-blue-700">School Management</h1>
        </div>

        <CustomButton onClick={Logout} className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </CustomButton>
      </div>
    </header>
  );
};

export default Header;
