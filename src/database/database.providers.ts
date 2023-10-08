import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://esg_gep_admin:cgNdMZyjLk9TcfY8@cluster0.gjqgh.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
