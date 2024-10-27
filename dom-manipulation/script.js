



// Array to store quotes with text and category
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", category: "Life" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Function to display a random quote from the array
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";  // Clear previous quote

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

// Function to dynamically create and display the "Add Quote" form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";
  
  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";
  
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  // Append inputs and button to the form container
  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);

  // Append form container to the body or a specific section
  document.body.appendChild(formContainer);
}

// Call createAddQuoteForm to display the form on page load
createAddQuoteForm();
