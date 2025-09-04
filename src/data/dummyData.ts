export interface UserData {
  [key: string]: number;
}

export interface CalendarData {
  [date: string]: UserData[];
}

const generateDummyData = (): CalendarData => {
  const data: CalendarData = {};
  const today = new Date();
  
  const randomDates = [
    "01-09-2025", "02-09-2025", "03-09-2025", "05-09-2025", "08-09-2025",
    "10-09-2025", "12-09-2025", "15-09-2025", "18-09-2025", "20-09-2025",
    "22-09-2025", "25-09-2025", "28-09-2025", "30-09-2025"
  ];
  
  randomDates.forEach(date => {
    const userCount = Math.floor(Math.random() * 5) + 3; 
    const users: UserData[] = [];
    
    for (let i = 1; i <= userCount; i++) {
      users.push({
        [`user_${i}`]: Math.floor(Math.random() * 20) + 1 
      });
    }
    
    data[date] = users;
  });
  
  return data;
};

export const dummyCalendarData: CalendarData = generateDummyData();

export const getDataForDate = (date: string): UserData[] | null => {
  return dummyCalendarData[date] || null;
};

export const hasDataForDate = (date: string): boolean => {
  return Boolean(dummyCalendarData[date]);
};

export const formatDateForLookup = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getDatesWithData = (): string[] => {
  return Object.keys(dummyCalendarData);
};