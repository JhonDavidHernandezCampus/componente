export interface ProductListAccouting {
  index?: number;
  id?: number | string;
  guid: string;
  name: string;

  // Espesific for PaySheet
  credit?: string;
  debit?: string;
  quantity?: string;
  debitAmount?: string;
  creditAmount?: string;
  baseAmount?: string;
  baseValue?: string;

  // Espesific for accounting
  accrual?: number | string;
  deduction?: number | string;
  totalAmount?: number;

  dateAdd?: string;
  code?: string;
  type?: string;
  tax?: number;
  value?: number;
  niif?: Niif;
  Type?: string;
  Quantity?: number;
  Description?: string;
  StartDate?: string;
  EndDate?: string;
  Amount?: number;
  InhabilityCode?: string;
  IsSalary?: boolean;
}

interface Niif {
  concept: string;
  section: string;
}
