// Function

async function fetchChampionRatings(champion) {
  for (const trip of champion) {
    const response = await fetch(trip);
    console.log(await response.json());
  }
}

// Modified Function

async function fetchChampionRatings(champion) {
  for (let trip of champion) {
    const response = fetch(trip);
    console.log(await response.json());
  }
}