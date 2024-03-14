// Base URL for API endpoints
const baseURL = "http://localhost:8000";

// Function to retrieve all events
function getAllEvents(page, limit, search) {
  let uri = search ? `${baseURL}/api/event?page=${page}&limit=${limit}&event_name=${search}` : `${baseURL}/api/event?page=${page}&limit=${limit}`;
  return $.ajax({
    url: uri,
    type: "GET",
    dataType: "json",
    success: function (response) {
      displayEvents(response);
      return response;
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
      return error;
    },
  });
}

// Function to create a new event
function createEvent(eventData) {
  $.ajax({
    url: `${baseURL}/api/event`,
    type: "POST",
    dataType: "json",
    data: eventData,
    success: function (response) {
      alert("new event added!");
      // Handle success, e.g., display a success message
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
      // Handle error
    },
  });
}

// Function to get an event by ID
function getEventById(eventId) {
  $.ajax({
    url: `${baseURL}/api/event/${eventId}`,
    type: "GET",
    dataType: "json",
    success: function (response) {
      displayDetailEvents(response.data);
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    },
  });
}

// Function to update an existing event
function updateEvent(eventId, eventData) {
  $.ajax({
    url: `${baseURL}/api/event/${eventId}`,
    type: "PUT",
    dataType: "json",
    data: eventData,
    success: function (response) {
      alert("event updated!");
      // Handle success, e.g., display a success message
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
      // Handle error
    },
  });
}

// Function to delete an event
function deleteEvent(eventId) {
  $.ajax({
    url: `${baseURL}/api/event/${eventId}`,
    type: "DELETE",
    dataType: "json",
    success: function (response) {
      console.log(response);
      // Handle success, e.g., display a success message
    },
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
      // Handle error
    },
  });
}

// Function to replace existing DOM elements with new DOM elements from API
function displayEvents(data) {
  // Clear previous event data
  $(".Table_content").empty();
  // Display event data dynamically
  $.each(data.data, function (index, event) {
    var eventDate = new Date(event.event_date);
    var formattedDate = eventDate.getDate() + " " + eventDate.toLocaleDateString("default", { month: "long" }) + " " + eventDate.getFullYear();
    var formattedTime = event.event_start.replace(".", ":");

    var row = `<tr id="${event.id}">
                        <th scope="row">${index + 1}</th>
                        <td>${event.event_name}</td>
                        <td>${formattedDate}</td>
                        <td>${formattedTime}</td>
                        <td>
                        <button  class="btn btn-light btn-view rounded pt-0 pb-1 px-2" style="border: solid 1px #269544">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#269544" class="bi bi-eye" viewBox="0 0 16 16">
                          <path 
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          ></path>
                          <path  d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                        </svg>
                      </button>
                        </td>
                    </tr>`;
    $(".Table_content").append(row);
  });

  // Update pagination information
  $("#informasiH span.current").text(data.data.length);
  $("#informasiH span.total").text(data.total_data);
  $(".pages-total").text(data.total_pages);
  $("#pagi .py-2:eq(1)").html('Halaman <span class="fw-bold">' + data.page + "</span> ");
}

function displayDetailEvents(data) {
  $("#name-detail-event").val(data.event_name);
  $("#date-detail-event").val(new Date(data.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }));
  $("#time-detail-event").val(data.event_start);
  data.attendances.map((attendance, index) => {
    let child = `<div class="row">
    <div class="col-1 w-auto d-flex align-items-center me-3">
      <h6 style="margin-top: 28px">${index + 1}</h6>
    </div>
    <div class="col">
      <div class="input-wrapper">
        <label>Nomor Polisi</label>
        <input type="text" class="form-control py-3" value="${attendance.license_plate}" disabled />
      </div>
    </div>
    <div class="col">
      <label>Nama Pemilik</label>
      <span class="form-group has-float-label d-flex align-items-center rounded" style="background: #f0f2f4">
        <input type="text" class="form-control py-3" value="${attendance.owner_name}" disabled />
      </span>
    </div>
    <div class="col">
      <label>Jam Masuk</label>
      <span class="form-group has-float-label d-flex align-items-center rounded" style="background: #f0f2f4">
        <input type="text" class="form-control py-3" value="${attendance.entry_hour}" disabled />
      </span>
    </div>
  </div>`;
    $("#event-detail-attendance").append(child);
  });
}

let totalPages = 0;
let limit = 10;

$(document).ready(async function () {
  const data = await getAllEvents(1, 10);
  totalPages = data.total_pages;
});

// Pagination buttons click event
$("#pagination button").click(function () {
  var currentPage = parseInt($("#pagination .current-page").text());

  if ($(this).hasClass("minus")) {
    if (currentPage < 2) {
      return alert("Cannot go to page 0");
    }
    currentPage--;
  } else {
    if (currentPage == totalPages) {
      return alert("Maximum data reached");
    }
    currentPage++;
  }

  getAllEvents(currentPage, limit);
  $(".current-page").text(currentPage);
});

// change limit per page
$("#dropdownSelect").change(function () {
  var selectedValue = parseInt($(this).val());
  limit = selectedValue;
  var currentPage = parseInt($("#pagination .current-page").text());
  getAllEvents(currentPage, limit);
});

// get detail event attendance
$(document).on("click", ".btn-view", function () {
  var eventId = $(this).closest("tr").attr("id");
  getEventById(eventId);
  document.getElementById("content2").style.display = "none";
  dtlevent.style.display = "block";
});

// handle data submit
const handleSubmit = document.getElementById("form-event").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get form values
  const eventName = document.getElementById("event-name").value;
  const dateTime = document.getElementById("datepicker").value;
  const time = document.getElementById("timeInput").value;

  // Create JSON data
  const jsonData = {
    event_name: eventName,
    event_date: dateTime,
    event_start: time,
  };

  // Call createEvent function with JSON data
  return createEvent(jsonData);
});

// handle search params
$("#search-event").on("change", function () {
  const searchQuery = $(this).val();
  getAllEvents(1, limit, searchQuery);
});
