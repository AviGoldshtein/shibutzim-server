import { seedCore } from './core.seed';
import { AppDataSource } from './data-source';
import { seedStatic } from './static.seed';

async function initializeDb() {
  // connect to the database
  const dataSource = await AppDataSource.initialize();

  // create schemas if not exist
  await dataSource.query(`CREATE SCHEMA IF NOT EXISTS static`);
  await dataSource.query(`CREATE SCHEMA IF NOT EXISTS core`);

  // drop and recreate the database (for development purposes)
  await dataSource.dropDatabase();
  await dataSource.synchronize();

  console.log('✅ Database dropped and synchronized');

  // seed static data - static schema
  console.log('⏳ Seeding static data...');
  await seedStatic(dataSource);

  // seed core data - core schema
  console.log('⏳ Seeding core data...');
  await seedCore(dataSource);

  console.log('✅ Full seed completed');

  process.exit();
}

initializeDb();
