export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: "user" | "payment" | "system" | "other";
}

export interface DashboardContextType {
  stats: DashboardStats;
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  updateStats: (stats: Partial<DashboardStats>) => void;
  addActivity: (activity: Omit<Activity, "id">) => void;
}
