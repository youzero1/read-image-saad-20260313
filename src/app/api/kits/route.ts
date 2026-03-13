import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Kit } from '@/entities/Kit';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Kit);
    const [kits, count] = await repo.findAndCount({
      order: { createdAt: 'DESC' },
    });
    return NextResponse.json({ kits, count });
  } catch (error) {
    console.error('Error fetching kits:', error);
    return NextResponse.json({ error: 'Failed to fetch kits' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Kit);
    const body = await request.json();
    const kit = repo.create(body);
    const saved = await repo.save(kit);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error creating kit:', error);
    return NextResponse.json({ error: 'Failed to create kit' }, { status: 500 });
  }
}
