/**
 * Create a notification card using activity data.
 * @param {object} activity - Notification activity data
 * @returns {HTMLElement} The notification element
 */

export function createNotificationCard(activity) {
    const notification_card = document.createElement("div");
    notification_card.className = "d-flex align-items-start gap-3 border-bottom py-3";

    // create the icon, message, and notification content
    // note: fs - font size 
    // resource: https://getbootstrap.com/docs/6.0/utilities/font-size/
    const icon = document.createElement("i");
    icon.className = "fs-4";

    const message = document.createElement("p");
    message.className = "mb-2";

    // create a link to the user's profile
    const username = activity.user.screen_name.replace(/^@/, "");

    const userLink = document.createElement("a");
    userLink.href = `./profile.html?user=${encodeURIComponent(username)}`;
    userLink.className = "fw-bold text-body text-decoration-none";
    userLink.textContent = activity.user.name;

    const notification_content = document.createElement("div");
    notification_content.className = "text-body-secondary";

    // identify whether the notification is a reslime or a reply
    if (activity.reslimed_status) {
        icon.className = "bi bi-recycle fs-4 text-success fw-bold";
        message.append(userLink, " reslimed you");
        notification_content.textContent = activity.reslimed_status.text;

    } else if (activity.in_reply_to_status_id_str) {
        icon.className = "bi bi-chat-right-fill fs-4";
        icon.style.color = "#11caf0";
        message.append(userLink, " replied to you");
        notification_content.textContent = activity.text;
    }

    // create the user's profile image
    const img = document.createElement("img");
    const imagePath = activity.user.profile_image_url.replace(/^\//, "");
    img.src = new URL(
        "../starter-code/" + imagePath,
        import.meta.url
    ).href;
    img.className = "img-thumbnail rounded-2 object-fit-cover";
    img.width = 48;
    img.height = 48;
    img.alt = activity.user.name;

    // create a wrapper for the image and notification text
    const content_wrapper = document.createElement("div");
    content_wrapper.className = "flex-grow-1";

    // place the image above the notification message
    const image_wrapper = document.createElement("div");
    image_wrapper.className = "mb-2";
    image_wrapper.appendChild(img);

    // add the image, message, and slime content to the wrapper
    content_wrapper.append(image_wrapper, message, notification_content);

    // add the icon and wrapper to the notification card
    notification_card.append(icon, content_wrapper);

    return notification_card;
}
