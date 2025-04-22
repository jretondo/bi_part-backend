import { App } from './app';
import { config } from '../config';
import sequelize from '../database';
import OperativeClient from '../models/OperativeClient';
import Division from '../models/Division';
import Admin from '../models/Admin';

const handleConn = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ alter: true });
    console.log(
      'Connection has been established successfully. DB: ' +
        config.mysql.database,
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const main = () => {
  const app = new App(config.api.port);
  if (process.env.MACHINE === 'LOCAL') {
    handleConn();
    app.listenTest();
  } else {
    handleConn();
    app.listenProd();
  }
};

main();
