var preferred_engine = localStorage.getItem("preferredEngine");
if (!preferred_engine) {
    preferred_engine = "google_acc";
    localStorage.setItem("preferredEngine", preferred_engine);
}
document.getElementById("engine").value = preferred_engine;

var network_toggles = localStorage.getItem("networkToggles")?.split(',').map(x => (x == 'true') ? true : false);
if (!network_toggles) {
    network_toggles = [true, true, false, false];
    localStorage.setItem("networkToggles", network_toggles);
}
document.getElementById("lemmy-toggle").checked = network_toggles[0];
document.getElementById("mbin-toggle").checked = network_toggles[1];
document.getElementById("mastodon-toggle").checked = network_toggles[2];
document.getElementById("peertube-toggle").checked = network_toggles[3];

document.getElementById("search").value = sessionStorage.getItem("searchQuery");

updateEngine();
handleTyping();

document.getElementById("search").focus();



function searchRedirect(e) {

    var preferred_engine = document.getElementById("engine").value;
    var search_query = document.getElementById("search").value;

    var search_engine = "https://duckduckgo.com/?q=";

    if (preferred_engine === "google")
        search_engine = "https://www.google.com/search?q=";
    else if (preferred_engine === "bing")
        search_engine = "https://www.bing.com/search?q=";
    else if (preferred_engine === "yahoo")
        search_engine = "https://search.yahoo.com/search?p=";
    else if (preferred_engine === "dogpile")
        search_engine = "https://www.dogpile.com/serp?q=";
    else if (preferred_engine === "kagi")
        search_engine = "https://kagi.com/search?q=";
    else if (preferred_engine === "startpage")
        search_engine = "https://www.startpage.com/sp/search?query=";
    else if (preferred_engine === "brave")
        search_engine = "https://search.brave.com/search?q=";
    else if (preferred_engine === "qwant")
        search_engine = "https://www.qwant.com/?q=";
    else if (preferred_engine === "ecosia")
        search_engine = "https://www.ecosia.org/search?q=";

    if (search_query) {
        if (preferred_engine.includes("_acc")) {
            var network_toggles = [document.getElementById("lemmy-toggle").checked,
                                   document.getElementById("mbin-toggle").checked,
                                   document.getElementById("mastodon-toggle").checked,
                                   document.getElementById("peertube-toggle").checked];

            var lemmy_query = 'intext%3A"modlog"+%26+"instances"+%26+"docs"+%26+"code"+%26+"join-lemmy"',
                mbin_query = 'intext%3A"powered+by+mbin"',
                mastodon_query = 'intext%3A"part+of+the+decentralized+social+network+powered+by+mastodon"',
                peertube_query = 'intext%3A"powered+by+peertube"';

            var nlist_query = (network_toggles[0] ? lemmy_query : "") +
                ((network_toggles[0] && (network_toggles[1] || network_toggles[2] || network_toggles[3])) ? "+%7C+" : "") +
                (network_toggles[1] ? mbin_query : "") +
                ((network_toggles[1] && (network_toggles[2] || network_toggles[3])) ? "+%7C+" : "") +
                (network_toggles[2] ? mastodon_query : "") +
                ((network_toggles[2] && network_toggles[3]) ? "+%7C+" : "") +
                (network_toggles[3] ? peertube_query : "");

            if (preferred_engine === "google_acc")
                window.location.href = `https://www.google.com/search?q=${search_query}+(${nlist_query})`;
        } else
            window.location.href = `${search_engine}${search_query}+(site%3Apixelfed.social+OR+site%3Amastodon.social+OR+site%3Amstdn.social+OR+site%3Alemmy.world+OR+site%3Alemm.ee+OR+site%3Ash.itjust.works+OR+site%3Ahexbear.net+OR+site%3Alemmy.dbzer0.com+OR+site%3Afeddit.org+OR+site%3Afedia.io+OR+site%3Apixelfed.social+OR+site%3Apixelfed.de+OR+site%3Amisskey.io+OR+site%3Aphijkchu.com+OR+site%3Aloops.video)`;
        sessionStorage.setItem("searchQuery", search_query);
    }

    e.preventDefault();
    return false;
}

function updateEngine() {

    var network_toggles = [document.getElementById("lemmy-toggle").checked,
    document.getElementById("mbin-toggle").checked,
    document.getElementById("mastodon-toggle").checked,
    document.getElementById("peertube-toggle").checked];

    localStorage.setItem("networkToggles", network_toggles);

    var preferred_engine = document.getElementById("engine").value;

    if (preferred_engine.includes("_acc")) {
        document.querySelector("h3").style.display = "initial";
        document.getElementById("network-selector").style.display = "grid";
        document.querySelectorAll('[type="checkbox"]').forEach(checkbox => {
            checkbox.style.display = "initial";
        });
        document.querySelectorAll(".checkbox-label").forEach((label) => {
            label.style.display = "initial";
        });
    } else {
        document.querySelector("h3").style.removeProperty("display");
        document.getElementById("network-selector").style.removeProperty("display");
        document.querySelectorAll('[type="checkbox"]').forEach(checkbox => {
            checkbox.style.removeProperty("display");
        });
        document.querySelectorAll(".checkbox-label").forEach(label => {
            label.style.removeProperty("display");
        });
    }

    localStorage.setItem("preferredEngine", preferred_engine);
    return false;
}

function handleTyping() {
    var search_query = document.getElementById("search").value;

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
    return false;
}

function clearQuery() {
    document.getElementById("search").value = "";
    handleTyping();
    document.getElementById("search").focus();
    return false;
}



document.getElementById("form").addEventListener('submit', searchRedirect);
