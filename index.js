document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const resultContainer = document.getElementById("result");
    const aqiResult = document.getElementById("aqi");
    const coResult = document.getElementById("co");
    const no2Result = document.getElementById("no2");
    const o3Result = document.getElementById("o3");
    const pm2Result = document.getElementById("pm2");
    const pm10Result = document.getElementById("pm10");
    const so2Result = document.getElementById("so2");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;
        const url = `https://air-quality.p.rapidapi.com/current/airquality?lon=${longitude}&lat=${latitude}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '2008b8b202msh2e18197a58c3c07p15b5dcjsn1650494e93a1', // Replace with your actual API key
                'x-rapidapi-host': 'air-quality.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access denied. Check your API key and permissions.');
                } else if (response.status === 429) {
                    throw new Error('Rate limit exceeded. Please try again later.');
                } else {
                    throw new Error(`API request failed with status: ${response.status}`);
                }
            }
            const result = await response.json();
            if (!result.data || !result.data[0]) {
                throw new Error('Invalid response format or empty data.');
            }

            let readings = result.data[0];
            aqiResult.textContent = readings.aqi || 'N/A';
            coResult.textContent = readings.co || 'N/A';
            no2Result.textContent = readings.no2 || 'N/A';
            o3Result.textContent = readings.o3 || 'N/A';
            pm2Result.textContent = readings.pm2 || 'N/A';
            pm10Result.textContent = readings.pm10 || 'N/A';
            so2Result.textContent = readings.so2 || 'N/A';
            resultContainer.style.display = 'flex';
        } catch (error) {
            console.error('Error:', error.message);
            resultContainer.style.display = 'none';
        }
    });
});
