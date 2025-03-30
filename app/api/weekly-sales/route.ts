import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Sale from '@/app/models/Sale';

export async function GET() {
  try {
    await connectDB();

    // Son 7 günün verilerini al
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const sales = await Sale.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            fuelType: '$fuelType'
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          sales: {
            $push: {
              fuelType: '$_id.fuelType',
              amount: '$total'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          day: '$_id',
          diesel: {
            $reduce: {
              input: {
                $filter: {
                  input: '$sales',
                  as: 'sale',
                  cond: { $eq: ['$$sale.fuelType', 'Diesel'] }
                }
              },
              initialValue: 0,
              in: { $add: ['$$value', '$$this.amount'] }
            }
          },
          adBlue: {
            $reduce: {
              input: {
                $filter: {
                  input: '$sales',
                  as: 'sale',
                  cond: { $eq: ['$$sale.fuelType', 'Ad Blue'] }
                }
              },
              initialValue: 0,
              in: { $add: ['$$value', '$$this.amount'] }
            }
          },
          superE5: {
            $reduce: {
              input: {
                $filter: {
                  input: '$sales',
                  as: 'sale',
                  cond: { $eq: ['$$sale.fuelType', 'Super E5'] }
                }
              },
              initialValue: 0,
              in: { $add: ['$$value', '$$this.amount'] }
            }
          },
          superE10: {
            $reduce: {
              input: {
                $filter: {
                  input: '$sales',
                  as: 'sale',
                  cond: { $eq: ['$$sale.fuelType', 'Super E10'] }
                }
              },
              initialValue: 0,
              in: { $add: ['$$value', '$$this.amount'] }
            }
          }
        }
      },
      {
        $sort: { day: 1 }
      }
    ]);

    return NextResponse.json(sales);
  } catch (error) {
    console.error('Weekly Sales API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 