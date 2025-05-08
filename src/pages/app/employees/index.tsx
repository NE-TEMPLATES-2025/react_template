import { useEffect, useState } from "react";
import { Layout } from "@/components/layouts/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee, EmployeeFilters } from "@/types/employee";
import { EmployeeService } from "@/services/employee.service";
import { Loader } from "@/components/ui/loader";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { AddEmployeeDialog } from "./components/AddEmployeeDialog";

const ITEMS_PER_PAGE = 10;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<EmployeeFilters>({
    page: 1,
    limit: ITEMS_PER_PAGE,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const employeeService = EmployeeService.getInstance();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await employeeService.getEmployees(filters);
      setEmployees(response.data.data.employees);
      setTotalItems(response.data.meta?.total || 0);
    } catch (error) {
      toast.error("Failed to fetch employees");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchEmployees = async (query: string) => {
    try {
      setIsLoading(true);
      const results = await employeeService.searchEmployees(query);
      setEmployees(results);
      setTotalItems(results.length);
    } catch (error) {
      toast.error("Failed to search employees");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearch) {
      searchEmployees(debouncedSearch);
    } else {
      fetchEmployees();
    }
  }, [debouncedSearch, filters.page]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
          <AddEmployeeDialog
            open={open}
            onOpenChange={setOpen}
            onSuccess={() => {
              setOpen(false);
              fetchEmployees();
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full rounded-lg border">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <Loader size="lg" text="Loading employees..." />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Names</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>National ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Laptop</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Serial Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.length > 0 ? (
                    employees?.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="py-4">
                          {employee.firstName + " " + employee.lastName}
                        </TableCell>
                        <TableCell className="py-4">{employee.email}</TableCell>
                        <TableCell className="py-4">
                          {employee.telephone}
                        </TableCell>
                        <TableCell className="py-4">
                          {employee.nationalId}
                        </TableCell>
                        <TableCell className="capitalize">
                          {employee.department}
                        </TableCell>
                        <TableCell className="py-4">
                          {employee.position}
                        </TableCell>
                        <TableCell className="py-4 capitalize">
                          {employee.laptopManufacturer}
                        </TableCell>
                        <TableCell className="py-4 capitalize">
                          {employee.laptopModel}
                        </TableCell>
                        <TableCell className="py-4 capitalize">
                          {employee.serialNumber}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No employees found{" "}
                        {searchQuery ? "for " + searchQuery : ""}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {!searchQuery && (
                <div className="flex items-center justify-between border-t px-4 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(filters.page! - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(filters.page! * ITEMS_PER_PAGE, totalItems)} of{" "}
                    {totalItems} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(filters.page! - 1)}
                      disabled={filters.page === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={
                            filters.page === page ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ),
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(filters.page! + 1)}
                      disabled={filters.page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
