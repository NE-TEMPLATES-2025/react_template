import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmployeeService } from "@/services/employee.service";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddEmployeeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nationalId: "",
    department: "",
    position: "",
    laptopManufacturer: "",
    laptopModel: "",
    serialNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const employeeService = EmployeeService.getInstance();
      await employeeService.createEmployee(formData);
      toast.success("Employee added successfully");
      onSuccess();
      onOpenChange(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        nationalId: "",
        department: "",
        position: "",
        laptopManufacturer: "",
        laptopModel: "",
        serialNumber: "",
      });
    } catch (error) {
      toast.error("Failed to add employee");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID</Label>
              <Input
                id="nationalId"
                name="nationalId"
                placeholder="Enter national ID"
                value={formData.nationalId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                placeholder="Enter position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laptopManufacturer">Laptop Manufacturer</Label>
              <Input
                id="laptopManufacturer"
                name="laptopManufacturer"
                placeholder="Enter laptop manufacturer"
                value={formData.laptopManufacturer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="laptopModel">Laptop Model</Label>
              <Input
                id="laptopModel"
                name="laptopModel"
                placeholder="Enter laptop model"
                value={formData.laptopModel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                name="serialNumber"
                placeholder="Enter serial number"
                value={formData.serialNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
