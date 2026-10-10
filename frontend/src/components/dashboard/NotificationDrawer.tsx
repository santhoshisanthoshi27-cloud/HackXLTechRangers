import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { X, CheckCheck, Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-100">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Notifications</h3>
                <p className="text-xs text-slate-500">Live demo activity updates</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-purple-600 hover:text-purple-800 font-semibold p-1.5 hover:bg-purple-50 rounded-lg flex items-center gap-1 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark all</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No notifications yet</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-slate-50/60 border-slate-200/80 text-slate-600'
                      : 'bg-purple-50/50 border-purple-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                      )}
                      <h4 className="text-sm font-semibold">{notif.title}</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{notif.message}</p>
                  {notif.link && (
                    <Link
                      to={notif.link}
                      onClick={onClose}
                      className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700"
                    >
                      <span>View details</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
