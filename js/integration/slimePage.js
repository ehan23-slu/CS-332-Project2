// Slime Page Integration
// fetches a specific slime and its replies for slime.html
// integrate shared slime-related functions
// Load the required slime trail and use the shared renderer for every post.
import { createSlime } from "../slime.js";

const SLIME_ID = "611fcaf640148d94e2a469c7";

/** Fetch the original slime and its list of replies. */
async function loadSlimeTrail() {
    // These URLs are relative to this module, not to the HTML page.
    const slimeURL = new URL(
        "../../starter-code/api/statuses/show/" + SLIME_ID + ".json",
        import.meta.url
    );
    const repliesURL = new URL(
        "../../starter-code/api/statuses/replies/" + SLIME_ID + ".json",
        import.meta.url
    );

    const slimeResponse = await fetch(slimeURL);
    if (!slimeResponse.ok) {
        throw new Error("Failed to load the original slime.");
    }
    const slime = await slimeResponse.json();

    const repliesResponse = await fetch(repliesURL);
    if (!repliesResponse.ok) {
        throw new Error("Failed to load the replies.");
    }
    const replies = await repliesResponse.json();

    return { slime: slime, replies: replies };
}

/** Insert the original post first, followed by its replies. */
async function renderSlimeTrail() {
    const container = document.getElementById("slime-trail");
    if (!container) {
        console.error('Add an element with id="slime-trail" to slime.html.');
        return;
    }

    container.textContent = "Loading slime trail...";

    try {
        const data = await loadSlimeTrail();
        const trail = document.createDocumentFragment();

        trail.appendChild(createSlime(data.slime));

        const heading = document.createElement("h2");
        heading.className = "h5 mt-4 mb-3";
        heading.textContent = "Replies";
        trail.appendChild(heading);

        data.replies.forEach(function(reply) {
            trail.appendChild(createSlime(reply));
        });

        if (data.replies.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No replies yet.";
            trail.appendChild(message);
        }

        container.replaceChildren(trail);
    } catch (error) {
        console.error(error);
        const message = document.createElement("p");
        message.className = "text-danger";
        message.setAttribute("role", "alert");
        message.textContent = "Could not load the slime trail. Please reload the page.";
        container.replaceChildren(message);
    }
}

// Module scripts run after the HTML has been parsed.
renderSlimeTrail();
