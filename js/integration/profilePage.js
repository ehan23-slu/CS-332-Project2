// fetches user profile data and displays it on profile.html
// import createProfileCard() and createSlime() to generate DOM elements

import { CreateProfileCard } from "../CreateProfileCard.js";

async function loadProfile() {

    // get the username from the URL
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user") || "kevinaangstadt";

    // fetch the corresponding user JSON
    const response = await fetch(`../api/user/get/${username}.json`);

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    // convert JSON to a JavaScript object
    const userData = await response.json();

    // check if this is the current user's profile
    const isCurrentUser = username === "kevinaangstadt";

    // generate the profile card
    const profileCard = CreateProfileCard(userData, isCurrentUser);

    // insert the card into profile.html
    const container = document.getElementById("profile-card");

    container.replaceChildren(profileCard);
}

loadProfile().catch(console.error);
