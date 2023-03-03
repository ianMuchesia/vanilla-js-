const taskDom = document.querySelector(".tasks");
const loadingDom = document.querySelector(".loading");
const sidebarButton = document.querySelectorAll("li");
const allSections = document.querySelectorAll("section");
const studentCard = document.querySelector('.due-today')
const sideBar = document.querySelector("aside");
const navBar = document.querySelector(".nav-center");

const displaySection = (el) => {
  allSections.forEach((item) => {
    item.style.display = "none";

    navBar.style.backgroundColor = "var(--primary-600)";
    sideBar.style.backgroundColor = "var(--primary-300)";
    studentCard.style.backgroundColor = "var(--primary-300)"

    if (item.classList.value === el) {
      item.style.display = "block";
    }

    if (el === "Damaged" || el === "Default") {
      navBar.style.backgroundColor = "#f70202";
      sideBar.style.backgroundColor = "#f05b5b";
      studentCard.style.backgroundColor = "#f05b5b"
    }
  });
};
//displaySection()

//toggle between the sections
sidebarButton.forEach((item) => {
  item.addEventListener("click", () => {
    let myValue = item.innerHTML;
    switch (myValue) {
      case "Due":
        displaySection("Due");
        break;
      case "Borrow":
        displaySection("Borrow");
        break;
      case "Borrowed":
        displaySection("Borrowed");
        break;
      case "Return":
        displaySection("Return");
        break;
      case "Books":
        displaySection("Books");
        break;
      case "Damaged":
        displaySection("Damaged");
        break;
      default:
        displaySection("Default");
    }
  });
});
