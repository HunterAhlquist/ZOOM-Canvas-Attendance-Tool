const initApp = () => {

    const droparea = document.querySelector('.drop-area');

    const active = () => droparea.classList.add("green-border"); //add green border when hovering over droparea
    const inactive = () => droparea.classList.remove("green-border");
    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        droparea.addEventListener(eventName, prevents);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        droparea.addEventListener(eventName, active);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        droparea.addEventListener(eventName, inactive);
    });
}

document.addEventListener("DOMContentLoaded", initApp);