/* Light / dark theme switch.
   Dark (Night Navy) is the default. The choice is saved in the browser.
   Works with a button that has the id "themeToggle". */
(function () {
    var KEY = "sms-theme";
    var root = document.documentElement;

    function apply(theme) {
        root.setAttribute("data-theme", theme);
    }

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (error) { saved = null; }
    apply(saved === "light" ? "light" : "dark");

    document.addEventListener("DOMContentLoaded", function () {
        var button = document.getElementById("themeToggle");
        if (!button) { return; }

        var icon = button.querySelector("i");

        function refreshButton() {
            var dark = root.getAttribute("data-theme") === "dark";
            if (icon) { icon.className = dark ? "fas fa-sun" : "fas fa-moon"; }
            button.title = dark ? "Switch to light mode" : "Switch to dark mode";
        }

        refreshButton();

        button.addEventListener("click", function (event) {
            event.preventDefault();
            var dark = root.getAttribute("data-theme") === "dark";
            var next = dark ? "light" : "dark";
            apply(next);
            try { localStorage.setItem(KEY, next); } catch (error) { /* ignore */ }
            refreshButton();
        });
    });
})();