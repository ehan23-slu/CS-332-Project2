
// Fetches slime data and displays posts on feed.html

import { createSlime } from "../CreateSlime.js";

async function loadFeed() {
    try {
        // Fetch slime data
        const response = await fetch("../api/statuses/home_timeline.json");

        if (!response.ok) {
            throw new Error("Failed to load feed");
        }

        // Parse JSON data
        const slimes = await response.json();

        // Find the feed container in HTML
        const container = document.getElementById("feed");

        if (!container) {
            console.error("Feed container not found");
            return;
        }

        // Clear existing content
        container.replaceChildren();

        // Create and display each slime card
        slimes.forEach(slime => {
            const card = createSlime(slime);
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading feed:", error);
    }
}

loadFeed();
