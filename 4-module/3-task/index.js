function highlight(table) {
  let rows = table.rows;

  for (let td of rows) {

    let cell = td.querySelectorAll("td");

    if (cell[3].hasAttribute("data-available")) {

      if (cell[3].dataset.available === "true") {
        td.classList.add("available");
      } else {
        td.classList.add("unavailable");
      }

    } else {
      td.hidden = true;
    }

    if (cell[2].textContent === "m") {
      td.classList.add("male");

    } else if (cell[2].textContent === "f") {
      td.classList.add("female");
    }

    if (cell[1].textContent < 18) {
      td.style.textDecoration = "line-through";
    }
  }
}
