const API_STUDENTS = "https://68ed5a3adf2025af78fff3c7.mockapi.io/students";
const API_BOOKS = "https://68ed5a3adf2025af78fff3c7.mockapi.io/books";
const API_LOANS = "https://68ed6426df2025af7800114f.mockapi.io/Loans";
const API_RETURNS = "https://68ed6426df2025af7800114f.mockapi.io/returns";
const API_CATEGORIES = "https://68fe99007c700772bb1413ea.mockapi.io/categories";
const API_PROFILES = "https://68fe99007c700772bb1413ea.mockapi.io/profiles";

document.addEventListener("DOMContentLoaded", () => {
  loadDashboardStats();
});

async function loadDashboardStats() {
  try {
    // Fetch all data in parallel
    const [students, books, loans, returns, categories, profiles] = await Promise.all([
      fetch(API_STUDENTS).then(r => r.json()),
      fetch(API_BOOKS).then(r => r.json()),
      fetch(API_LOANS).then(r => r.json()),
      fetch(API_RETURNS).then(r => r.json()),
      fetch(API_CATEGORIES).then(r => r.json()),
      fetch(API_PROFILES).then(r => r.json())
    ]);

    // Update totals
    updateCounter("total-students", students.length);
    updateCounter("total-books", books.length);
    updateCounter("total-loans", loans.length);
    updateCounter("total-returns", returns.length);
    updateCounter("total-categories", categories.length);
    updateCounter("total-profiles", profiles.length);

  } catch (error) {
    console.error("Error loading dashboard stats:", error);
    // Set to 0 if error
    ["total-students", "total-books", "total-loans", "total-returns", "total-categories", "total-profiles"].forEach(id => {
      updateCounter(id, 0);
    });
  }
}

function updateCounter(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}
