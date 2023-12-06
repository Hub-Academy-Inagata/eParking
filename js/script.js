let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function() {
    sidebar.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Hide all content divs
            document.querySelectorAll('.home_content > div').forEach(function (content) {
                content.style.display = 'none';
            });

            // Get the content ID from the data attribute
            var contentId = this.getAttribute('data-content');

            // Show the selected content
            document.getElementById(contentId).style.display = 'block';
        });
    });
});
