import React from 'react';
import './UpcomingEvents.css';

const events = [
  { id: 1, title: 'Swap meetup', date: '2025-08-10' },
  { id: 2, title: 'Item Pickup', date: '2025-08-15' },
];

export default function UpcomingEvents() {
  return (
    <div className="upcoming-events">
      <h3>Upcoming Events</h3>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            <strong>{e.title}</strong>
            <span>{e.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
