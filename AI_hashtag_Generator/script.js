const generateBtn = document.getElementById("generateBtn");
const postText = document.getElementById("postText");
const hashtagsDiv = document.getElementById("hashtags");
const copyAllBtn = document.getElementById("copyAllBtn");
const hiddenDiv = document.querySelector(".hidden");

// const text = "Embrace the beauty of simplicity with a touch of elegance. Our new collection is all about effortless style that takes you from day to night. Stay tuned for the launch!";

async function getHashtags(text) {
    const API_KEY = "";
    const url =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
        API_KEY;

    // const prompt = `Here is an instagram post text: '${text}'. Generate 5 hashtags based on the
    // text. do not include the # character in the strings. return the hashtags in comma seperated
    // values`;
    const prompt = `Here is an Instagram post text: '${text}'. Generate 5 hashtags based on the text.
    Do not include the '#' character in the hashtags. Also, assign a unique color (hex code) to each hashtag.
    Return the response in a comma-separated format as follows: "hashtag1:#hexcode1, hashtag2:#hexcode2, ..."`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const rawResponse = data.candidates[0].content.parts[0].text;
            const hashtagArray = rawResponse.split(',').map(tag => {
                const [text, color] = tag.trim().split(':');
                return { text: text.trim(), color: color.trim() };
            });
            return hashtagArray;
        })
        .catch((error) => {
            console.error("Error fetching hashtags:", error);
        });
}

// const text = "Embrace the beauty of simplicity with a touch of elegance. Our new collection is all about effortless style that takes you from day to night. Stay tuned for the launch!"
// getHashtags(text).then((hashtags) => {
//     console.log(hashtags) // [...] array of items
// });

// Handle button click
generateBtn.addEventListener("click", async () => {
    const content = postText.value.trim();
    if (!content) {
        alert("Please enter some text before generating hashtags.");
        return;
    }

    const hashtags = await getHashtags(content);

    if (hashtags.length > 0) {
        console.log(hashtags);
        // hashtagsDiv.innerHTML = hashtags.map(tag => `<button>#${tag}</button>`).join(" ");
        hashtagsDiv.innerHTML = hashtags.map(tag => 
            `<button class="hashtag-btn" data-text="#${tag.text}" style="background-color: ${tag.color}; color: white; border: none; padding: 5px 10px; margin: 3px; border-radius: 5px;">#${tag.text}</button>`
        ).join(" ");

        hiddenDiv.style.display = "block"; 
    } else {
        hashtagsDiv.innerHTML = "No hashtags found.";
        hiddenDiv.style.display = "none";
    }
});


// Copy a single hashtag when clicked
hashtagsDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("hashtag-btn")) {
        const textToCopy = event.target.dataset.text;

        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Copied: ${textToCopy}`);
        }).catch(err => console.error("Copy failed:", err));
    }
});


// Copy all hashtags to clipboard
copyAllBtn.addEventListener("click", () => {
    // const textToCopy = hashtagsDiv.innerText;
    const textToCopy = Array.from(document.querySelectorAll(".hashtag-btn"))
                            .map(btn => btn.dataset.text)
                            .join(" ");
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("All hashtags copied to clipboard!");
    }).catch(err => console.error("Copy failed:", err));
});