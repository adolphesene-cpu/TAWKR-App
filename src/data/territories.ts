import { Territory, Campaign, Franchise, Alert } from '@/types';

// Calculate Mondays: (logements × % résidences principales) / 100
function calculateMondays(logements: number, pctResidPrinc: number): number {
  return Math.round((logements * pctResidPrinc) / 100);
}

export const MOCK_TERRITORIES: Territory[] = [
  {
    id: 1,
    code_insee: '33063',
    name: 'BORDEAUX',
    departement: '33',
    region: 'NOUVELLE-AQUITAINE',
    logements: 12000,
    pct_resid_princ: 90,
    distance_km: '0-50 km',
    temps_trajet: '30min-1h',
    last_sales_crf: '2025-07-25',
    last_sales_acf: undefined,
    last_sales_mdm: '2024-06-01',
    last_sales_other: '2024-04-25',
    dispo_crf: '60',
    dispo_acf: undefined,
    dispo_mdm: '479',
    dispo_autres: '516',
    status: 'eligible',
    assigned_franchise_id: undefined,
    mondays_available: calculateMondays(12000, 90),
    comments: 'Blacklist : 22 rue Pierre Curie quartier Nansouty, résidence Villa d\'Albret 17 rue Tastet'
  },
  {
    id: 2,
    code_insee: '33281',
    name: 'MÉRIGNAC',
    departement: '33',
    region: 'NOUVELLE-AQUITAINE',
    logements: 9500,
    pct_resid_princ: 94,
    distance_km: '0-50 km',
    temps_trajet: '<30min',
    last_sales_crf: '2025-07-26',
    last_sales_acf: undefined,
    last_sales_mdm: '2024-05-27',
    last_sales_other: '2025-05-02',
    dispo_crf: '59',
    dispo_acf: undefined,
    dispo_mdm: '484',
    dispo_autres: '144',
    status: 'eligible',
    assigned_franchise_id: undefined,
    mondays_available: calculateMondays(9500, 94)
  },
  {
    id: 3,
    code_insee: '33318',
    name: 'PESSAC',
    departement: '33',
    region: 'NOUVELLE-AQUITAINE',
    logements: 8000,
    pct_resid_princ: 85,
    distance_km: '0-50 km',
    temps_trajet: '<30min',
    last_sales_crf: '2024-10-03',
    last_sales_acf: undefined,
    last_sales_mdm: '2024-06-12',
    last_sales_other: '2025-05-27',
    dispo_crf: '355',
    dispo_acf: undefined,
    dispo_mdm: '468',
    dispo_autres: '119',
    status: 'eligible',
    assigned_franchise_id: undefined,
    mondays_available: calculateMondays(8000, 85)
  },
  {
    id: 4,
    code_insee: '33522',
    name: 'TALENCE',
    departement: '33',
    region: 'NOUVELLE-AQUITAINE',
    logements: 7000,
    pct_resid_princ: 88,
    distance_km: '0-50 km',
    temps_trajet: '<30min',
    last_sales_crf: '2023-08-04',
    last_sales_acf: undefined,
    last_sales_mdm: '2024-05-30',
    last_sales_other: '2024-02-19',
    dispo_crf: '781',
    dispo_acf: undefined,
    dispo_mdm: '481',
    dispo_autres: '582',
    status: 'eligible',
    assigned_franchise_id: undefined,
    mondays_available: calculateMondays(7000, 88)
  },
  {
    id: 5,
    code_insee: '16015',
    name: 'ANGOULÊME',
    departement: '16',
    region: 'NOUVELLE-AQUITAINE',
    logements: 5000,
    pct_resid_princ: 82,
    distance_km: '101-150 km',
    temps_trajet: '>1h30',
    last_sales_crf: '2024-08-17',
    last_sales_acf: undefined,
    last_sales_mdm: undefined,
    last_sales_other: '2025-05-23',
    dispo_crf: '402',
    dispo_acf: undefined,
    dispo_mdm: '0',
    dispo_autres: '123',
    status: 'closed',
    assigned_franchise_id: undefined,
    mondays_available: calculateMondays(5000, 82)
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    pin: 'APEX',
    name: 'ACF',
    month: 'Janvier',
    priority: 1,
    city: 'Bordeaux',
    quota_mondays: 500,
    jachere_period_months: 3
  },
  {
    id: 2,
    pin: 'BORN',
    name: 'CARE',
    month: 'Février',
    priority: 2,
    city: 'Lille',
    quota_mondays: 400,
    jachere_period_months: 3
  },
  {
    id: 3,
    pin: 'DAY1',
    name: 'CRF',
    month: 'Mars',
    priority: 3,
    city: 'Lyon',
    quota_mondays: 600,
    jachere_period_months: 6
  },
  {
    id: 4,
    pin: 'DAY1-FUTUR',
    name: 'HCR',
    month: 'Avril',
    priority: undefined,
    city: 'Marseille',
    quota_mondays: 450,
    jachere_period_months: 3
  },
  {
    id: 5,
    pin: 'DAY1-Nice',
    name: 'MDM',
    month: 'Mai',
    priority: undefined,
    city: 'Nice',
    quota_mondays: 350,
    jachere_period_months: 3
  }
];

export const MOCK_FRANCHISES: Franchise[] = [
  {
    id: 1,
    name: 'Franchise Bordeaux',
    contact: 'bordeaux@tawkr.com',
    region: 'NOUVELLE-AQUITAINE'
  },
  {
    id: 2,
    name: 'Franchise Toulouse',
    contact: 'toulouse@tawkr.com',
    region: 'OCCITANIE'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 1,
    territory_id: 1,
    territory_name: 'BORDEAUX',
    message: 'Nouveau territoire disponible pour sélection',
    level: 'info',
    is_read: false,
    created_at: '2024-12-26T10:00:00Z'
  },
  {
    id: 2,
    territory_id: 5,
    territory_name: 'ANGOULÊME',
    message: 'Territoire fermé par la mairie - recherche alternative nécessaire',
    level: 'warning',
    is_read: false,
    created_at: '2024-12-25T14:30:00Z'
  },
  {
    id: 3,
    territory_id: 3,
    territory_name: 'PESSAC',
    message: 'Quota Mondays atteint pour ce territoire',
    level: 'error',
    is_read: true,
    created_at: '2024-12-24T09:15:00Z'
  }
];