const defaultCategories = [
  {
    title: "work",
    links: [
      { url: "https://gmail.com", name: "gmail" },
      { url: "https://outlook.office.com", name: "outlook" },
      { url: "https://linkedin.com", name: "linkedin" },
      { url: "https://vim.rtorr.com/", name: "vim" },
    ],
  },

  {
    title: "dev",
    links: [
      { url: "https://github.com/", name: "github" },
      { url: "https://noogle.dev/", name: "noogle" },
      { url: "https://awesomewm.org/apidoc/", name: "awesomewm" },
      { url: "https://devdocs.io/", name: "devdocs" },
    ],
  },
];

const createCategory = (category) => {
  const bookmarks = document.getElementsByClassName("bookmarks")[0];
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  const categoryLinks = document.createElement("div");
  categoryLinks.className = "links";
  const title = document.createElement("li");
  title.className = "title";
  title.innerText = category.title;
  categoryLinks.appendChild(title);
  category.links.forEach((el) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = el.name;
    a.href = el.url;
    li.appendChild(a);
    categoryLinks.appendChild(li);
  });
  categoryDiv.appendChild(categoryLinks);
  bookmarks.appendChild(categoryDiv);
};

const getCategories = () => localStorage.getItem("categories");
const setCategories = (text) => localStorage.setItem("categories", text);

const loadCategories = () => {
  const dataStr = getCategories();
  const data = JSON.parse(dataStr) || defaultCategories;
  setCategories(JSON.stringify(data));

  //   remove previous categories
  const categories = document.getElementsByClassName("category");
  for (let i = categories.length - 1; i >= 0; i--) categories[i].remove();

  data.forEach((el) => {
    createCategory(el);
  });
};

const exportPaste = () => navigator.clipboard.writeText(getCategories() || "");

const save = async (text) => {
  try {
    if (JSON.parse(text)) setCategories(text);
    loadCategories();
  } catch (error) {
    console.log(error);
  }
};

const showDropdown = () =>
  document.getElementById("myDropdown").classList.toggle("show");

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".menu")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const importURL = () => save(prompt("Please enter import string", ""));

const showImportDialog = () => {
  const dialog = document.getElementById("importDialog");
  const text = document.getElementById("importText");
  text.innerText = getCategories();
  dialog.showModal();
};

const confirmImportDialog = () => {
  const text = document.getElementById("importText");
  save(text.value);
};

const cancelImportDialog = () => {
  const dialog = document.getElementById("importDialog");
  dialog.close("animalNotChosen");
};

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "./",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
registerServiceWorker();
