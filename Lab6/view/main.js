function createNotification(title, description, color, font, id) {
  const body = document.querySelector(".container");
  const toast_create = document.createElement("div");
  toast_create.style.borderLeft = `6px solid ${color}`;
  const close = document.createElement("i");
  close.classList.add("close");
  close.innerHTML = "Close";
  toast_create.classList.add("hidden");
  toast_create.classList.add("toast");
  toast_create.innerHTML = `<div class="toast-content">
    <i  class="check" style="background-color: ${color}"></i>
    
    <div class="message">
      <span  class="text text-1" style="font-size: ${font}px">${title}</span>
      <span   class="text text-2" style="font-size: ${font}px">${description}</span>
    </div>
    </div>`;

  toast_create.appendChild(close);
  body.appendChild(toast_create);
}

const button = document.querySelector(".show-btn");

button.addEventListener("click", async () => {
  const bars = await fetch(`http://localhost:3001/bars`, {
    method: "GET",
  });
  const data = await bars.json();
  console.log(data.result);
  data.result.forEach((item, index) => {
    createNotification(
      item.Title,
      item.description,
      item.color,
      item.font,
      index
    );
  });
  toast = document.querySelectorAll(".toast");
  closeIcon = document.querySelectorAll(".close");
  toast.forEach((item) => {
    item.classList.remove("hidden");
    setTimeout(() => item.classList.add("active"), 100);
  });
  closeIcon.forEach((item, index) => {
    item.addEventListener("click", () => {
      toast[index].classList.remove("active");
      toast[index].remove();
    });
  });
});
