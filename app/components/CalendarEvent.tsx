'use client';

interface CalendarEventProps {
  type: 'fight' | 'happy' | 'special';
  title: string;
}

export default function CalendarEvent({ type, title }: CalendarEventProps) {
  const colors = {
    fight: 'bg-red-100 text-red-800',
    happy: 'bg-green-100 text-green-800',
    special: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className={`text-xs p-1 rounded mt-1 truncate ${colors[type]}`}>
      {title}
    </div>
  );
} 