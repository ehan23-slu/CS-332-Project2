
const TRAIL_SLIME_ID = "611fcaf640148d94e2a469c7";

function createAuthorLink(user) {
    // The starter data stores handles with a leading @.
    const username = user.screen_name.replace(/^@/, "");
    const link = document.createElement("a");
    link.href = `./profile.html?user=${encodeURIComponent(username)}`;
    link.textContent = user.screen_name;
    if (user.name) {
        link.textContent = user.name;
    }
    if (user.display_name) {
        link.textContent = user.display_name;
    }
    return link;
}

/**
 * Build one SlugFest post from the feed, profile timeline, or favorites JSON.
 * @returns {HTMLElement} A card ready to append to the page.
 */
export function createSlime(slimeData) {
    // A reslime wraps the original post and identifies who shared it.
    let slime = slimeData;
    if (slimeData.reslimed_status) {
        slime = slimeData.reslimed_status;
    }
    const user = slime.user;

    const card = document.createElement("article");
    card.className = "card mb-3";

    const body = document.createElement("div");
    body.className = "card-body";
    card.append(body);

    if (slimeData.reslimed_status) {
        const reslime = document.createElement("p");
        reslime.className = "small text-body-secondary mb-2";
        reslime.append(createAuthorLink(slimeData.user), " reslimed");
        body.append(reslime);
    }

    const header = document.createElement("header");
    header.className = "d-flex align-items-start gap-2 mb-2";
    
    const avatar = document.createElement("img");
    avatar.className = "img-thumbnail rounded-2 flex-shrink-0 object-fit-cover";
    // Resolve from js/slime.js so assets work with root or skeleton HTML.
    const imagePath = user.profile_image_url.replace(/^\//, "");
    avatar.src = new URL("../starter-code/" + imagePath, import.meta.url).href;
    avatar.width = 48;
    avatar.height = 48;
    avatar.alt = "";

    const author = document.createElement("div");
    author.className = "text-break";
    author.append(createAuthorLink(user), " ", user.screen_name);

    const postedAt = new Date(slime.created_at);
    const time = document.createElement("time");
    time.className = "text-body-secondary";
    time.dateTime = postedAt.toISOString();
    time.textContent = postedAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
        });
    author.append(" · ", time);

    const message = document.createElement("p");
    message.className = "card-text text-break mt-1 mb-0";
    message.textContent = slime.text;

    author.append(message);
    header.append(avatar, author);

    const stats = document.createElement("footer");
    stats.className =
        "d-flex justify-content-between align-items-center mt-3 text-body-secondary";

    // Reply
    let replies = document.createElement("span");

    if (slime.id_str === TRAIL_SLIME_ID) {
        replies = document.createElement("a");
        replies.href = "./slime.html";
    }

    replies.className =
        "d-inline-flex align-items-center gap-2 text-decoration-none";

    const replyIcon = document.createElement("i");
    replyIcon.className = "bi bi-chat-right";

    const replyCount = document.createElement("span");
    replyCount.textContent = slime.reply_count ?? 0;

    replies.append(replyIcon, replyCount);

    // Reslime
    const reslimes = document.createElement("span");
    reslimes.className = "d-inline-flex align-items-center gap-2";

    const reslimeIcon = document.createElement("i");
    reslimeIcon.className = "bi bi-recycle";

    const reslimeCount = document.createElement("span");
    reslimeCount.textContent = slime.reslime_count ?? 0;

    reslimes.append(reslimeIcon, reslimeCount);

    // Favorite
    const favorites = document.createElement("span");
    favorites.className = "d-inline-flex align-items-center gap-2";

    const favoriteIcon = document.createElement("i");
    favoriteIcon.className = "bi bi-heart";

    const favoriteCount = document.createElement("span");
    favoriteCount.textContent = slime.favorite_count ?? 0;

    favorites.append(favoriteIcon, favoriteCount);

    // Share
    const share = document.createElement("span");
    share.className = "d-inline-flex align-items-center";

    const shareIcon = document.createElement("i");
    shareIcon.className = "bi bi-upload";

    share.append(shareIcon);

    stats.append(replies, reslimes, favorites, share);

    body.append(header, stats);
    return card;
}
