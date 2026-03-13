import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Item } from '@/entities/Item';

export async function GET() {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);
    const [items, count] = await repo.findAndCount({
      order: { createdAt: 'DESC' },
    });
    return NextResponse.json({ items, count });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ds = await getDataSource();
    const repo = ds.getRepository(Item);
    const body = await request.json();
    const item = repo.create(body);
    const saved = await repo.save(item);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
