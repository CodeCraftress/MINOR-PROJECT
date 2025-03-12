const OPTIONS = {
  demo: {
    url: 'https://demo.api4ai.cloud/household-stuff/v1/results',
    headers: { 'A4A-CLIENT-APP-ID': 'sample' }
  },
  rapidapi: {
    url: 'https://furniture-and-household-items.p.rapidapi.com/v1/results',
    headers: { 'X-RapidAPI-Key': 'd3d0822283mshdd1f4c5bb9c94e3p1038e6jsn5e3c412a0865' }
  }
};

const MODE = 'rapidapi'; // Set the mode to rapidapi

document.addEventListener('DOMContentLoaded', function (event) {
  const input = document.getElementById('file');
  const raw = document.getElementById('raw');
  const sectionRaw = document.getElementById('sectionRaw');
  const parsed = document.getElementById('parsed');
  const sectionParsed = document.getElementById('sectionParsed');
  const spinner = document.getElementById('spinner');

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      return false;
    }

    sectionRaw.hidden = true;
    sectionParsed.hidden = true;
    spinner.hidden = false;

    // Prepare request.
    const form = new FormData();
    form.append('image', file);
    const requestOptions = {
      method: 'POST',
      body: form,
      headers: OPTIONS[MODE].headers
    };

    // Make request.
    fetch(OPTIONS[MODE].url, requestOptions)
      .then(response => response.json())
      .then(function (response) {
        // Print raw response.
        raw.textContent = JSON.stringify(response, undefined, 2);
        sectionRaw.hidden = false;
        // Parse response and print.
        const items = response.results[0]?.entities[0]?.mapping || [];
        parsed.textContent = JSON.stringify(items, undefined, 2) || 'Not stuff item(s) found.';
        sectionParsed.hidden = false;
      })
      .catch(function (error) {
        // Error can be handled here.
        console.error(error);
      })
      .finally(function () {
        spinner.hidden = true;
      });
  });
});