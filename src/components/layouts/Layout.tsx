import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import {Menu} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: DashboardLayoutProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const[issidebarOpen,setIsSidebarOpen]=useState(false)
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/auth/login");
  };
  

  return (
    <div className=" h-screen bg-background md:px-4">

      {/* Top mobile bar */}
      <div className="md:hidden w-full flex justify-between ">
        <p className="text-lg font-semibold">Dashboard</p>
        <Menu onClick={()=>setIsSidebarOpen((prev)=>!prev)} className="cursor-pointer" size={20}/>
      </div>
      <div className="flex w-full">
        {/* Mobile Sidebar */}
        <aside className={`md:hidden fixed inset-0 z-50 transform bg-black bg-opacity-80 transition-transform duration-300 w-60 h-full flex flex-col justify-between  ${issidebarOpen ? "translate-x-0": "-translate-x-full"}`}>
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4"/>
            Home
          </Link>
          <Link
            to="/dashboard/employees"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="h-4 w-4" />
            Employees
          </Link>
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        {/* User info */}
        {user && (
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.firstName[0].toUpperCase()} 
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{user.firstName[0].toUpperCase()} {user.lastName[0].toUpperCase()}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        </aside>

{/* Desktop view */}
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-[15%]  flex-col border-r">


        <div className="flex h-14 items-center border-b px-4">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4"/>
            Home
          </Link>
          <Link
            to="/dashboard/employees"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="h-4 w-4" />
            Employees
          </Link>
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        {/* User info */}
        {user && (
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.firstName[0].toUpperCase()} 
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{user.firstName[0].toUpperCase()} {user.lastName[0].toUpperCase()}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto sm:w-full md:w-[85%] z-10">
        <div className="container py-6">{children}</div>
      </main>
      </div>

      {/* Logout confirmation dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You'll need to login again to
              access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >

              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              variant="default"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
