export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  nationalId: string;
  department: string;
  position: string;
  laptopManufacturer: string;
  laptopModel: string;
  serialNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeResponse {
  data: {
    data: {
      employees: Employee[];
    };
    meta?: {
      total: number;
      currentPage: number;
      perPage: number;
    };
  };
}

export interface SearchEmployeeResponse {
  data: {
    employee: Employee[];
  };
}

export interface EmployeeFilters {
  search?: string;
  page?: number;
  limit?: number;
} 