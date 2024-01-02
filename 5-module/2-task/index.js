function toggleText() {

  const togglerBtn = document.querySelector(".toggle-text-button");
  const text = document.getElementById("text");

  togglerBtn.addEventListener("click", () => {

    text.hidden == true ? text.hidden = false : text.hidden = true;

  });
}
