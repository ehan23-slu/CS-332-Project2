// Show the users limes in the slimes tab in their profile
import { createSlime } from "../slime.js";

document.addEventListener("DOMContentLoaded", () => {
    const slimesContainer = document.getElementById("slimes");

    // get the profile forom the url
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("user") || "kevinaangstadt";

    async function loadSlimes() {
        try {
            // fetch .json slime data
            const response = await fetch(`../../starter-code/api/statuses/user_timeline/${username}.json`);
            if (!response.ok) {
                throw new Error(`Network response was not ok for ${username}.json`);
            }

            // await json data
            const data = await response.json();

            slimesContainer.innerHTML = "";

            data.forEach(slime => {
                // create slime from json data using createSlime()
                const card = createSlime(slime);

                // add to the container
                slimesContainer.appendChild(card);
            });

        } catch (error) {
            console.error(`error fetching ${username}.json`, error);
            slimesContainer.innerHTML = `<p class="text-danger p-3">Failed to load slimes for @${username}.</p>`;
        }   
    }
    // call async function
    if (username) {
        loadSlimes();
    } else {
        slimesContainer.innerHTML = `<p class="text-muted p-3">No user specified in the URL.</p>`;
    }
});