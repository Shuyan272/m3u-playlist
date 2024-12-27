const DEFAULT_M3U_URL = "https://raw.githubusercontent.com/your-username/your-repo/main/playlist.m3u";

async function handleRequest(request) {
    const { searchParams } = new URL(request.url);
    const m3uUrl = searchParams.get("url") || DEFAULT_M3U_URL;

    const response = await fetch(m3uUrl);
    if (!response.ok) {
        return new Response("Failed to fetch the m3u file.", { status: 500 });
    }

    const m3uContent = await response.text();
    return new Response(m3uContent, {
        headers: {
            "Content-Type": "application/x-mpegurl",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
