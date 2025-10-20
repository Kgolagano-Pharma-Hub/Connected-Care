import type { base } from '../base.ts';
export interface User extends base {
  Username: string;
  // add other fields from your Postgres schema here
  // e.g., Email?: string;
  // Id?: number;
}
