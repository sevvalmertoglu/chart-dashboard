import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Sale from '@/app/models/Sale';

export async function GET() {
  try {
    await connectDB();

    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    const stats = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$sales_amount' },
          totalProfit: { $sum: '$profit' },
          totalMalfunctions: { $sum: '$malfunctionCount' }
        }
      }
    ]);

    const previousYearStart = new Date('2023-01-01');
    const previousYearEnd = new Date('2023-12-31');
    const previousYearStats = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: previousYearStart,
            $lte: previousYearEnd
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$sales_amount' },
          totalProfit: { $sum: '$profit' },
          totalMalfunctions: { $sum: '$malfunctionCount' }
        }
      }
    ]);

    const dailySales = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$date',
          value: { $sum: '$sales_amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const dailyProfit = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$date',
          value: { $sum: '$profit' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const dailyMalfunctions = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$date',
          value: { $sum: '$malfunctionCount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const currentStats = stats[0] || { totalSales: 0, totalProfit: 0, totalMalfunctions: 0 };
    const previousStats = previousYearStats[0] || { totalSales: 0, totalProfit: 0, totalMalfunctions: 0 };

    const calculateGrowth = (current: number, previous: number) => {
      if (previous === 0 && current === 0) return 0;
      if (previous === 0) return 100;
      return Number(((current - previous) / previous * 100).toFixed(2));
    };

    const salesGrowth = calculateGrowth(currentStats.totalSales, previousStats.totalSales);
    const profitGrowth = calculateGrowth(currentStats.totalProfit, previousStats.totalProfit);
    const malfunctionsChange = calculateGrowth(currentStats.totalMalfunctions, previousStats.totalMalfunctions);

    return NextResponse.json({
      totalSales: currentStats.totalSales,
      totalProfit: currentStats.totalProfit,
      malfunctions: currentStats.totalMalfunctions,
      salesGrowth,
      profitGrowth,
      malfunctionsChange,
      salesHistory: dailySales.map(item => ({
        date: item._id,
        value: item.value
      })),
      profitHistory: dailyProfit.map(item => ({
        date: item._id,
        value: item.value
      })),
      malfunctionsHistory: dailyMalfunctions.map(item => ({
        date: item._id,
        value: item.value
      }))
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      { error: 'İstatistikler alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 