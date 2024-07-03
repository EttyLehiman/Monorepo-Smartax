import { Client } from './client.module';
import { SelectItem } from 'primeng/api';

export interface Communication {
  _id?: string;
  client: Client;
  date: Date;
  type: string;
  summary: string;
  assignedTo: SelectItem | null; // Change type to SelectItem
}
