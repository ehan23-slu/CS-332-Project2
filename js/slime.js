const TRAIL_SLIME_ID = "611fcaf640148d94e2a469c7";
function createAuthorLink(user) {
// The starter data stores handles with a leading @.
const username = user.screen_name.replace(/^@/, "");
const link = document.createElement("a");
link.href = `./profile.html?user=${encodeURIComponent(username)}`;
link.textContent = user.display_name ?? user.name ?? user.screen_name;
return link;
}
/**
Build one SlugFest post from the feed, profile timeline, or favorites JSON.
@returns {HTMLElement} A card ready to append to the page.
/
export function createSlime(slimeData) {
// A reslime wraps the original post and identifies who shared it.
const slime = slimeData.reslimed_status ?? slimeData;
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
header.className = "d-flex align-items-center gap-2 mb-2";
const avatar = document.createElement("img");
avatar.className = "rounded-circle flex-shrink-0 object-fit-cover";
// Keep the starter asset path relative to the HTML page.
avatar.src = "." + user.profile_image_url;
avatar.width = 48;
avatar.height = 48;
avatar.alt = "";
const author = document.createElement("div");
author.className = "text-break";
author.append(createAuthorLink(user), " ", user.screen_name);
const postedAt = new Date(slime.created_at);
const time = document.createElement("time");
time.className = "d-block small text-body-secondary";
time.dateTime = postedAt.toISOString();
time.textContent = postedAt.toLocaleDateString();
author.append(time);
header.append(avatar, author);
const message = document.createElement("p");
message.className = "card-text text-break";
message.textContent = slime.text;
const stats = document.createElement("footer");
stats.className = "d-flex flex-wrap gap-3 small text-body-secondary";
const replyLabel = `${slime.reply_count} ${slime.reply_count === 1 ? "reply" : "replies"}`;
const replies = document.createElement(slime.id_str === TRAIL_SLIME_ID ? "a" : "span");
if (slime.id_str === TRAIL_SLIME_ID) {
replies.href = "./slime.html";
}
replies.textContent = replyLabel;
stats.append(
replies,
`${slime.reslime_count} reslime(s)`,
`${slime.favorite_count} favorite(s)`
);
body.append(header, message, stats);
return card;
}
