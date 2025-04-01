async function getWeather() {
    // 从输入框获取中文城市名称
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("请输入城市名称！");
        return;
    }

    // 使用 Cloudflare Worker 代理地址（替换成你的 Worker 地址）
    const workerUrl = "https://weather-proxy.kejichao44407330.workers.dev/";

    try {
        // 发送请求到 Worker（自动处理中文编码）
        const response = await fetch(workerUrl + encodeURIComponent(city));
        const data = await response.json();

        if (data.cod === 200) {
            const weatherHtml = `
                <h2>${data.name}，${data.sys.country}</h2>
                <p>🌡️ 温度：${data.main.temp}°C</p>
                <p>☁️ 天气：${data.weather[0].description}</p>
                <p>💧 湿度：${data.main.humidity}%</p>
                <p>🌪️ 风速：${data.wind.speed} 米/秒</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            `;
            document.getElementById("weather-result").innerHTML = weatherHtml;
        } else {
            alert("城市未找到，请检查输入！");
        }
    } catch (error) {
        alert("请求失败，请稍后重试！");
    }
}