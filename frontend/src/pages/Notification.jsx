import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    fetchNotifications();
  };

  return (
    <div className="relative">
      <button onClick={() => setShow(!show)} className="relative">
        🔔
        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded p-2 z-50">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-2 border-b cursor-pointer ${!n.isRead ? 'bg-gray-100' : ''}`}
                onClick={() => markAsRead(n._id)}
              >
                <p className="text-sm">{n.message}</p>
                <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
