// Render users favorite slimes in the favorites tab

import { createSlime } from "../slime.js";

// function to showfavorite slimes
document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites");

    // determine whos profile page from the url
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("user") || "kevinaangstadt";

    async function loadFavorites() {
        try {
            //await the fetch response
            const response = await fetch(`../../starter-code/api/favorites/${username}.json`);
            if (!response.ok) {
                throw new Error(`Network response was not ok for ${username}.json`);
            }

            // await the parsing of the JSON data
            const data = await response.json();

            favoritesContainer.innerHTML = "";

            data.forEach(slime => {
                // Call the imported function which returns a complete HTMLElement
                const card = createSlime(slime);
                
                // Append the generated card directly to the container
                favoritesContainer.appendChild(card);
            });

        } catch (error) {
            console.error(`Error fetching ${username}.json`, error);
            favoritesContainer.innerHTML = `<p class="text-danger p-3">Failed to load favorites for @${username}.</p>`;
        }  
    }

    // execute async function
    if (username) {
        loadFavorites();
    } else {
        favoritesContainer.innerHTML = `<p class="text-muted p-3">No user specified in the URL.</p>`;
    }
});