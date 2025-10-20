import { Dot } from 'lucide-react';

export default function NotificationsCards({ notifications }) {
    //Calcolo approsimativo
    function timeAgo(createdAt) {
        const now = new Date();
        const created = new Date(createdAt);

        const diffMs = now - created;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return diffSec <= 1 ? "1 secondo fa" : `${diffSec} secondi fa`;
        if (diffMin < 60) return diffMin === 1 ? "1 minuto fa" : `${diffMin} minuti fa`;
        if (diffHour < 24) return diffHour === 1 ? "1 ora fa" : `${diffHour} ore fa`;
        if (diffDay < 30) return diffDay === 1 ? "1 giorno fa" : `${diffDay} giorni fa`;

        // mesi e anni usando Date
        const yearDiff = now.getFullYear() - created.getFullYear();
        const monthDiff = now.getMonth() - created.getMonth() + yearDiff * 12;

        if (monthDiff < 12) return monthDiff <= 1 ? "1 mese fa" : `${monthDiff} mesi fa`;

        const years = Math.floor(monthDiff / 12);
        return years <= 1 ? "1 anno fa" : `${years} anni fa`;
    }
    
    return (
        <>
            {notifications.map(notification => (
                <li key={notification.id} className="flex flex-cols gap-1 items-center py-2">
                    {notification.read ? null : <span><Dot className="text-blue-500" /></span>}
                    <div>
                        <p className="font-medium">📦 Nuova vendita!</p>
                        <p className="text-gray-600">{notification.message}</p>
                        <span className="text-xs text-gray-400">{timeAgo(notification.created_at)}</span>
                    </div>
                </li>
            ))}
        </>
    )
}