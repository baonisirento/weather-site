async function getWeather() {
    const apiKey = "a037258de5df23b9590400c430e257e5"; // 替换成你的 OpenWeatherMap API Key
    const city = document.getElementById("city-input").value.trim();
    
    if (!city) {
        alert("请输入城市名称！");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            const weatherHtml = `
                <h2>${data.name}，${data.sys.country}</h2>
                <p>🌡️ 温度：${data.main.temp}°C</p>
                <p>☁️ 天气：${data.weather[0].description}</p>
                <p>💧 湿度：${data.main.humidity}%</p>
                <p>🌪️ 风速：${data.wind.speed} 米/秒</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="天气图标">
            `;
            document.getElementById("weather-result").innerHTML = weatherHtml;
        } else {
            alert("城市未找到，请检查拼写！");
        }
    } catch (error) {
        alert("请求失败，请稍后重试！");
    }
}