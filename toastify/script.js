let toastTimeout;
function toast({ type, content, duration }) {
    // const toast = document.getElementById("toast");
    // const message = document.getElementById("toast-message");
    // const icon = document.getElementById("toast-icon");
    let bgColor = "";
    let iconSymbol = "";

    switch (type) {
        case "success":
            bgColor = "#35A808";
            iconSymbol = "✔️";
            break;
        case "error":
            bgColor = "#EE6253";
            iconSymbol = "❌";
            break;
        case "info":
            bgColor = "blue";
            iconSymbol = "ℹ️";
            break;
        case "warning":
            bgColor = "#E8E805";
            iconSymbol = "⚠️";
            break;
    }

    // message.textContent = content;
    // icon.textContent = iconSymbol;
    // toast.style.backgroundColor = bgColor;
    // toast.style.display = "block";

    const toastContainer = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.backgroundColor = bgColor;
    toast.textContent = `${iconSymbol}  ${content}`;
    
    const closeButton = document.createElement("button");
    closeButton.className = "close-btn";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => toast.remove();
    toast.appendChild(closeButton);

    const progressBar = document.createElement("div");
    progressBar.className = "progress";
    toast.appendChild(progressBar);
    
    toastContainer.appendChild(toast);
    

    // clearTimeout(toastTimeout); 
    // toastTimeout = setTimeout(() => {
    //     // closeToast();
    // }, duration);

    setTimeout(() => {
        progressBar.style.width = "100%";
        progressBar.style.transition = `width ${duration}ms linear`;
    }, 0);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// function closeToast() {
//     document.getElementById("toast").style.display = "none";
// }