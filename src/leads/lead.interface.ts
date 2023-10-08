import { Document } from 'mongoose';

export interface Lead extends Document {
  readonly name: string;
  readonly email: number;
}
