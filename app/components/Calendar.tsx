'use client';

import { useState } from "react";
import EventModal from "./EventModal";
import { CalendarDay } from "../types/events";
import CalendarEvent from './CalendarEvent';
import { Event } from '../types/events';

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // Add empty cells for days before the first of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ date: null, isCurrentMonth: false });
  }
  
  // Add the days of the current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true
    });
  }
  
  return days;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(), // Simple ID generation
    };
    setEvents(prev => [...prev, newEvent]);
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const calendarDays = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <button 
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map(day => (
          <div 
            key={day} 
            className="h-8 flex items-center justify-center text-sm text-gray-500"
          >
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              min-h-[100px] border rounded-lg p-2 
              ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'} 
              ${day.date ? 'cursor-pointer hover:bg-gray-50' : ''}
            `}
            onClick={() => day.date && handleDateClick(day.date)}
          >
            {day.date?.getDate()}
            {day.date && getEventsForDate(day.date).map(event => (
              <CalendarEvent
                key={event.id}
                type={event.type}
                title={event.title}
              />
            ))}
          </div>
        ))}
      </div>

      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
} 