import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Sale from '@/app/models/Sale';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const tankId = searchParams.get('tankId') || 'all';

    // 2023 ve 2024 yıllarının başlangıç ve bitiş tarihleri
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2024-12-31');

    // Tank ID'ye göre filtreleme
    const tankFilter = tankId !== 'all' ? { tankId } : {};

    const tankStatus = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          ...tankFilter
        }
      },
      {
        $sort: { date: -1 }
      },
      {
        $group: {
          _id: '$tankId',
          name: { $first: { $concat: ['$tankId'] } },
          value: { $first: '$fill_rate' },
          lastUpdate: { $first: '$date' }
        }
      }
    ]);

    return NextResponse.json(tankStatus);
  } catch (error) {
    console.error('Tank Status API Error:', error);
    return NextResponse.json(
      { error: 'Tank durumu verileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 