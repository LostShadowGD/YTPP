function walkAndReplaceText(root, replacer) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;

    while ((node = walker.nextNode())) {
        node.nodeValue = replacer(node.nodeValue);
    }
}

async function fixVideoCards() {
    // return dot between metadatas
    try {
        let videoCardMetadataSplitters = document.querySelectorAll(".ytContentMetadataViewModelDelimiter");
        for (let i = 0; i < videoCardMetadataSplitters.length; i++) {
            videoCardMetadataSplitters[i].ariaHidden = "false";
            videoCardMetadataSplitters[i].textContent = " • ";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // hide the play icon next to view count
    try {
        let videoCardViewIcons = document.querySelectorAll(".ytContentMetadataViewModelLeadingIcon");
        for (let i = 0; i < videoCardViewIcons.length; i++) {
            videoCardViewIcons[i].style.width = "0px";
            videoCardViewIcons[i].style.margin = "0px";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // append "views" after number + hide collaborators on non-watch pages
    try {
        let videoCardViewText = document.querySelectorAll(".ytContentMetadataViewModelMetadataText");
        for (let i = 0; i < videoCardViewText.length; i++) {
            if ((String(videoCardViewText[i].ariaLabel).includes("views")) || (String(videoCardViewText[i].ariaLabel).includes("view"))) {
                if (!(String(videoCardViewText[i].innerHTML).includes("views"))) {
                    let temp = videoCardViewText[i].innerHTML;
                    videoCardViewText[i].textContent = [temp, " views"].join("");
                };
            };

            if (!(String(window.location.href).includes("/watch?v="))) {
                if (String(videoCardViewText[i].innerHTML).startsWith("and ")) {
                    videoCardViewText[i].style.display = "none";
                };
            };
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // larger profile pictures
    try {
        let videoCardAvatarImage = document.querySelectorAll(".ytSpecAvatarShapeAvatarSizeMedium");
        for (let i = 0; i < videoCardAvatarImage.length; i++) {
            videoCardAvatarImage[i].style.width = "40px";
            videoCardAvatarImage[i].style.height = "40px";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // hide verified tick
    try {
        let videoCardVerfiedTick = document.querySelectorAll(".ytContentMetadataViewModelIcon");
        for (let i = 0; i < videoCardVerfiedTick.length; i++) {
            videoCardVerfiedTick[i].style.display = "none";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // hide extra delimiter when collaborators were removed
    try {
        let videoCardMetadataTextParent = document.querySelectorAll(".ytContentMetadataViewModelMediumText");
        for (let i = 0; i < videoCardMetadataTextParent.length; i++) {
            let delimiters = videoCardMetadataTextParent[i].querySelectorAll(".ytContentMetadataViewModelDelimiter");

            if (delimiters.length == 3) {
                delimiters[0].textContent = "";
                delimiters[0].style.display = "none";
                delimiters[0].remove();
            };
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // remove opacity from timestamp
    try {
        let videoCardTimestamp = document.querySelectorAll(".ytThumbnailBottomOverlayViewModelBadge");
        for (let i = 0; i < videoCardTimestamp.length; i++) {
            videoCardTimestamp[i].style.backgroundColor = "black";
            videoCardTimestamp[i].style.borderRadius = "4px";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // change text spacing in timestamp
    try {
        let videoCardTimestampText = document.querySelectorAll(".ytBadgeShapeThumbnailBadgeRedesign");
        for (let i = 0; i < videoCardTimestampText.length; i++) {
            videoCardTimestampText[i].style.paddingLeft = "4px";
            videoCardTimestampText[i].style.paddingRight = "4px";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // un-abbreviate dates
    try {
        let videoCardMetadataText = document.querySelectorAll(".ytContentMetadataViewModelMetadataText");
        for (let i = 0; i < videoCardMetadataText.length; i++) {
            let el = videoCardMetadataText[i];
            let temp = el.textContent;
            if (
                !(String(temp).includes("month") ||
                String(temp).includes("minute") ||
                String(temp).includes("hour") ||
                String(temp).includes("week") ||
                String(temp).includes("day"))
            ) {
                walkAndReplaceText(el, (text) =>
                    text
                        .replaceAll("hr", "hours")
                        .replaceAll("1 hours", "1 hour")
                        .replaceAll("wk", "weeks")
                        .replaceAll("1 weeks", "1 week")
                        .replaceAll("mo", "months")
                        .replaceAll("1 months", "1 month")
                        .replaceAll("yr", "years")
                        .replaceAll("1 years", "1 year")
                        .replaceAll("min", "minutes")
                        .replaceAll("1 minutes", "1 minute")
                );
            }
        }
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // return view count in video ending wall + un-abbreviate dates in video ending wall
    try {
        let videoWallMetadataText = document.querySelectorAll(".ytp-modern-videowall-still-view-count-and-date-info");
        for (let i = 0; i < videoWallMetadataText.length; i++) {
            let temp = videoWallMetadataText[i].innerHTML;
            let splitMetadata = temp.split(" • ")

            let views = splitMetadata[0]
            let date = splitMetadata[1]

            if (!(String(views).includes("views"))) {
                views = [views, " views"].join("");
            };

            if (!(String(temp).includes("month"))) {
                date = date.replaceAll("hr", "hours").replaceAll("1 hours", "1 hour").replaceAll("wk", "weeks").replaceAll("1 weeks", "1 week").replaceAll("mo", "months").replaceAll("1 months", "1 month").replaceAll("yr", "years").replaceAll("1 years", "1 year").replaceAll("min", "minutes").replaceAll("1 minutes", "1 minute")
            };

            videoWallMetadataText[i].textContent = [views, " • ", date].join("");
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // remove all members only videos on homepage
    try {
        let videoCardMetadataObject = document.querySelectorAll("div#contents > ytd-rich-item-renderer");
        for (let i = 0; i < videoCardMetadataObject.length; i++) {
            if (String(videoCardMetadataObject[i].outerHTML).includes("Members only")) {
                videoCardMetadataObject[i].style.display = "none";
            }
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}

    // remove all members only videos on video player reccomendations sidepanel
    try {
        let videoCardMetadataObject = document.querySelectorAll("yt-lockup-view-model.ytd-item-section-renderer");
        for (let i = 0; i < videoCardMetadataObject.length; i++) {
            if (String(videoCardMetadataObject[i].outerHTML).includes("Members only")) {
                videoCardMetadataObject[i].style.display = "none";
            }
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}
};

async function allowScrollingShortsOnRightmostScreenEdge() {
    try {
        let shortsViewNavigationContainer = document.querySelectorAll("div.navigation-container.style-scope.ytd-shorts");
        for (let i = 0; i < shortsViewNavigationContainer.length; i++) {
            shortsViewNavigationContainer[i].style.height = "22%";
            shortsViewNavigationContainer[i].style.position = "absolute";
            shortsViewNavigationContainer[i].style.top = "39%";
        };
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}
}

async function returnShortsFactoidColours() {
    // TODO:
    // set background of ytwFactoidRendererFactoid to #383838
    // set foreground of ytwFactoidRendererValue and ytwFactoidRendererLabel to #ddd
}

async function returnOldAbbreviationLetters() {
    try {
        let videoCardMetadataText = document.querySelectorAll(".ytContentMetadataViewModelMetadataText");
        for (let i = 0; i < videoCardMetadataText.length; i++) {
            let el = videoCardMetadataText[i];
            let temp = el.textContent;
            if (!(temp.includes("months")) || !(temp.includes("month"))) {
                walkAndReplaceText(el, (text) =>
                    text
                        .replaceAll("k view", "K view")
                        .replaceAll("m view", "M view")
                        .replaceAll("bn view", "B view")
                );
            }
        }

        let videoWallMetadataText = document.querySelectorAll(".ytp-modern-videowall-still-view-count-and-date-info");
        for (let i = 0; i < videoWallMetadataText.length; i++) {
            let el = videoWallMetadataText[i];
            let temp = el.textContent;
            if (!(temp.includes("months")) || !(temp.includes("month"))) {
                walkAndReplaceText(el, (text) =>
                    text
                        .replaceAll("k view", "K view")
                        .replaceAll("m view", "M view")
                        .replaceAll("bn view", "B view")
                );
            }
        }
    } catch(err) {console.log(["[ytpp: error] ", err].join(""))}
}

async function hidePlayables() {
    // ytd-rich-shelf-renderer

    let richShelf = document.querySelectorAll(".ytd-rich-shelf-renderer");
    for (let i = 0; i < richShelf.length; i++) {
        if (String(richShelf[i].outerHTML).includes("YouTube Playables")) {
            richShelf[i].style.display = "none";
        };
    };
};

async function shrinkPlayerThumbnails() {
    if (String(window.location.href).includes("watch")) {
        // a.ytLockupViewModelContentImage

        let thumbnailContainers = document.querySelectorAll("a.ytLockupViewModelContentImage");
        for (let i = 0; i < thumbnailContainers.length; i++) {
            thumbnailContainers[i].style.width = "46.875%";
        };
    };
};

async function hideAIFeatures() {
    // div#video-summary
    let watchPageVideoSummary = document.querySelectorAll("div#video-summary");
    for (let i = 0; i < watchPageVideoSummary.length; i++) {
        watchPageVideoSummary[i].style.display = "none";
    };
}

setInterval(fixVideoCards, 500)
setInterval(hidePlayables, 500)
setInterval(shrinkPlayerThumbnails, 500)
setInterval(hideAIFeatures, 500)
setInterval(returnOldAbbreviationLetters, 500)
setInterval(allowScrollingShortsOnRightmostScreenEdge, 500)