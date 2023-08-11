import { Sequelize } from 'sequelize-typescript';
import { Note } from '../notes/entities/note.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        define: {
          timestamps: false,
        },
      });
      sequelize.addModels([Note]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
