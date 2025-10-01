export interface User {
  id: number;
  email: string;
  role: 'admin' | 'franchise';
  franchise_id?: number;
  franchise_name?: string;
  created_at: string;
}

export interface Territory {
  id: number;
  code_insee: string;
  name: string;
  departement: string;
  region: string;
  logements: number;
  pct_resid_princ: number;
  distance_km: string;
  temps_trajet: string;
  last_sales_crf?: string;
  last_sales_acf?: string;
  last_sales_mdm?: string;
  last_sales_other?: string;
  dispo_crf: string;
  dispo_acf?: string;
  dispo_mdm: string;
  dispo_autres: string;
  status: 'eligible' | 'closed' | 'reserved';
  assigned_franchise_id?: number;
  mondays_available: number;
  next_available_date?: string;
  comments?: string;
}

export interface Campaign {
  id: number;
  pin: string;
  name: string;
  month: string;
  priority?: number;
  city: string;
  quota_mondays: number;
  jachere_period_months: number;
}

export interface Franchise {
  id: number;
  name: string;
  contact: string;
  region: string;
}

export interface Alert {
  id: number;
  territory_id: number;
  territory_name: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export interface TerritorySelection {
  territory_id: number;
  campaign_id: number;
  franchise_id: number;
  mondays_selected: number;
  selection_date: string;
  status: 'pending' | 'validated' | 'rejected';
}

export interface DashboardStats {
  total_territories: number;
  available_territories: number;
  total_mondays: number;
  selected_mondays: number;
  pending_validations: number;
  active_campaigns: number;
}