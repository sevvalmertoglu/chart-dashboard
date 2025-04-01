import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Sale from '@/app/models/Sale';
import { PipelineStage } from 'mongoose';

export async function GET(request: Request) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    await connectDB();

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'weekly';
    const fuelType = searchParams.get('fuelType') || 'all';

    const startDate = new Date('2023-01-01');
    const endDate = new Date('2024-12-31');

    let groupBy;
    switch (timeRange) {
      case 'daily':
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$date' } };
        break;
      case 'weekly':
        groupBy = { 
          $dayOfWeek: { date: '$date' }
        };
        break;
      case 'monthly':
        groupBy = { $dateToString: { format: '%Y-%m', date: '$date' } };
        break;
      default:
        groupBy = { $dateToString: { format: '%Y-W%V', date: '$date' } };
    }

    const pipeline: PipelineStage[] = [
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          },
          ...(fuelType !== 'all' && { fuelType })
        }
      },
      {
        $group: {
          _id: groupBy,
          Diesel: { $sum: { $cond: [{ $eq: ['$fuelType', 'Diesel'] }, '$sales_amount', 0] } },
          'Ad Blue': { $sum: { $cond: [{ $eq: ['$fuelType', 'Ad Blue'] }, '$sales_amount', 0] } },
          'Super E5': { $sum: { $cond: [{ $eq: ['$fuelType', 'Super E5'] }, '$sales_amount', 0] } },
          'Super E10': { $sum: { $cond: [{ $eq: ['$fuelType', 'Super E10'] }, '$sales_amount', 0] } }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ];

    const sales = await Sale.aggregate(pipeline).exec();
    clearTimeout(timeoutId);

    if (timeRange === 'weekly') {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const formattedSales = sales.map(sale => ({
        ...sale,
        _id: daysOfWeek[sale._id - 1] || sale._id
      }));
      return NextResponse.json(formattedSales);
    }

    return NextResponse.json(sales);
  } catch (error: unknown) {
    console.error('Sales API Error:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'İstek zaman aşımına uğradı' },
          { status: 504 }
        );
      }
    }
    return NextResponse.json(
      { error: 'Satış verileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 