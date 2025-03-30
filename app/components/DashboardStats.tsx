'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface Stats {
  totalSales: number;
  totalProfit: number;
  malfunctions: number;
  salesGrowth: number;
  profitGrowth: number;
  malfunctionsChange: number;
  salesHistory: Array<{ date: string; value: number }>;
  profitHistory: Array<{ date: string; value: number }>;
  malfunctionsHistory: Array<{ date: string; value: number }>;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalSales: 0,
    totalProfit: 0,
    malfunctions: 0,
    salesGrowth: 0,
    profitGrowth: 0,
    malfunctionsChange: 0,
    salesHistory: [],
    profitHistory: [],
    malfunctionsHistory: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch('/api/stats');
        if (!res.ok) {
          throw new Error('Veri çekme başarısız oldu');
        }
        const data = await res.json();
        console.log('Alınan istatistikler:', data);
        setStats(data);
      } catch (err) {
        console.error('İstatistik hatası:', err);
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-500">Hata: {error}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <div className="text-sm text-muted-foreground">Statistics</div>
            <CardTitle className="text-sm font-medium">Total Sales Today</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
          <div className="flex items-center">
            <span className={`text-sm ${stats.salesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.salesGrowth > 0 ? '+' : ''}{stats.salesGrowth.toFixed(2)}%
            </span>
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.salesHistory}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2c5bff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <div className="text-sm text-muted-foreground">Statistics</div>
            <CardTitle className="text-sm font-medium">Total Profit Today</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalProfit.toFixed(2)}</div>
          <div className="flex items-center">
            <span className={`text-sm ${stats.profitGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.profitGrowth > 0 ? '+' : ''}{stats.profitGrowth.toFixed(2)}%
            </span>
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.profitHistory}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3ad430"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <div className="text-sm text-muted-foreground">Statistics</div>
            <CardTitle className="text-sm font-medium">Malfunctions Today</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.malfunctions}</div>
          <div className="flex items-center">
            <span className={`text-sm ${stats.malfunctionsChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.malfunctionsChange > 0 ? '+' : ''}{stats.malfunctionsChange.toFixed(2)}%
            </span>
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.malfunctionsHistory}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ff7f96"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
} 