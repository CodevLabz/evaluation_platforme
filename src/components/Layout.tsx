'use client'
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, ClipboardList, QrCode, BarChart3, LogOut, Settings, User, Home, Award, Menu, X } from "lucide-react";
import { useAuth } from "src/context/authContext";

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isSidebarOpen: boolean;
};

const SidebarLink = ({
  href,
  icon,
  label,
  isActive,
  isSidebarOpen,
}: SidebarLinkProps) => {
  const iconWithColor = React.cloneElement(icon as React.ReactElement, {
    className: `w-5 h-5 ${isActive ? 'text-blue-900' : 'text-gray-700'}`
  });

  return (
    <Link 
      href={href} 
      className={`flex items-center ${
        isSidebarOpen ? "justify-start space-x-3" : "justify-center"
      } p-3 rounded-lg transition-all duration-200 ${
        isActive ? "bg-blue-100 hover:bg-blue-100" : "hover:bg-blue-50"
      }`}
    >
      {iconWithColor}
      {isSidebarOpen && (
        <span className={`${isActive ? 'text-blue-900' : 'text-gray-700'}`}>{label}</span>
      )}
    </Link>
  );
};

export const Layout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const userRole = user?.role || "admin";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-30"
        } bg-white border-r border-gray-200`}
      >
        <div className="flex flex-col h-full p-4">
          <div className={`flex items-center ${
            isSidebarOpen ? "justify-between" : "justify-center"
          } mb-8`}>
            <img 
              src="https://forumtunisieneducation.org/wp-content/uploads/2023/03/ftte.png" 
              alt="Logo" 
              className={`transition-all duration-300 ${
                isSidebarOpen ? "h-12 w-12" : "h-10 w-10"
              }`}
            />
            {isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <nav className="space-y-2 flex-1">
            <SidebarLink 
              href="/dashboard" 
              icon={<Home size={20} />} 
              label="Dashboard" 
              isActive={pathname === "/dashboard"}
              isSidebarOpen={isSidebarOpen}
            />
            {userRole === "admin" && (
              <>
                <SidebarLink 
                  href="/users" 
                  icon={<Users size={20} />} 
                  label="Users" 
                  isActive={pathname === "/users"}
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink 
                  href="/statistics" 
                  icon={<BarChart3 size={20} />} 
                  label="Statistics" 
                  isActive={pathname === "/statistics"}
                  isSidebarOpen={isSidebarOpen}
                />
              </>
            )}
            {(userRole === "admin" || userRole === "organizer") && (
              <>
                <SidebarLink 
                  href="/participants" 
                  icon={<ClipboardList size={20} />} 
                  label="Participants" 
                  isActive={pathname === "/participants"}
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink 
                  href="/qrCodes" 
                  icon={<QrCode size={20} />} 
                  label="QR Codes" 
                  isActive={pathname === "/qrCodes"}
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarLink 
                  href="/certificates" 
                  icon={<Award size={20} />} 
                  label="Certificates" 
                  isActive={pathname === "/certificates"}
                  isSidebarOpen={isSidebarOpen}
                />
              </>
            )}
            {userRole === "staff" && (
              <SidebarLink 
                href="/scan" 
                icon={<QrCode size={20} />} 
                label="Scan QR" 
                isActive={pathname === "/scan"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
          </nav>
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            <SidebarLink 
              href="/profile" 
              icon={<User size={20} />} 
              label="Profile" 
              isActive={pathname === "/profile"}
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarLink 
              href="/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
              isActive={pathname === "/settings"}
              isSidebarOpen={isSidebarOpen}
            />
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                isSidebarOpen ? "justify-start space-x-3" : "justify-center"
              } p-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full`}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 mr-4"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Event Management Platform
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

/*
'use client'
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, ClipboardList, QrCode, BarChart3, LogOut, Settings, User, Home, Award, Menu, X } from "lucide-react";
import { useAuth } from "src/context/authContext";
import { usePermissions } from "src/hooks/usePermissions";

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isSidebarOpen: boolean;
};

const SidebarLink = ({
  href,
  icon,
  label,
  isActive,
  isSidebarOpen,
}: SidebarLinkProps) => {
  const iconWithColor = React.cloneElement(icon as React.ReactElement, {
    className: `w-5 h-5 ${isActive ? 'text-blue-900' : 'text-gray-700'}`
  });

  return (
    <Link 
      href={href} 
      className={`flex items-center ${
        isSidebarOpen ? "justify-start space-x-3" : "justify-center"
      } p-3 rounded-lg transition-all duration-200 ${
        isActive ? "bg-blue-100 hover:bg-blue-100" : "hover:bg-blue-50"
      }`}
    >
      {iconWithColor}
      {isSidebarOpen && (
        <span className={`${isActive ? 'text-blue-900' : 'text-gray-700'}`}>{label}</span>
      )}
    </Link>
  );
};

export const Layout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const userRole = user?.role || "admin";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { checkPermission } = usePermissions();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-30"
        } bg-white border-r border-gray-200`}
      >
        <div className="flex flex-col h-full p-4">
          <div className={`flex items-center ${
            isSidebarOpen ? "justify-between" : "justify-center"
          } mb-8`}>
            <img 
              src="https://forumtunisieneducation.org/wp-content/uploads/2023/03/ftte.png" 
              alt="Logo" 
              className={`transition-all duration-300 ${
                isSidebarOpen ? "h-12 w-12" : "h-10 w-10"
              }`}
            />
            {isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <nav className="space-y-2 flex-1">
            <SidebarLink 
              href="/dashboard" 
              icon={<Home size={20} />} 
              label="Dashboard" 
              isActive={pathname === "/dashboard"}
              isSidebarOpen={isSidebarOpen}
            />
            {checkPermission('manage_users') && (
              <SidebarLink 
                href="/users" 
                icon={<Users size={20} />} 
                label="Users" 
                isActive={pathname === "/users"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
            {checkPermission('view_statistics') && (
              <SidebarLink 
                href="/statistics" 
                icon={<BarChart3 size={20} />} 
                label="Statistics" 
                isActive={pathname === "/statistics"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
            {checkPermission('manage_participants') && (
              <SidebarLink 
                href="/participants" 
                icon={<ClipboardList size={20} />} 
                label="Participants" 
                isActive={pathname === "/participants"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
            {checkPermission('manage_qr_codes') && (
              <SidebarLink 
                href="/qrCodes" 
                icon={<QrCode size={20} />} 
                label="QR Codes" 
                isActive={pathname === "/qrCodes"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
            {checkPermission('manage_certificates') && (
              <SidebarLink 
                href="/certificates" 
                icon={<Award size={20} />} 
                label="Certificates" 
                isActive={pathname === "/certificates"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
            {checkPermission('scan_qr') && (
              <SidebarLink 
                href="/scan" 
                icon={<QrCode size={20} />} 
                label="Scan QR" 
                isActive={pathname === "/scan"}
                isSidebarOpen={isSidebarOpen}
              />
            )}
          </nav>
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            <SidebarLink 
              href="/profile" 
              icon={<User size={20} />} 
              label="Profile" 
              isActive={pathname === "/profile"}
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarLink 
              href="/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
              isActive={pathname === "/settings"}
              isSidebarOpen={isSidebarOpen}
            />
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                isSidebarOpen ? "justify-start space-x-3" : "justify-center"
              } p-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full`}
            >
              <LogOut size={20} />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 mr-4"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Event Management Platform
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};




*/
