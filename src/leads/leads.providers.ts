import { Connection } from 'mongoose';
import { LeadSchema } from 'src/schemas/lead.schema';

export const leadsProviders = [
  {
    provide: 'LEAD_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Lead', LeadSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
