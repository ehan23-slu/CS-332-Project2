// fetches activity data and displays notifications on notifications.html

import { createNotificationCard } from "../CreateNotificationCard.js";

async function loadNotification() {
    // await the fetch response
    const response = await fetch("../api/statuses/activity.json");

    if (!response.ok) {
        throw new Error("Failed to load notifications");
    }

    // await the parsing of the JSON data
    const activities = await response.json();

    // find the notifications container in HTML
    const container = document.getElementById("notifications");

    // create and display each notification card
    activities.forEach(activity => {
        const card = createNotificationCard(activity);
        container.appendChild(card);
    });
}

loadNotification();
