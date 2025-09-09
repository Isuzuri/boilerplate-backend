import { Sequelize } from 'sequelize';

// Sequalize connect
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db'
});

export default sequelize;