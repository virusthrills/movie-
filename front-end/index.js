const url =
  "https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&year_max=2024&series_granularity=show&genres=action&order_di";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "871325a076mshb5b82bf3e688633p1725a3jsna3a89b72a82b",
    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
  },
};
const content = document.querySelector(".content");
const title = document.getElementById("title");
const synopsis = document.getElementById("synopsis");
const search = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const poster = document.getElementById("poster");
const video = document.getElementById("video");
const searchList = document.getElementById("search-list");
let searchtitle = document.getElementById("search-title");

async function getAnimeInfo() {
  try {
    // const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(data);

    let arr = data["shows"];
    arr.forEach((item) => {
      console.log(item.title);
      let posterLink = item.imageSet.verticalPoster.w360;
      let posterName = item.title;
      // console.log(posterName);
      item = document.createElement("div");
      item.className = "pic";
      let img = document.createElement("img");
      img.id = "poster";
      img.src = posterLink;
      let overlay = document.createElement("div");
      overlay.className = "overlay";
      let h2 = document.createElement("h2");
      h2.id = "overlay";
      h2.append(posterName);
      item.append(img);
      item.append(overlay);
      overlay.append(h2); // appending h2 inside overlay div
      content.append(item);
      // console.log(item);
    });

    console.log();
  } catch (error) {
    console.error(error);
  }
}

getAnimeInfo();
// this is for search functionality
search.addEventListener("input", (e) => {
  let searchTerm = e.target.value.trim();
  console.log(searchTerm);
  const searchUrl = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${searchTerm}&show_type=movie&output_language=en`;
  const fetchdata = async () => {
    try {
      const response = await fetch(searchUrl, options);
      const searchData = await response.json();
      // searchtitle.textContent = searchData[0].title;

      arr = searchData;
      arr.forEach((element) => {
        searchtitle = element.title;
        let searchpic = element.imageSet.verticalPoster.w240;
        element = document.createElement("li");
        element.className = "search-li";
        const img = document.createElement("img");
        img.id = "searchimg";
        img.src = searchpic;
        element.append(img);
        element.append(searchtitle);
        searchList.append(element);
        console.log(element);

        // let  = se.imageSet.verticalPoster.w360;
        // let posterName = elements.title;
        // let item = document.createElement("div");
        // item.className = "pic";
        // let img = document.createElement("img");
        // img.id = "poster";
        // img.src = posterLink;
        // let overlay = document.createElement("div");
        // overlay.className = "overlay";
        // let h2 = document.createElement("h2");
        // h2.id = "overlay";
        // h2.append(posterName);
        // item.append(img);
        // item.append(overlay);
        // overlay.append(h2); // appending h2 inside overlay div
        // content.append(item);
        // console.log(item);
      });

      console.log(searchData[0].title);
    } catch (error) {
      console.error(error);
    }
  };
  fetchdata();
});
// Search functionality ends here
