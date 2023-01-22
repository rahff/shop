let sessionId;

window.addEventListener("DOMContentLoaded", initSession);
function initSession() {
    const session = localStorage.getItem("sessionId");
    if(!session) localStorage.setItem("sessionId", getSessionId());
    sessionId = session;
}

function getSessionId() {
    return "";
}