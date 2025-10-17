import type { base } from '../base.ts';
export interface Tenants extends base {
  Name: string;
  // add other fields from your Postgres schema here
  // e.g., Description?: string;
  // Id?: number;
}