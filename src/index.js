let userData = [];
function renderTable(userArray) {
  $("tbody").empty();
  userArray.forEach((data, i) => {
    const row = `<tr class="table-row">
    <td>${data.id}</td>
    <td>${data.firstName} ${data.lastName}</td>
    <td>${data.phone}</td>
    <td id="delete" data-id="${data.id}"/>x</td>
    </tr>`;
    $("tbody").append(row);
  });
}

function dataHandler(firstName, lastName, phone) {
  const found = userData.some(
    (data) =>
      data.firstName.toLowerCase() === firstName.toLowerCase() ||
      data.phone === phone
  );
  if (found) {
    alert("Name or phone number already exists");
    return;
  }
  const data = {
    id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1,
    firstName,
    lastName,
    phone
  };
  userData.push(data);
  renderTable(userData);
}

$("#myForm").on("submit", (e) => {
  e.preventDefault();
  dataHandler(
    e.target.firstName.value,
    e.target.lastName.value,
    e.target.phone.value
  );
  $("#myForm").trigger("reset");
});

$(document).on("click", "#delete", function () {
  alert("Deleting the data!!");
  const newUserData = userData.filter(
    (data) => data.id != $(this).attr("data-id")
  );
  userData = newUserData;
  renderTable(userData);
});
let sorted = false;
$("#nameColumn").on("click", function () {
  if (sorted) {
    const newUserData = userData.sort(function (a, b) {
      console.log(a, b);
      return a.id - b.id;
    });
    userData = newUserData;
    renderTable(userData);
    sorted = false;
  } else {
    const newUserData = userData.sort(function (a, b) {
      console.log(a, b);
      return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    });
    userData = newUserData;
    renderTable(userData);
    sorted = true;
  }
});

$("#search").change(function (e) {
  const value = $(this).val();
  if (value.length > 0) {
    const tempUserData = userData.filter((data) => {
      return (
        data.firstName.toLowerCase().includes(value.toLowerCase()) ||
        data.lastName.toLowerCase().includes(value.toLowerCase()) ||
        data.phone.includes(value)
      );
    });

    renderTable(tempUserData);
  } else {
    renderTable(userData);
  }
});
