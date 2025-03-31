export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

export const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const time = new Date(timeString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

export const formatDateToWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const weekday = weekdays[date.getDay()];
    return weekday;
};

export const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
};
