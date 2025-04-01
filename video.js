function uploadVideo() {
    const fileInput = document.getElementById("video-input");
    const file = fileInput.files[0];
    if (!file) {
        alert("请选择视频文件！");
        return;
    }
    // 此处暂时仅演示前端部分，实际需后端支持上传
    const videoUrl = URL.createObjectURL(file);
    const videoHtml = `
        <div class="video-item">
            <video controls width="100%">
                <source src="${videoUrl}" type="${file.type}">
            </video>
            <p>上传时间：${new Date().toLocaleString()}</p>
        </div>
    `;
    document.getElementById("video-list").innerHTML += videoHtml;
}