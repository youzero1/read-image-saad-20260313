import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import { Item } from '@/entities/Item';
import { Arrival } from '@/entities/Arrival';
import { Departure } from '@/entities/Departure';
import { Kit } from '@/entities/Kit';

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'data', 'database.sqlite');

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: dbPath,
    synchronize: true,
    logging: false,
    entities: [Item, Arrival, Departure, Kit],
  });

  await dataSource.initialize();
  await seedData(dataSource);
  return dataSource;
}

async function seedData(ds: DataSource): Promise<void> {
  const itemRepo = ds.getRepository(Item);
  const arrivalRepo = ds.getRepository(Arrival);
  const departureRepo = ds.getRepository(Departure);
  const kitRepo = ds.getRepository(Kit);

  const itemCount = await itemRepo.count();
  if (itemCount === 0) {
    const items = [
      itemRepo.create({ name: 'Laptop Stand', status: 'active' }),
      itemRepo.create({ name: 'Wireless Keyboard', status: 'active' }),
      itemRepo.create({ name: 'USB-C Hub', status: 'inactive' }),
      itemRepo.create({ name: 'Monitor 27"', status: 'active' }),
      itemRepo.create({ name: 'Webcam HD', status: 'active' }),
    ];
    await itemRepo.save(items);
  }

  const arrivalCount = await arrivalRepo.count();
  if (arrivalCount === 0) {
    const arrivals = [
      arrivalRepo.create({ name: 'Shipment #1001', status: 'completed', quantity: 10 }),
      arrivalRepo.create({ name: 'Shipment #1002', status: 'pending', quantity: 5 }),
      arrivalRepo.create({ name: 'Shipment #1003', status: 'in-transit', quantity: 20 }),
      arrivalRepo.create({ name: 'Shipment #1004', status: 'completed', quantity: 8 }),
    ];
    await arrivalRepo.save(arrivals);
  }

  const departureCount = await departureRepo.count();
  if (departureCount === 0) {
    const departures = [
      departureRepo.create({ name: 'Order #2001', status: 'shipped', quantity: 3 }),
      departureRepo.create({ name: 'Order #2002', status: 'pending', quantity: 7 }),
      departureRepo.create({ name: 'Order #2003', status: 'delivered', quantity: 12 }),
      departureRepo.create({ name: 'Order #2004', status: 'shipped', quantity: 2 }),
    ];
    await departureRepo.save(departures);
  }

  const kitCount = await kitRepo.count();
  if (kitCount === 0) {
    const kits = [
      kitRepo.create({ name: 'Starter Kit', status: 'active', itemCount: 5 }),
      kitRepo.create({ name: 'Pro Kit', status: 'active', itemCount: 10 }),
      kitRepo.create({ name: 'Basic Kit', status: 'inactive', itemCount: 3 }),
    ];
    await kitRepo.save(kits);
  }
}
