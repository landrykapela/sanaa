const closeButton = document.querySelector("#btn-close");
const overlay = document.querySelector("#overlay");
let myArts = [];
if (closeButton) {
  closeButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
}

const getArts = () => {
  return new Promise((resolve, reject) => {
    fetch("data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.info("response: ", data);
        resolve(data.arts);
      })
      .catch((error) => {
        console.error("getArts(): ", error);
        reject(error);
      });
  });
};

const drawArts = (container, arts, limit) => {
  container.innerHTML = "";
  arts = arts.sort((a, b) => {
    return b.loves - a.loves;
  });
  arts.forEach((art) => {
    console.log("art name: ", art.id);
    const card = document.createElement("article");

    card.classList.add("card");
    const cardHead = document.createElement("div");
    cardHead.id = "h-" + art.id;
    cardHead.classList.add("card-head");
    cardHead.style.backgroundImage = "url(./images/" + art.image[0] + ")";
    // card.appendChild(cardHead);

    const cardData = document.createElement("div");
    cardData.id = art.id;
    cardData.classList.add("card-data");
    const nameEl = document.createElement("h4");
    nameEl.textContent = art.name;
    cardData.appendChild(nameEl);
    const sizeEl = document.createElement("span");
    sizeEl.textContent = "Dimension: " + art.size;
    cardData.appendChild(sizeEl);
    const lineBreak = document.createElement("br");
    cardData.appendChild(lineBreak);
    const catEl = document.createElement("span");
    catEl.textContent = "Category: " + art.category;
    cardData.appendChild(catEl);
    cardData.appendChild(lineBreak);
    const button = document.createElement("div");
    button.classList.add("button");
    button.textContent = "Buy for " + art.price;
    cardData.appendChild(button);
    cardHead.appendChild(cardData);
    card.appendChild(cardHead);
    container.appendChild(card);

    // cardHead.addEventListener("click", (event) => {
    //   let id = event.target.id;

    //   let art = myArts.filter((a) => {
    //     console.log("id: ", id + "/" + a.id);
    //     return a.id == id.split("-")[1];
    //   })[0];
    //   showOverlay(art);
    // });

    cardData.addEventListener("click", (event) => {
      let id = event.target.id;

      let art = myArts.filter((a) => {
        console.log("id: ", id + "/" + a.id);
        return a.id == id;
      })[0];
      showOverlay(art);
    });
  });
};

//shwo art detail in overlay
const showOverlay = (art) => {
  const container = document.querySelector("#container");
  container.classList.add("blur");
  console.log("overlay: ", art);
  window.scrollTo(0, 0);
  let activeThumbnail = art.image[0];
  overlay.classList.remove("hidden");
  overlay.classList.add("overlay");
  const galleryView = document.createElement("div");
  galleryView.classList.add("gallery-view");
  const thumbnailSet = document.createElement("div");
  thumbnailSet.classList.add("thumbnail-set");
  const mainImage = document.createElement("img");
  art.image.forEach((image) => {
    let img = document.createElement("img");
    img.classList.add("thumbnail");
    img.src = "images/" + image;
    thumbnailSet.appendChild(img);

    img.addEventListener("click", () => {
      activeThumbnail = img.src;
      mainImage.src = activeThumbnail;
    });
  });
  const nameEl = document.createElement("p");
  nameEl.classList.add("text-white");
  nameEl.textContent = "Name: " + art.name;
  const dimEl = document.createElement("p");
  dimEl.classList.add("text-white");
  dimEl.textContent = "Dimension: " + art.size;
  const priceEl = document.createElement("p");
  priceEl.classList.add("text-accent");
  priceEl.textContent = "Price: " + art.price;

  const artistEl = document.createElement("p");
  artistEl.classList.add("text-white");
  artistEl.textContent = "Artist: " + art.artist;
  const dateEl = document.createElement("p");
  dateEl.classList.add("text-white");
  dateEl.textContent = "Date: " + art.date;
  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("text-white");
  descriptionEl.textContent = art.description;

  const purchaseButton = document.createElement("div");
  purchaseButton.classList.add("button");
  purchaseButton.textContent = "BUY";
  const div = document.createElement("div");
  div.appendChild(nameEl);
  div.appendChild(dimEl);
  div.appendChild(artistEl);
  div.appendChild(dateEl);
  div.appendChild(descriptionEl);
  div.appendChild(priceEl);
  div.appendChild(purchaseButton);
  thumbnailSet.appendChild(div);
  galleryView.appendChild(thumbnailSet);

  mainImage.classList.add("gallery-image");
  mainImage.alt = art.name;
  mainImage.src = "images/" + activeThumbnail;
  galleryView.appendChild(mainImage);
  const closeBut = document.createElement("div");
  closeBut.id = "btn-close";
  closeBut.classList.add("button_round");
  closeBut.textContent = "X";
  galleryView.appendChild(closeBut);
  overlay.appendChild(galleryView);
  document.body.style.overflow = "hidden";

  closeBut.addEventListener("click", () => {
    overlay.classList.remove("overlay");
    overlay.classList.add("hidden");
    overlay.innerHTML = "";
    document.body.style.overflow = "auto";
    container.classList.remove("blur");
  });
  thumbnailSet.childNodes.forEach((cn) => {
    if (cn.nodeType == "img") {
      cn.addEventListener("click", () => {
        activeThumbnail = cn.src;
        console.log("thum cl: ", activeThumbnail);
        mainImage.src = activeThumbnail;
      });
    }
  });
};
if (window.location.pathname == "/gallery.html") {
  getArts()
    .then((arts) => {
      myArts = arts;
      document.querySelector("#spinner").style.display = "none";
      const container = document.querySelector("#container");
      searchBox = document.querySelector("#search");
      if (myArts && myArts.length > 0) {
        if (searchBox) {
          searchBox.addEventListener("change", (event) => {
            let search = event.target.value.toLowerCase().trim();
            let filteredArts = arts.filter((art) => {
              return (
                art.name.toLowerCase() === search ||
                art.category.toLowerCase() === search
              );
            });
            drawArts(container, filteredArts);
          });
        }
        drawArts(container, myArts);
      }
    })
    .catch((error) => {
      console.log("err: ", error);
    });
}
