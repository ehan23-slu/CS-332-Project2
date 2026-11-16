// fetches activity data and displays notifications on notifications.html

import { createNotificationCard } from "../CreateNotificationCard.js";

async function loadNotification() {
    const response = await fetch("../api/statuses/activity.json");

    if (!response.ok) {
        throw new Error("Failed to load notifications");
    }

    const activities = await response.json();

    const container = document.getElementById("notifications");

    activities.forEach(activity => {
        const card = createNotificationCard(activity);
        container.appendChild(card);
    });
}

loadNotification();

