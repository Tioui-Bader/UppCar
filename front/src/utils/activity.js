/**
 * Shared utility to log user activities in localStorage
 */

export const logActivity = (type, details = {}) => {
  try {
    const saved = localStorage.getItem("userActivity");
    const activities = saved ? JSON.parse(saved) : [];
    
    const newActivity = {
      id: Date.now(),
      type, // 'favorite_add', 'favorite_remove', 'booking', 'view'
      details,
      timestamp: new Date().toISOString(),
    };
    
    // Keep only last 50 activities
    const updated = [newActivity, ...activities].slice(0, 50);
    localStorage.setItem("userActivity", JSON.stringify(updated));
    
    // Also track specific counts if needed
    if (type === 'view') {
        const viewed = JSON.parse(localStorage.getItem("viewedCars") || "[]");
        if (details.carId && !viewed.includes(details.carId)) {
            localStorage.setItem("viewedCars", JSON.stringify([...viewed, details.carId]));
        }
    }
    
    if (type === 'booking') {
        const reservations = JSON.parse(localStorage.getItem("userReservations") || "[]");
        localStorage.setItem("userReservations", JSON.stringify([details, ...reservations]));
    }

  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
