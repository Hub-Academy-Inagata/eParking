let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let btnTambahData = document.querySelector("#btnTambahData");
let tmbhdata = document.querySelector("#tmbhdata");
let btnview = document.querySelectorAll(".btn-view");
let dtlevent = document.querySelector("#dtlevent");

btnTambahData.onclick = function () {
    document.getElementById("content2").style.display = "none";
    tmbhdata.style.display = "block";
};

btnview.forEach(function (button) {
    button.addEventListener("click", function () {
        document.getElementById("content2").style.display = "none";
        dtlevent.style.display = "block";
    });
});

document.querySelector("#tmbhdata a").onclick = function (event) {
    event.preventDefault();

    document.getElementById("content2").style.display = "block";
    tmbhdata.style.display = "none";
    resetNavLinkStyles(); 
};

document.querySelector("#dtlevent a").onclick = function (event) {
    event.preventDefault();

    document.getElementById("content2").style.display = "block";
    dtlevent.style.display = "none";
    resetNavLinkStyles(); 
};

btn.onclick = function () {
    sidebar.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            resetNavLinkStyles(); 

            document.querySelectorAll('.home_content > div').forEach(function (content) {
                content.style.display = 'none';
            });

            var contentId = this.getAttribute('data-content');

            document.getElementById(contentId).style.display = 'block';

            this.style.backgroundColor = 'green';
            this.style.color = 'white';
        });
    });
});


function resetNavLinkStyles() {
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.style.backgroundColor = '';
        link.style.color = '';
    });
}
