import { Client } from './Client';
import { Data } from './Data';

export interface Order {
  id: number;
  client: Client;
  items: Data[];
};