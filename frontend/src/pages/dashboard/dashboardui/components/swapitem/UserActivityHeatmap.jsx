import React from 'react';
import './UserActivityHeatmap.css';

const activity = new Array(30).fill(0).map((_, i) => ({
  day: `Day ${i + 1}`,
  level: Math.floor(Math.random() * 5),
}));

export default function UserActivityHeatmap() {
  return (
    <section className="activity-heatmap">
      <h3>Activity Heatmap</h3>
      <div className="heatmap-grid">
        {activity.map((a, index) => (
          <div
            key={index}
            className={`heatmap-cell level-${a.level}`}
            aria-label={`${a.day}: Level ${a.level}`}
            title={`${a.day}: Level ${a.level}`}
          />
        ))}
      </div>
    </section>
  );
}
