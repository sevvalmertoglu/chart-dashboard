import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Sale from '@/app/models/Sale';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { data } = await request.json();
    console.log('Alınan ham veriler:', data);

    if (!Array.isArray(data)) {
      console.error('Geçersiz veri formatı:', data);
      return NextResponse.json(
        { error: 'Geçersiz veri formatı' },
        { status: 400 }
      );
    }

    const validData = data.filter(row => {
      const date = new Date(row.date);
      const sales_amount = parseFloat(row.sales_amount);
      const profit = parseFloat(row.profit);
      const malfunctionCount = parseInt(row.malfunctionCount);
      const fill_rate = parseFloat(row.fill_rate);
      const validFuelTypes = ['Diesel', 'Ad Blue', 'Super E5', 'Super E10'];

      const isValid = (
        !isNaN(date.getTime()) &&
        !isNaN(sales_amount) &&
        !isNaN(profit) &&
        !isNaN(malfunctionCount) &&
        !isNaN(fill_rate) &&
        fill_rate >= 0 &&
        fill_rate <= 100 &&
        validFuelTypes.includes(row.fuelType) &&
        row.tankId
      );

      if (!isValid) {
        console.log('Geçersiz satır:', row);
      }

      return isValid;
    }).map(row => ({
      ...row,
      date: new Date(row.date),
      sales_amount: parseFloat(row.sales_amount),
      profit: parseFloat(row.profit),
      malfunctionCount: parseInt(row.malfunctionCount),
      fill_rate: parseFloat(row.fill_rate)
    }));

    if (validData.length === 0) {
      return NextResponse.json(
        { error: 'Geçerli veri bulunamadı' },
        { status: 400 }
      );
    }

    const result = await Sale.insertMany(validData);
    console.log('Veritabanına eklenen kayıtlar:', result);

    return NextResponse.json({
      message: `${validData.length} kayıt başarıyla içe aktarıldı`,
      invalidCount: data.length - validData.length
    });
  } catch (error) {
    console.error('Import API Error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
} 