'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ['#493aff', '#2c5bff', '#93aafd', '#c6d2fd'];

interface FuelData {
  name: string;
  value: number;
  change: number;
  percentage: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length && payload[0].payload) {
    const data = payload[0].payload;
    const percentage = Number(data.percentage || 0);
    const change = Number(data.change || 0);
    
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium">{data.name}</p>
        <p className="text-gray-600">Sales: {data.value?.toLocaleString() || 0} L</p>
        <p className="text-gray-600">Rate: {percentage === 0 ? '0' : percentage.toFixed(1)}%</p>
        <p className={change >= 0 ? "text-green-500" : "text-red-500"}>
          Change: {change > 0 ? '+' : ''}{change === 0 ? '0' : change.toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  if (!payload) return null;

  return (
    <div className="flex flex-col gap-3">
      {payload.map((entry: any, index: number) => {
        if (!entry || !entry.payload) return null;
        const percentage = Number(entry.payload.percentage || 0);
        const change = Number(entry.payload.change || 0);

        return (
          <div key={`item-${index}`} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {percentage === 0 ? '0' : percentage.toFixed(1)}%
              </span>
              <span
                className={`text-sm ${
                  change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                ({change > 0 ? '+' : ''}{change === 0 ? '0' : change.toFixed(1)}%)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function FuelTypeDistribution() {
  const [data, setData] = useState<FuelData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFuelDistribution() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/fuel-distribution?month=${selectedMonth}`);
        if (!res.ok) throw new Error('Data could not be retrieved');
        const fuelData = await res.json();
        
        if (!Array.isArray(fuelData) || fuelData.length === 0) {
          setData([]);
          setError('No data found for this month');
        } else {
          const processedData = fuelData.map(item => ({
            ...item,
            percentage: Number(item.percentage || 0),
            change: Number(item.change || 0)
          }));
          setData(processedData);
        }
      } catch (error) {
        console.error('Fuel distribution error:', error);
        setError('An error occurred while loading data');
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFuelDistribution();
  }, [selectedMonth]);

  const months = [
    { value: 'all', label: 'All Year' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Statistics</div>
            <CardTitle>Total Sales by Gas Type</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <span className="text-gray-500">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Statistics</div>
            <CardTitle>Total Sales by Gas Type</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <span className="text-red-500">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Statistics</div>
          <CardTitle>Total Sales by Gas Type</CardTitle>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[120px] bg-[#f8f8ff] border-[#f8f8ff] rounded-full hover:bg-[#f0f0ff] transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#f8f8ff] border-[#f8f8ff]">
            {months.map(month => (
              <SelectItem 
                key={month.value} 
                value={month.value}
                className="hover:bg-[#f0f0ff] focus:bg-[#f0f0ff] rounded-md"
              >
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500">Veri bulunamadı</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  content={<CustomLegend />}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 