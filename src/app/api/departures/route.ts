import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Departure } from '@/entities/Departure';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Departure);
    const [departures, count] = await repo.findAndCount({
      order: { createdAt: 'DESC' },
    });
    return NextResponse.json({ departures, count });
  } catch (error) {
    console.error('Error fetching departures:', error);
    return NextResponse.json({ error: 'Failed to fetch departures' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Departure);
    const body = await request.json();
    const departure = repo.create(body);
    const saved = await repo.save(departure);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error creating departure:', error);
    return NextResponse.json({ error: 'Failed to create departure' }, { status: 500 });
  }
}
