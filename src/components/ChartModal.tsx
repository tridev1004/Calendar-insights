import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDataForDate, UserData } from '@/data/dummyData';

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
}

export const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose, selectedDate }) => {
  const chartData = React.useMemo(() => {
    if (!selectedDate) return [];
    
    const data = getDataForDate(selectedDate);
    if (!data) return [];
    
    return data.map((userData: UserData, index: number) => {
      const userKey = Object.keys(userData)[0];
      const value = userData[userKey];
      
      return {
        name: userKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: value,
        fill: `hsl(var(--chart-${index % 4 === 0 ? 'primary' : index % 4 === 1 ? 'secondary' : index % 4 === 2 ? 'tertiary' : 'quaternary'}))`
      };
    });
  }, [selectedDate]);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Data Analytics for {selectedDate}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-chart-primary/10 to-chart-primary/5 p-4 rounded-lg border border-chart-primary/20">
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="text-2xl font-bold text-chart-primary">{chartData.length}</div>
            </div>
            <div className="bg-gradient-to-r from-chart-secondary/10 to-chart-secondary/5 p-4 rounded-lg border border-chart-secondary/20">
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="text-2xl font-bold text-chart-secondary">{totalValue}</div>
            </div>
            <div className="bg-gradient-to-r from-chart-tertiary/10 to-chart-tertiary/5 p-4 rounded-lg border border-chart-tertiary/20">
              <div className="text-sm text-muted-foreground">Average</div>
              <div className="text-2xl font-bold text-chart-tertiary">
                {chartData.length > 0 ? (totalValue / chartData.length).toFixed(1) : 0}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 border">
            <h3 className="text-lg font-semibold mb-4">User Activity Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))'
                    }}
                    cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    stroke="hsl(var(--border))"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Data Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {chartData.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">{item.name}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};