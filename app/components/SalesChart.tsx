'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SVGProps } from 'react';

type TimeRange = 'daily' | 'weekly' | 'monthly';
type FuelType = 'all' | 'Diesel' | 'Ad Blue' | 'Super E5' | 'Super E10' | 'Cleaning';

interface SaleData {
  _id: string;
  displayName?: string;
  Diesel?: number;
  'Ad Blue'?: number;
  'Super E5'?: number;
  'Super E10'?: number;
  Cleaning?: number;
}

const fuelTypes = [
  { 
    id: 'all', 
    label: 'All Categories', 
    percentage: '0',
    color: '#4C1D95', 
    lightColor: '#EDE9FE'
  },
  { 
    id: 'Diesel', 
    label: 'Diesel', 
    percentage: '-37',
    color: '#962dff', 
    lightColor: '#DDD6FE'
  },
  { 
    id: 'Ad Blue', 
    label: 'Ad Blue', 
    percentage: '-23',
    color: '#493aff', 
    lightColor: '#E9D5FF'
  },
  { 
    id: 'Super E5', 
    label: 'Super E5', 
    percentage: '-29',
    color: '#e0c6fd', 
    lightColor: '#F3E8FF'
  },
  { 
    id: 'Super E10', 
    label: 'Super E10', 
    percentage: '-19',
    color: '#9eb3fd', 
    lightColor: '#EDE9FE'
  },
  { 
    id: 'Cleaning', 
    label: 'Cleaning', 
    percentage: '-2',
    color: '#acbefd',
    lightColor: '#F5F3FF'
  },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SalesChart() {
  const [data, setData] = useState<SaleData[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [fuelType, setFuelType] = useState<FuelType>('all');
  const [loading, setLoading] = useState(true);

  const formatXAxisTick = (value: string) => {
    if (timeRange === 'weekly') {
      const dayIndex = data.findIndex(item => item._id === value);
      return weekDays[dayIndex] || value;
    }
    if (timeRange === 'monthly') {
      return value.split('-')[1];
    }
    return value;
  };

  useEffect(() => {
    async function fetchSales() {
      try {
        setLoading(true);
        console.log('Fetching data:', { timeRange, fuelType });
        const res = await fetch(`/api/sales?timeRange=${timeRange}&fuelType=${fuelType}`);
        if (!res.ok) throw new Error('Failed to fetch sales data');
        const salesData = await res.json();
        console.log('Received data:', salesData);

        const transformedData = salesData.map((item: SaleData) => ({
          _id: item._id,
          displayName: timeRange === 'weekly' ? weekDays[0] : item._id,
          Diesel: item.Diesel ?? 0,
          'Ad Blue': item['Ad Blue'] ?? 0,
          'Super E5': item['Super E5'] ?? 0,
          'Super E10': item['Super E10'] ?? 0,
          Cleaning: item.Cleaning ?? 0
        }));

        setData(transformedData);
      } catch (error) {
        console.error('Sales data error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSales();
  }, [timeRange, fuelType]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Statistics</div>
            <CardTitle>Total summary of sales</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex-1 h-[400px] relative pr-4 border-r border-gray-200">
          <div className="absolute top-[-60px] right-4 flex items-center space-x-1 z-10 bg-[#f8f8ff] p-1 rounded-2xl">
            <Button
              variant="ghost"
              onClick={() => setTimeRange('daily')}
              className={cn(
                "px-4 py-2",
                timeRange === 'daily' 
                  ? "bg-[#1e1c39] text-white" 
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Daily
            </Button>
            <Button
              variant="ghost"
              onClick={() => setTimeRange('weekly')}
              className={cn(
                "px-4 py-2",
                timeRange === 'weekly' 
                  ? "bg-[#1e1c39] text-white" 
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Weekly
            </Button>
            <Button
              variant="ghost"
              onClick={() => setTimeRange('monthly')}
              className={cn(
                "px-4 py-2",
                timeRange === 'monthly' 
                  ? "bg-[#1e1c39] text-white" 
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Monthly
            </Button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              barGap={2}
              barCategoryGap={12}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="_id"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: '#6B7280', 
                  fontSize: 12,
                  angle: timeRange === 'daily' ? -45 : 0,
                  textAnchor: timeRange === 'daily' ? 'end' : 'middle',
                  dy: timeRange === 'daily' ? 8 : 0
                } as SVGProps<SVGTextElement>}
                interval={0}
                tickFormatter={formatXAxisTick}
                padding={{ left: 10, right: 10 }}
                height={timeRange === 'daily' ? 60 : 50}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `${value}k`}
                width={60}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                formatter={(value: number) => [`${value}k`, '']}
                labelFormatter={(label) => formatXAxisTick(label)}
              />
              <Legend 
                verticalAlign="top"
                height={36}
                iconType="circle"
              />
              {fuelTypes.slice(1).map((type) => (
                <Bar
                  key={type.id}
                  dataKey={type.id}
                  name={type.label}
                  fill={type.color}
                  radius={[10, 10, 0, 0]}
                  maxBarSize={timeRange === 'monthly' ? 50 : 35}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-48 flex flex-col space-y-3 pl-6">
          {fuelTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFuelType(type.id as FuelType)}
              className={cn(
                "flex items-center text-left px-3 py-2 rounded-full transition-all",
                "hover:bg-opacity-10 relative group",
                fuelType === type.id && "ring-1 bg-opacity-10",
                fuelType === type.id ? "ring-[#9e95ff] bg-[#f8f8ff]" : "hover:bg-[#f8f8ff]"
              )}
              style={{
                backgroundColor: fuelType === type.id ? '#f8f8ff' : 'transparent',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: fuelType === type.id ? '#9e95ff' : 'transparent'
              }}
            >
              <div className="flex items-center flex-1">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: type.color }}
                />
                <span 
                  className={cn(
                    "text-sm",
                    fuelType === type.id 
                      ? "font-medium" 
                      : "text-gray-600"
                  )}
                  style={{ color: fuelType === type.id ? type.color : undefined }}
                >
                  {type.label}
                </span>
              </div>
              <span 
                className={cn(
                  "text-sm ml-2",
                  fuelType === type.id 
                    ? "font-medium" 
                    : "text-gray-400"
                )}
                style={{ color: fuelType === type.id ? type.color : undefined }}
              >
                {type.id !== 'all' && `${type.percentage}%`}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 