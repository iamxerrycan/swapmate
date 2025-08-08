import React, { useEffect, useState } from 'react';
import './UserNotificationsPanel.css';
import API from '../../../../../utils/api/axiosInstance';
import { Link } from 'react-router-dom';

export default function UserNotificationsPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get('/api/notifications'); // Protected by token
        setNotifications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li key={note._id} className={`notification ${note.isSeen ? 'seen' : 'unseen'}`}>
              <div className="note-message">
                {note.actionURL ? (
                  <Link to={note.actionURL}>{note.message}</Link>
                ) : (
                  note.message
                )}
              </div>
              <div className="note-time">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

















// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../../../../../utils/api/axiosInstance';
// import './UserNotificationsPanel.css';

// export default function UserNotificationsPanel() {
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await API.get('/api/notifications');
//         setNotifications(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error('Error fetching notifications:', err);
//         setNotifications([]);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleNotificationClick = (note) => {
//     if (note.actionURL) {
//       // Case 1: Full URL
//       if (note.actionURL.startsWith('http')) {
//         try {
//           const url = new URL(note.actionURL);
//           const path = url.pathname; // e.g., "/dashboard/swaps/6894fea78b5e5392e56cc023"
//           navigate(path);
//         } catch (err) {
//           console.error('Invalid URL:', err);
//         }
//       }
//       // Case 2: Relative URL
//       else {
//         navigate(note.actionURL);
//       }
//     }
//   };

//   return (
//     <div className="notifications-panel">
//       <h3>Notifications</h3>
//       <ul>
//         {notifications.map((note) => (
//           <li
//             key={note._id}
//             className={`notification ${note.isSeen ? 'seen' : 'unseen'}`}
//             onClick={() => handleNotificationClick(note)}
//             style={{ cursor: note.actionURL ? 'pointer' : 'default' }}
//           >
//             <div className="note-message">{note.message}</div>
//             <div className="note-time">{new Date(note.createdAt).toLocaleString()}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

