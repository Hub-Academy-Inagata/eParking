let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let btnTambahData = document.querySelector("#btnTambahData");
let tmbhdata = document.querySelector("#tmbhdata");
let btnadddata = document.querySelector("#btnadddata")
let btnview = document.querySelectorAll(".btn-view");
let dtlevent = document.querySelector("#dtlevent");
let btnDetailTiket = document.querySelector("#btnDetailTiket");
let dtltiket = document.querySelector("#dtltiket");

btnTambahData.onclick = function () {
  document.getElementById("content2").style.display = "none";
  tmbhdata.style.display = "block";
};

btnadddata.onclick = function () {
  document.getElementById("content2").style.display = "none";
  document.getElementById("tmbhdata").style.display = "none";
  dtlevent.style.display = "block";
};

btnDetailTiket.onclick = function () {
  document.getElementById("content3").style.display = "none";
  dtltiket.style.display = "block";
};

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
  // resetNavLinkStyles();
};

document.querySelector("#dtltiket a").onclick = function (event) {
  event.preventDefault();

  document.getElementById("content3").style.display = "block";
  dtltiket.style.display = "none";
  // resetNavLinkStyles();
};



$("#datepicker").datepicker();

document.querySelector(".input-date-event").onclick = function (event) {
  $("#datepicker").datepicker("show");
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize flatpickr
  flatpickr("#timeInput", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
  });

  // You can use the button click event to toggle the time picker
  document.getElementById("clockpicker").addEventListener("click", function () {
    document.getElementById("timeInput").click();
  });
});

btn.onclick = function () {
  sidebar.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      resetNavLinkStyles();

      document.querySelectorAll(".home_content > div").forEach(function (content) {
        content.style.display = "none";
      });

      var contentId = this.getAttribute("data-content");

      document.getElementById(contentId).style.display = "block";

      this.style.backgroundColor = "green";
      this.style.color = "white";
    });
  });
});

function resetNavLinkStyles() {
  var navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.style.backgroundColor = "";
    link.style.color = "";
  });
}
