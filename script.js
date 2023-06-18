let preferred_engine = localStorage.getItem("preferredEngine");

if (!preferred_engine) {
    preferred_engine = "ddg";
    localStorage.setItem("preferredEngine", preferred_engine);
}

document.getElementById("engine").value = preferred_engine;

handleTyping();
document.getElementById("search").focus();



function searchRedirect(e) {

    let preferred_engine = document.getElementById("engine").value;
    let search_query = document.getElementById("search").value;

    let search_engine = "https://duckduckgo.com/?q=";

    if (preferred_engine === "google")
        search_engine = "https://www.google.com/search?q=";
    else if (preferred_engine === "bing")
        search_engine = "https://www.bing.com/search?q=";
    else if (preferred_engine === "yahoo")
        search_engine = "https://search.yahoo.com/search?p=";
    else if (preferred_engine === "dogpile")
        search_engine = "https://www.dogpile.com/serp?q=";

    if (search_query)
        window.location.href = `${search_engine}${search_query}+site%3Akbin.social+OR+site%3Alemmy.ml+OR+site%3Afedia.io+OR+site%3Apawb.social+OR+site%3Abeehaw.org+OR+site%3Alemmy.blahaj.zone+OR+site%3Alemmy.dbzer0.com+OR+site%3Alemmy.world+OR+site%3Ahexbear.net+OR+site%3Alemmy.one+OR+site%3Afeddit.de+OR+site%3Alemmy.fmhy.ml+OR+site%3Ash.itjust.works+OR+site%3Alemmynsfw.com+OR+site%3Aprogramming.dev`;
    e.preventDefault();
}

function updateEngine() {

    let preferred_engine = document.getElementById("engine").value;

    localStorage.setItem("preferredEngine", preferred_engine);
}

function handleTyping() {
    let search_query = document.getElementById("search").value;

    if (search_query) {
        document.getElementById("submit").style.background = "rgb(33, 150, 243)";
        document.getElementById("search-icon").style.opacity = "1";
        document.getElementById("submit").style.cursor = "pointer";
        document.getElementById("x").style.display = "initial";
    } else {
        document.getElementById("submit").style.removeProperty("background");
        document.getElementById("search-icon").style.removeProperty("opacity");
        document.getElementById("submit").style.removeProperty("cursor");
        document.getElementById("x").style.removeProperty("display");
    }
}

function clearQuery() {
    document.getElementById("search").value = "";
    handleTyping();
    document.getElementById("search").focus();
}



document.getElementById("form").addEventListener('submit', searchRedirect);