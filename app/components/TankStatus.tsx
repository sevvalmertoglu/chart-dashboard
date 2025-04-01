'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TankData {
  name: string;
  value: number;
  lastUpdate: string;
}

export default function TankStatus() {
  const [data, setData] = useState<TankData[]>([]);
  const [selectedTank, setSelectedTank] = useState<string>('Tank #1');

  useEffect(() => {
    async function fetchTankStatus() {
      try {
        const res = await fetch('/api/tank-status');
        if (!res.ok) throw new Error('Tank durumu alınamadı');
        const tankData = await res.json();
        setData(tankData);
      } catch (error) {
        console.error('Tank verisi hatası:', error);
      }
    }

    fetchTankStatus();
  }, []);

  const selectedTankData = data.find(tank => tank.name === selectedTank) || { name: 'Tank #1', value: 75, lastUpdate: new Date().toISOString() };

  const radius = 160;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;

  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(180, 180, normalizedRadius, startAngle);
    const end = polarToCartesian(180, 180, normalizedRadius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", normalizedRadius, normalizedRadius, 0, largeArcFlag, 1, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const sections = [
    { start: 270, end: 338, color: '#ff708a' },  
    { start: 348, end: 390, color: '#fcb5c3' },   
    { start: 400, end: 420, color: '#ffeb3b' },  
    { start: 430, end: 450, color: '#80e37e' }     
  ];

  const minAngle = 270; 
  const maxAngle = 450; 
  const angleRange = maxAngle - minAngle;
  const pointerAngle = minAngle + (selectedTankData.value * angleRange / 100);
  const pointer = polarToCartesian(180, 180, normalizedRadius, pointerAngle);

  const getCurrentColor = (angle: number) => {
    const section = sections.find(s => angle >= s.start && angle <= s.end);
    return section ? section.color : '#6B7280';
  };
  const pointerColor = getCurrentColor(pointerAngle);

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <div className="text-sm text-muted-foreground">Tanks</div>
          <CardTitle className="text-2xl font-bold">{selectedTank}</CardTitle>
        </div>
        <Select value={selectedTank} onValueChange={setSelectedTank}>
          <SelectTrigger className="w-[120px] bg-[#f8f8ff] border-[#f8f8ff] rounded-full hover:bg-[#f0f0ff] transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#f8f8ff] border-[#f8f8ff]">
            {data.map(tank => (
              <SelectItem 
                key={tank.name} 
                value={tank.name}
                className="hover:bg-[#f0f0ff] focus:bg-[#f0f0ff] rounded-md"
              >
                {tank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative flex flex-col items-center justify-center h-[400px]">
          <svg width="360" height="220" className="mb-8">
            {sections.map((section, index) => (
              <path
                key={index}
                d={createArc(section.start, section.end)}
                fill="none"
                stroke={section.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{
                  transition: 'all 0.5s ease-in-out',
                }}
              />
            ))}
            {/* İbre noktası */}
            <circle
              cx={pointer.x}
              cy={pointer.y}
              r="12"
              fill="white"
              stroke={pointerColor}
              strokeWidth="3"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                transition: 'all 0.3s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute bottom-12 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold text-[#1e1c39]">{selectedTankData.value}%</span>
            <span className="text-gray-500 mt-4">{selectedTank}&apos;s fill rate is</span>
            <span className="text-gray-400 mt-2">Updated {new Date(selectedTankData.lastUpdate).toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
