function toast({ type, content, duration }) {
    const toast = document.getElementById("toast");
    const message = document.getElementById("toast-message");
    const icon = document.getElementById("toast-icon");
    let bgColor = "";
    let iconSymbol = "";

    switch (type) {
        case "success":
            bgColor = "green";
            iconSymbol = "✔️";
            break;
        case "error":
            bgColor = "red";
            iconSymbol = "❌";
            break;
        case "info":
            bgColor = "blue";
            iconSymbol = "ℹ️";
            break;
        case "warning":
            bgColor = "orange";
            iconSymbol = "⚠️";
            break;
    }

    message.textContent = content;
    icon.textContent = iconSymbol;
    toast.style.backgroundColor = bgColor;
    toast.style.display = "block";

    clearTimeout(toastTimeout); 
    toastTimeout = setTimeout(() => {
        closeToast();
    }, duration);
}

function closeToast() {
    document.getElementById("toast").style.display = "none";
}