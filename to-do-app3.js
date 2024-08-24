let addBtn = document.querySelector(".learn-more");

const addNewNote = (text = "") => {
  const container = document.createElement("div");
  container.classList.add("container");
  const htmlData = `<div class="notes">
 <div class="operation">
     <button class="edit"><i class="bi bi-pencil-square"></i></button>
     <button class="delete"><i class="bi bi-trash"></i></button>
 </div>
    <div class="main ${text ? " " : "hidden"}" >
     </div>
     <textarea class="${text ? "hidden" : " "}" type="text" >
     </textarea> 
 </div>`;

  const saveData = () => {
    const allData = document.querySelectorAll("textarea");
    let data = [];
    allData.forEach((curelm) => { 
      return data.push(curelm.value);
    });
    localStorage.setItem("data", JSON.stringify(data));
  };

  container.insertAdjacentHTML("afterbegin", htmlData);

  let editBtn = container.querySelector(".edit");
  let deleteBtn = container.querySelector(".delete");
  let mainDiv = container.querySelector(".main");
  let textArea = container.querySelector("textarea");

  deleteBtn.addEventListener("click", () => {
    container.remove();
    saveData();
  });

  textArea.value = text;
  mainDiv.innerHTML = text;
  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;
    saveData();
  });

  document.body.appendChild(container);
};


(() => {
  const notes = JSON.parse(localStorage.getItem("data"));
  if (notes) {
    notes.forEach((note) => addNewNote(note));
  }
})();

addBtn.addEventListener("click", () => addNewNote());
