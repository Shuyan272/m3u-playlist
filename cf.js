const GITHUB_M3U_URL = "https://raw.githubusercontent.com/your-username/your-repo/main/playlist.m3u";

async function handleRequest(request) {
    const response = await fetch(GITHUB_M3U_URL);
    if (!response.ok) {
        return new Response("Failed to fetch the m3u file.", { status: 500 });
    }

    // 获取 m3u 文件内容
    const m3uContent = await response.text();

    // 可选：添加自定义逻辑处理 m3u 文件
    // 如：修改 URL，添加注释等

    return new Response(m3uContent, {
        headers: {
            "Content-Type": "application/x-mpegurl",
            "Access-Control-Allow-Origin": "*", // 允许跨域访问
        },
    });
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});
