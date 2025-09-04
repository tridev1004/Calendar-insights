import React, { useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button';
import { ChartModal } from './ChartModal';
import { formatDateForLookup, hasDataForDate, getDatesWithData } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<View>('month');
  const { toast } = useToast();

  const events: CalendarEvent[] = getDatesWithData().map((dateStr, index) => {
    const [day, month, year] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    return {
      id: `event-${index}`,
      title: 'Data Available',
      start: date,
      end: date,
      resource: { hasData: true, dateStr }
    };
  });

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const dateStr = formatDateForLookup(start);
    
    if (hasDataForDate(dateStr)) {
      setSelectedDate(dateStr);
      setIsModalOpen(true);
    } else {
      toast({
        title: "No Data Found",
        description: `No data found for the selected date: ${dateStr}`,
        variant: "destructive"
      });
    }
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    if (event.resource?.hasData) {
      setSelectedDate(event.resource.dateStr);
      setIsModalOpen(true);
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    if (event.resource?.hasData) {
      return {
        style: {
          backgroundColor: 'hsl(var(--calendar-highlight))',
          borderRadius: '6px',
          border: 'none',
          color: 'white',
          fontSize: '12px',
          padding: '2px 6px'
        }
      };
    }
    return {};
  };

  const dayPropGetter = (date: Date) => {
    const dateStr = formatDateForLookup(date);
    const today = moment().format('DD-MM-YYYY');
    
    if (hasDataForDate(dateStr)) {
      return {
        style: {
          backgroundColor: 'hsl(var(--calendar-highlight) / 0.1)',
          border: '2px solid hsl(var(--calendar-highlight) / 0.3)',
          borderRadius: '4px'
        }
      };
    }
    
    if (dateStr === today) {
      return {
        style: {
          backgroundColor: 'hsl(var(--calendar-today) / 0.1)',
          border: '2px solid hsl(var(--calendar-today) / 0.5)',
          borderRadius: '4px'
        }
      };
    }
    
    return {};
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Calendar Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            View and analyze data across different time periods. Click on highlighted dates to see detailed charts.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            onClick={() => setView('month')}
            size="sm"
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            onClick={() => setView('week')}
            size="sm"
          >
            Week
          </Button>
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            onClick={() => setView('day')}
            size="sm"
          >
            Day
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-calendar">
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={view}
            onView={setView}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            eventPropGetter={eventStyleGetter}
            dayPropGetter={dayPropGetter}
            popup
            className="custom-calendar"
          />
        </div>
      </div>

      <ChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarView;