// Function CreateProfileCard.js 
// To create a reusable profile card for all users
 
export const CreateProfileCard = function(user, isCurrentUser = false) {

// Find the profile image and add the user's image
const image = profileCard.querySelector("#profile_image");
image.src = user.profile_image_url;
image.alt = user.name;

// Add the name and username
profileCard.querySelector("#profile_name").textContent = user.name;
profileCard.querySelector("#profile_username").textContent = user.screen_name;

 // Add the user's description
  profileCard.querySelector("#profile_description").textContent = user.description;

// for the profile date
const joinedDate = new Date(user.created);

 profileCard.querySelector("#profile-joined").textContent =
    " Joined " + joinedDate.toLocaleString();

  // the following and followers count
 profileCard.querySelector("#profile_following").textContent =
     user.following_count + "Following";

    profileCard.querySelector("#profile_followers").textContent =
        user.followers_count + "Followers";

  // the Edit Profile button for only Kevin's profile
    if (!isCurrentUser) {
        profileCard.querySelector("#edit-profile").remove();
  }
  // Return profile card
    return profileCard;
};
