// Array to store quotes with text and category
const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    category: "Life",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Success",
  },
];

// Function to display a random quote from the array
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear previous quote

  const quote = quotes[randomIndex];
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${quote.text}" - ${quote.category}`;
  quoteDisplay.appendChild(quoteText);
}

// Add event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote from user input
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    // Add the new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Optionally, display the new quote immediately or show a message
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `Added new quote in category "${quoteCategory}".`;
  } else {
    alert("Please fill in both the quote and category fields.");
  }
}
