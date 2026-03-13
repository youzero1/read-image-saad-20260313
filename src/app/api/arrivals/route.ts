import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Arrival } from '@/entities/Arrival';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Arrival);
    const [arrivals, count] = await repo.findAndCount({
      order: { createdAt: 'DESC' },
    });
    return NextResponse.json({ arrivals, count });
  } catch (error) {
    console.error('Error fetching arrivals:', error);
    return NextResponse.json({ error: 'Failed to fetch arrivals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Arrival);
    const body = await request.json();
    const arrival = repo.create(body);
    const saved = await repo.save(arrival);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error creating arrival:', error);
    return NextResponse.json({ error: 'Failed to create arrival' }, { status: 500 });
  }
}
