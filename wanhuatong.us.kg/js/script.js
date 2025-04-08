// 搜索功能实现
const searchInput = document.getElementById('searchInput');
const toolCards = document.querySelectorAll('.tool-card');

// 从JSON加载工具数据
function loadToolsData() {
    fetch('../data/tools.json')
        .then(response => response.json())
        .then(data => renderTools(data))
        .catch(error => console.error('Error loading tools data:', error));
}

// 渲染工具卡片
function renderTools(toolsData) {
    const container = document.querySelector('.tools-container');
    container.innerHTML = '';
    
    toolsData.forEach(category => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        
        card.innerHTML = `
            <h2 class="category-title">${category.name}</h2>
            <ul class="tool-links">
                ${category.tools.map(tool => 
                    `<li><a href="${tool.link}" target="_blank">${tool.name}</a></li>`
                ).join('')}
            </ul>
        `;
        
        container.appendChild(card);
    });
}

// 搜索功能
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    toolCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// 页面加载时初始化
window.addEventListener('DOMContentLoaded', loadToolsData);