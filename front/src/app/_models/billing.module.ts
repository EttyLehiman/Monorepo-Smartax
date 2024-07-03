import { Client } from './client.module';

export interface Billing {
  client: Client;
  amount: string;
  status: string;
  dueDate: Date;
  paidDate: Date;
}