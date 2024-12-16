export interface Event {
  id: string;
  type: 'fight' | 'happy' | 'special';
  title: string;
  description: string;
  date: Date;
  photoUrl?: string;
  reminder?: Date;
}

export interface CalendarDay {
  date: Date | null;
  isCurrentMonth: boolean;
  events?: Event[];
} 