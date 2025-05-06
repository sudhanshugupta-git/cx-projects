document.addEventListener("DOMContentLoaded", () => {
    const topicButtons = document.querySelectorAll(".topic-btn");
    const generateButton = document.getElementById("generate-btn");
    const questionsList = document.getElementById("questions-list");

    // Toggle selection of topics
    topicButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("selected");
        });
    });

    async function getQuestions(topics) {
        const API_KEY = ""; 
        const url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
            API_KEY;
    
        const prompt = `Here are some topics: '${topics.join(", ")}'. Generate 10 relevant and important questions based on these topics.
        Return the questions in a double comma-separated format: "Question 1,, Question 2,, Question 3,, ..."`;
    
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
    
            const data = await response.json();
            const rawResponse = data.candidates[0].content.parts[0].text;
            return rawResponse.split(",,").map(q => q.trim());
        } catch (error) {
            console.error("Error fetching questions:", error);
            return [];
        }
    }
    
    // Generate questions on button click
    generateButton.addEventListener("click", async () => {
        const selectedTopics = Array.from(document.querySelectorAll(".topic-btn.selected"))
            .map(button => button.dataset.topic);
    
        questionsList.innerHTML = "";

        if (selectedTopics.length === 0) {
            questionsList.innerHTML = "<li>Please select at least one topic.</li>";
            return;
        }

        // Show animated loading message
        let loadingMessage = document.createElement("li");
        loadingMessage.textContent = "Loading questions";
        questionsList.appendChild(loadingMessage);

        let dots = 0;
        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4; 
            loadingMessage.textContent = "Loading questions" + ".".repeat(dots);
        }, 500);

        try {
            const questions = await getQuestions(selectedTopics);

            clearInterval(loadingInterval); 
            if (questions.length > 0) {
                questionsList.innerHTML = questions.map(question => `<li>${question}</li>`).join("");
            } else {
                questionsList.innerHTML = "<li>No questions found.</li>";
            }
        } catch (error) {
            clearInterval(loadingInterval);
            questionsList.innerHTML = `<li>Error: ${error.message}</li>`;
        }
    });
});