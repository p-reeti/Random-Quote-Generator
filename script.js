let quote = document.getElementById("quote");
let author = document.getElementById("author");
let btn = document.getElementById("btn");
let copyBtn = document.getElementById("copy-btn");
let favoritesList = JSON.parse(localStorage.getItem("favorites")) || [];
const url = "https://dummyjson.com/quotes";


let getQuote = () => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        
            let randomIndex = Math.floor(Math.random() * data.quotes.length);
            let randomQuote = data.quotes[randomIndex]; 

            quote.textContent = `"${randomQuote.quote}"`; 
            author.textContent = `- ${randomQuote.author}`; 
        })
        .catch((error) => {
            console.log("Error fetching quote:", error);
        });
};

let copyQuote = () => {
    const quoteText = quote.textContent;
    const authorText = author.textContent;
    navigator.clipboard.writeText(`${quoteText} ${authorText}`)
        .then(() => {
            alert("Quote copied to clipboard!");
        })
        .catch((error) => {
            console.error("Error copying quote:", error);
        });
};


let addToFavorites = () => {
    const currentQuote = {
        text: quote.textContent,
        author: author.textContent,
    };
    
    
    if (!favoritesList.some(fav => fav.text === currentQuote.text)) {
        favoritesList.push(currentQuote);
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
        alert("Quote added to favorites!");
    } else {
        alert("Quote already in favorites!");
    }
};

window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);
copyBtn.addEventListener("click", copyQuote);
document.getElementById("favorite-btn").addEventListener("click", addToFavorites);
