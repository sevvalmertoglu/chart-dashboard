import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Sale from '@/app/models/Sale';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') || 'all';

    let dateFilter = {
      $gte: new Date('2024-01-01'),
      $lte: new Date('2024-12-31')
    };

    if (month !== 'all') {
      const monthStart = new Date(2024, parseInt(month) - 1, 1);
      const monthEnd = new Date(2024, parseInt(month), 0);
      dateFilter = {
        $gte: monthStart,
        $lte: monthEnd
      };
    }

    const currentPeriodData = await Sale.aggregate([
      {
        $match: {
          date: dateFilter
        }
      },
      {
        $group: {
          _id: '$fuelType',
          value: { $sum: '$sales_amount' }
        }
      }
    ]);

    let previousDateFilter;
    if (month !== 'all') {
      const previousMonth = parseInt(month) - 1;
      const previousMonthStart = new Date(2024, previousMonth - 1, 1);
      const previousMonthEnd = new Date(2024, previousMonth, 0);
      previousDateFilter = {
        $gte: previousMonthStart,
        $lte: previousMonthEnd
      };
    } else {
      previousDateFilter = {
        $gte: new Date('2023-01-01'),
        $lte: new Date('2023-12-31')
      };
    }

    const previousPeriodData = await Sale.aggregate([
      {
        $match: {
          date: previousDateFilter
        }
      },
      {
        $group: {
          _id: '$fuelType',
          value: { $sum: '$sales_amount' }
        }
      }
    ]);

    const fuelTypes = ['Diesel', 'Ad Blue', 'Super E5', 'Super E10'];

    const totalValue = currentPeriodData.reduce((sum, item) => sum + item.value, 0);

    const result = fuelTypes.map(fuelType => {
      const current = currentPeriodData.find(d => d._id === fuelType)?.value || 0;
      const previous = previousPeriodData.find(d => d._id === fuelType)?.value || 0;
      
      const change = previous === 0 ? 0 : ((current - previous) / previous * 100);
      
      const percentage = totalValue === 0 ? 0 : (current / totalValue) * 100;

      return {
        name: fuelType,
        value: current,
        change: parseFloat(change.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2))
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Fuel Distribution API Error:', error);
    return NextResponse.json(
      { error: 'Yakıt tipi dağılımı verileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 