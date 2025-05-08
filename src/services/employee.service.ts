import { AuthorizedApi } from "@/lib/api";
import { Employee, EmployeeFilters, EmployeeResponse, SearchEmployeeResponse } from "@/types/employee";

export class EmployeeService {
  private static instance: EmployeeService;

  private constructor() {}

  public static getInstance(): EmployeeService {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService();
    }
    return EmployeeService.instance;
  }

  async getEmployees(filters: EmployeeFilters = {}): Promise<EmployeeResponse> {
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());

    const response = await AuthorizedApi.get(`/employees/all?${queryParams.toString()}`);
    return response;
  }

  async searchEmployees(query: string): Promise<Employee[]> {
    const response = await AuthorizedApi.get<SearchEmployeeResponse>(`/employees/search/${query}`);
    return response.data.data.employee;
  }

  async createEmployee(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    const response = await AuthorizedApi.post('/employees/register', data);
    return response.data;
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    const response = await AuthorizedApi.patch(`/employees/${id}`, data);
    return response.data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await AuthorizedApi.delete(`/employees/${id}`);
  }
} 