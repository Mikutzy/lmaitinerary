// Country-Region Mapping
const countryRegions = {
    "Japan": ["Tokyo", "Kyoto", "Osaka", "Hokkaido", "Fukuoka", "Okinawa"],
    "Indonesia": ["Bali", "Jakarta", "Yogyakarta", "Surabaya", "Medan"],
    "South Korea": ["Seoul", "Busan", "Incheon", "Jeju", "Daegu"],
    "France": ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux"],
    "USA": ["New York", "California", "Florida", "Texas", "Hawaii"],
    "Italy": ["Rome", "Milan", "Florence", "Venice", "Naples"],
    "Philippines": ["Manila", "Cebu", "Davao", "Baguio", "Iloilo"],
    "Germany": ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    "Spain": ["Madrid", "Barcelona", "Seville", "Valencia", "Malaga"],
    "United Kingdom": ["London", "Edinburgh", "Manchester", "Birmingham", "Liverpool"],
    "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Ayutthaya", "Pattaya"],
    "South Korea": ["Seoul", "Busan", "Incheon", "Jeju", "Daegu"],
    "China": ["Beijing", "Shanghai", "Hong Kong", "Xi'an", "Chengdu"],
    "Brazil": ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador", "Manaus"],
    "Mexico": ["Mexico City", "Cancun", "Guadalajara", "Monterrey", "Cozumel"],
    "India": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
    "South Africa": ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth"],
    "Greece": ["Athens", "Thessaloniki", "Santorini", "Crete", "Rhodes"],
    "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    "Switzerland": ["Zurich", "Geneva", "Lucerne", "Bern", "Basel"]
  };
  
  // Update prefecture dropdown based on selected country
  function updatePrefectures() {
    const countrySelect = document.getElementById("country");
    const prefectureSelect = document.getElementById("prefecture");
    const selectedCountry = countrySelect.value;
  
    // Clear the prefecture options first
    prefectureSelect.innerHTML = "";
  
    if (selectedCountry && countryRegions[selectedCountry]) {
      // Add a placeholder option
      let placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select a Region/Prefecture";
      prefectureSelect.appendChild(placeholderOption);
  
      // Populate the prefecture dropdown with corresponding regions
      countryRegions[selectedCountry].forEach(region => {
        let option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        prefectureSelect.appendChild(option);
      });
    } else {
      // Default placeholder option when no country is selected
      let option = document.createElement("option");
      option.value = "";
      option.textContent = "Please select a country first";
      prefectureSelect.appendChild(option);
    }
  }
  
  // Generate AI-powered itinerary
  async function generateItinerary() {
    const selectedCountry = document.getElementById("country").value;
    const selectedRegion = document.getElementById("prefecture").value;
    const days = document.getElementById("days").value;
    const itineraryOutput = document.getElementById("itinerary");
  
    itineraryOutput.innerHTML = "Generating itinerary...";
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `Plan a ${days}-day itinerary for ${selectedRegion}, ${selectedCountry}.`
            }
          ],
          max_tokens: 200
        })
      });
  
      const data = await response.json();
      itineraryOutput.innerHTML = data.choices[0].message.content.replace(/\n/g, "<br>");
    } catch (error) {
      itineraryOutput.innerHTML = "Error generating itinerary. Please try again.";
      console.error(error);
    }
  }
  
  // Budget calculation function
  function calculateBudget() {
    const days = parseInt(document.getElementById("budget-days").value);
    const category = document.getElementById("budget-category").value;
    const budgetOutput = document.getElementById("budget-result");
  
    const rates = { budget: 50, midrange: 100, luxury: 250 };
    const totalCost = days * rates[category];
  
    budgetOutput.innerHTML = `Estimated cost for ${days} days (${category} travel): $${totalCost}`;
  }
  
  // Event listener for country change
  document.getElementById("country").addEventListener("change", updatePrefectures);
  
  
