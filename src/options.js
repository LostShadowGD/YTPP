function saveOptions(e) {
    e.preventDefault();

    let options = {};
    options["fix_video_cards"] = document.querySelector("#fix_video_cards").checked;
    options["hide_playables"] = document.querySelector("#hide_playables").checked;
    options["shrink_player_thumbnails"] = document.querySelector("#shrink_player_thumbnails").checked;
    options["hide_ai_features"] = document.querySelector("#hide_ai_features").checked;
    options["return_caps_abbreviations"] = document.querySelector("#return_caps_abbreviations").checked;

    browser.storage.sync.set({
        options: options,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        console.log(result);

        if (result["options"] == undefined) {
            result["options"] = {
                "fix_video_cards": "on",
                "hide_playables": "on",
                "shrink_player_thumbnails": "on",
                "hide_ai_features": "on",
                "return_caps_abbreviations": "on"
            };
        }

        document.querySelector("#fix_video_cards").checked = result["options"]["fix_video_cards"];
        document.querySelector("#hide_playables").checked = result["options"]["hide_playables"];
        document.querySelector("#shrink_player_thumbnails").checked = result["options"]["shrink_player_thumbnails"];
        document.querySelector("#hide_ai_features").checked = result["options"]["hide_ai_features"];
        document.querySelector("#return_caps_abbreviations").checked = result["options"]["return_caps_abbreviations"];
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("options");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);