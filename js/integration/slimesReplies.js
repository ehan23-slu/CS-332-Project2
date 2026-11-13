
import { createSlime } from "../slime.js";

const replies_list = [
    "611fcaf640148d94e2a469c7.json",
    "6175c9a2969d515951edefa4.json",
    "6175c9e3969d515951edefa5.json",
    "6175c92c969d515951edefa3.json",
    "6175ca7a969d515951edefa7.json",
    "6175ca53969d515951edefa6.json",
    "6175cb4a969d515951edefa9.json",
    "6175cb4a969d515951edefa9.json",
    "6175ccbe969d515951edefaa.json",
    "6175ccc7969d515951edefab.json",
    "6175ccd3969d515951edefac.json",
    "6175ccd3969d515951edefac.json",
    "6175cce8969d515951edefae.json",
    "6175ccf1969d515951edefaf.json",
    "6175ccfa969d515951edefb0.json"
]

// search the replies to determine which author wrote them
async function searchReplies(username) {
        const matchingreplies = [];

        for (const filename of replies_list){
            try {

                const fileURL = new URL(
                    `../../starter-code/api/statuses/replies/${filename}`, import.meta.url
                );

                const response = await fetch(fileURL);

                if (!response.ok) {
                    continue;
                }

                const jsonData = await response.json();

                //make array of posts
                let posts;
                if (Array.isArray(jsonData)) {
                    posts = jsonData;
                } else {
                    posts = [jsonData];
                }

                // iterate through posts and check if the user matches
                for (const post of posts) {
                    // get user from json data and remove @
                    const screen_name = post.user.screen_name;
                    // remove the @ symbol
                    const usr = screen_name.slice(1); 
                    if (usr === username) {
                        post._sourceFile = filename;
                        matchingreplies.push(post);
                    }
                }
            } catch (error) {
                console.error(`Error processing ${filename}`, error);
            }
        }
        console.log(`Found ${matchingreplies.length} posts by ${username}`);

        return matchingreplies;
    }

document.addEventListener("DOMContentLoaded", () =>{
    const repliesContainer = document.getElementById("replies");

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("user") || "ed";

    async function loadReplies() {

        try {

            const replies = await searchReplies(username);   
            
            repliesContainer.innerHTML = "";
        
            // create a slime for each reply
            replies.forEach(slime => {
                
                const card = createSlime(slime);
        
                repliesContainer.appendChild(card);
            });
        } catch (error) {
            repliesContainer.innerHTML = `<p class="text-danger p-3">Failed to load slimes for @${username}.</p>`
            console.error("Crash inside loadReplies:", error);
        }
    }

    if (username) {
        loadReplies();
    } else {
        repliesContainer.innerHTML = `<p class="text-muted p-3">No user specified in the URL.</p>`;
    }

});