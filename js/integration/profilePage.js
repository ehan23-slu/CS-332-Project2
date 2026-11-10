// Profile Page Integration
// fetches user profile data and displays it on profile.html
// import createProfileCard() and createSlime() to generate DOM elements

import { CreateProfileCard } from "../CreateProfileCard.js";

async function loadProfile() {

    // 1. Get the username from the URL
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user") || "kevinaangstadt";

    // 2. Fetch the corresponding user JSON
    const response = await fetch(`../api/user/get/${username}.json`);

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    // 3. Convert JSON to a JavaScript object
    const userData = await response.json();

    // 4. Check if this is the current user's profile
    const isCurrentUser = username === "kevinaangstadt";

    // 5. Generate the profile card
    const profileCard = CreateProfileCard(userData, isCurrentUser);

    // 6. Insert the card into profile.html
    const container = document.getElementById("profile-card");

    container.replaceChildren(profileCard);
}

loadProfile().catch(console.error);
