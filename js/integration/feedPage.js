// Feed Page Integration
// fetches the home timeline and displays slimes on feed.html
// import createSlime() to generate DOM elements
import { createSlime } from "../slime.js";

// Fetch the home timeline from the provided JSON.
async function loadHomeTimeline() {
    const response = await fetch(
        "../api/statuses/home_timeline.json"
    );

    if (!response.ok) {
        throw new Error("Failed to load the home timeline.");
    }

    return await response.json();
}

// Build and display a card for each slime.
async function renderFeed() {
    const container = document.getElementById("feed");

    if (!container) {
        console.error('Add an element with id="feed" to feed.html.');
        return;
    }

    container.textContent = "Loading slimes...";

    try {
        const slimes = await loadHomeTimeline();
        const posts = document.createDocumentFragment();

        slimes.forEach(function(slime) {
            posts.appendChild(createSlime(slime));
        });

        container.replaceChildren(posts);
    } catch (error) {
        console.error(error);
        container.textContent = "Could not load the feed. Please reload.";
    }
}

renderFeed();