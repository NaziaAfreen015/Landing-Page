
// Parse URL params
const params = new URLSearchParams(window.location.search);
const PID = params.get("PROLIFIC_PID") || "";
const STUDY = params.get("STUDY_ID") || "";
const SESSION = params.get("SESSION_ID") || "";

// Populate UI
document.getElementById("kv_pid").textContent = PID || "—";
document.getElementById("kv_study").textContent = STUDY || "—";
document.getElementById("kv_session").textContent = SESSION || "—";

const pidPill = document.getElementById("pidValue");
pidPill.textContent = PID || "Not found";

const statusText = document.getElementById("statusText");
const okBox = document.getElementById("paramOk");
const warnBox = document.getElementById("paramWarn");

if (PID) {
    statusText.textContent = "Prolific parameters detected";
    okBox.style.display = "block";
} else {
    statusText.textContent = "Opened without Prolific parameters";
    warnBox.style.display = "block";
}

// Copy PID button
document.getElementById("copyPidBtn").addEventListener("click", async () => {
    if (!PID) return alert("No PROLIFIC_PID found in the URL.");
    try {
        await navigator.clipboard.writeText(PID);
        alert("Copied PROLIFIC_PID to clipboard.");
    } catch (e) {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = PID;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        alert("Copied PROLIFIC_PID to clipboard.");
    }
});

// Optional: store params in THIS PAGE's localStorage for convenience (note: extension can't read this)
try {
    if (PID) localStorage.setItem("PROLIFIC_PID", PID);
    if (STUDY) localStorage.setItem("STUDY_ID", STUDY);
    if (SESSION) localStorage.setItem("SESSION_ID", SESSION);
} catch { }

// Optional: postMessage for an extension content script to pick up
// (Your content script should validate origin before trusting this.)
if (PID) {
    window.postMessage({
        type: "PROLIFIC_PARAMS",
        PROLIFIC_PID: PID,
        STUDY_ID: STUDY,
        SESSION_ID: SESSION
    }, "*");
}
