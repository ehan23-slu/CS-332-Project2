/**
 * Creates a reusable profile card for a user.
 * @param {Object} user - User data from JSON
 * @param {boolean} isCurrentUser - Whether this is the current user
 * @returns {HTMLElement} The completed profile card
 */

export const CreateProfileCard = function(user, isCurrentUser = false) {

    // Copy the profile template
    const template = document.getElementById("profile-template");
    const profileCard = template.content.firstElementChild.cloneNode(true);

    // Find the profile image and add the user's image
    const image = profileCard.querySelector("#profile_image");

    image.src = user.profile_image_url.replace(
        "/assets/", "../assets/"
    );
    image.alt = user.name;

    // Add the name and username
    profileCard.querySelector("#profile_name").textContent = user.name;
    profileCard.querySelector("#profile_username").textContent =
        user.screen_name;

    // Add the user's description
    profileCard.querySelector("#profile_description").textContent =
        user.description;

    // Add the profile date
    const joinedDate = new Date(user.created);

    profileCard.querySelector("#profile-joined").textContent =
        "Joined " + joinedDate.toLocaleDateString();

    // Add following and followers counts
    profileCard.querySelector("#profile_following").textContent =
        user.friends_count + " Following";

    profileCard.querySelector("#profile_followers").textContent =
        user.followers_count + " Followers";

    // Show Edit Profile button only for the current user
    if (!isCurrentUser) {
        profileCard.querySelector("#edit-profile").remove();
    }

    return profileCard;
};
