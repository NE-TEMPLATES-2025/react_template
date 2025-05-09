export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
    data: Employee[],
    meta?: {
      total: number;
      currentPage: number;
      perPage: number;
    };
  };
}


export interface SearchEmployeeResponse {
  data: Employee[]
}

export interface EmployeeFilters {
  search?: string;
  page?: number;
  limit?: number;
}
