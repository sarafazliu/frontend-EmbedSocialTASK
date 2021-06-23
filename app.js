function loadCards(){
    let times=0;
    let cards = document.getElementsByName("card");
    let btn = document.getElementById("btn");
    for (let i=0;i<cards.length;i++){
        if (cards[i].style.display === "none") {
            cards[i].style.display = "block";
            times++;
        }
        if (cards[i+1]===undefined)
            btn.style.display = "none";
        if (times===4)
            return;
    }
}

function jsonDataFetch() {
    fetch("data.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const node = data
                .map(cardData => {
                    let logoPath = "";
                    if (cardData.source_type==="instagram")
                        logoPath = "icons/instagram-logo.svg";
                    else
                        logoPath = "icons/facebook.svg";

                    const date = new Date(cardData.date);
                    let dtf = date.toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })

                    return `<div class="card" name="card" style="display: none" onclick="showCard(this)">
                                <div class="profile-content">
                                    <div class="profile-image"><img src="${cardData.profile_image}"></div> 
                                    <div class="profile-info"><div class="name">${cardData.name}</div><div class="date">${dtf}</div></div>
                                    <div class="logo"><img src="${logoPath}"></div>
                                </div>
                                <div class="card-post"><img src="${cardData.image}"></div>
                                <div class="card-caption">${cardData.caption}</div>
                                <hr>
                                <div class="card-likes"><img src="icons/heart.svg"><span class="likes"> ${cardData.likes}</span></div>
                            </div>
                            `;
                }).join("");


            document.querySelector(".cards").insertAdjacentHTML("beforeend", node);

        })
        .then(loadCards)
}
jsonDataFetch();