


// Load quotes from local storage, or initialize with default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", category: "Life" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";  // Clear previous quote

  const quote = filteredQuotes[randomIndex];
  if (quote) {
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteText);
  }
}

// Add a new quote from user input
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes(); // Update local storage after adding a new quote

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    populateCategories(); // Update categories dynamically
    filterQuotes(); // Re-apply filter
  } else {
    alert("Please fill in both the quote and category fields.");
  }
}

// Create "Add Quote" form dynamically
function createAddQuoteForm() {
  const formContainer = document.getElementById("addQuoteForm");

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

  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);
}

// Call createAddQuoteForm to display the form on page load
createAddQuoteForm();

// Populate categories dynamically from quotes array
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory); // Save selected filter
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = ""; // Clear previous display

  const filteredQuotes = getFilteredQuotes();
  filteredQuotes.forEach(quote => {
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteText);
  });
}

// Get filtered quotes based on selected category
function getFilteredQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  return selectedCategory === "all" 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);
}

// Load categories and filter on page load
window.onload = () => {
  populateCategories();
  filterQuotes();
};

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  
  URL.revokeObjectURL(url); // Clean up the URL object
}

// Event listener for "Export Quotes" button
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save the updated quotes to local storage
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } catch (error) {
        alert("Error importing quotes: Invalid JSON file.");
      }
    };
    fileReader.readAsText(file);
  }
}
