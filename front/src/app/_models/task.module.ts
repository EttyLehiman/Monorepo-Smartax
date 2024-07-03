import { Client } from './client.module';
import { Tag } from './tag.module';
import { User } from './user.module';
export interface Task {
  _id?: string;
  client: Client;
  taskName: string;
  description: string;
  dueDate: Date;
  status: string;
  assignedTo: User;
  tags: Tag[];
}