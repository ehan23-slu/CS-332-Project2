// function to favorite slimes
document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById("favorites");

    // determine whos profile page from the url
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get(user);

    async function loadFavorites() {
        try {
            //await the fetch response
            const response = await fetch(`${username}.json`);
            if (!response.ok) {
                throw new Error(`Network response was ok for ${username}.json`);
            }

            // await the parsing of the JSON data
            const data = await response.json;

            favoritesContainer.innerHTML = "";

            data.forEach(slime => {
                const card = document.createElement("div");
                card.className = "card mb-3 border-bottom rounded-0";

                const postDate = new Date(slime.created_at).toLocaleDateString(undefined, {
                    month: 'short', day: 'numeric', year: 'numeric'
                });

                card.innerHTML = `
                <div class="card-body d-flex">
                        <div class="me-3">
                            <img src="${slime.user.profile_image_url}" alt="${slime.user.name}" class="rounded-circle bg-secondary" width="48" height="48">
                        </div>
                        <div class="w-100">
                            <div class="mb-1">
                                <strong class="fs-5">${slime.user.name}</strong> 
                                <span class="text-muted">${slime.user.screen_name}</span>
                                <span class="text-muted"> · ${postDate}</span>
                            </div>
                            <p class="mb-2">${slime.text}</p>
                            <div class="d-flex text-muted justify-content-between" style="max-width: 300px;">
                                <span><i class="bi bi-chat"></i> ${slime.reply_count}</span>
                                <span><i class="bi bi-arrow-repeat"></i> ${slime.reslime_count}</span>
                                <span class="text-danger"><i class="bi bi-heart-fill"></i> ${slime.favorite_count}</span>
                            </div>
                        </div>
                    </div>
                    `;

                    favoritesContainer.appendChild(card);
            });

        } catch (error) {

            console.error(`Error fetching ${username}.json`, error);
            favoritesContainer.innerHTML = `<p class="text-danger p-3">Failed to load favorites for @${username}.</p>`;
        }  
    }

    // execute async function
    loadFavorites();

})
