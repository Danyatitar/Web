const create_btn = document.querySelector(".create-btn");
const update_btn = document.querySelector(".update-btn");
const delete_btn = document.querySelector(".delete-btn");
const submit_create_btn = document.querySelector(".submit-create-btn");
const submit_update_btn = document.querySelector(".submit-update-btn");
const submit_delete_btn = document.querySelector(".submit-delete-btn");
const close_create_btn = document.querySelector(".close-create-btn");
const close_update_btn = document.querySelector(".close-update-btn");
const close_delete_btn = document.querySelector(".close-delete-btn");
const error_create = document.querySelector(".error-create");
const error_update = document.querySelector(".error-update");
const error_delete = document.querySelector(".error-delete");
const error_create_dup = document.querySelector(".error-create-dup");
const error_update_exist = document.querySelector(".error-not-exist-update");
const error_delete_exist = document.querySelector(".error-not-exist-delete");
const form_create = document.querySelector(".form-create");
const form_update = document.querySelector(".form-update");
const form_delete = document.querySelector(".form-delete");
const create_title = document.querySelector(".create-title");
const update_title = document.querySelector(".update-title");
const delete_title = document.querySelector(".delete-title");
const create_description = document.querySelector(".create-description");
const create_font = document.querySelector(".create-font");
const create_color = document.querySelector(".create-color");
const update_description = document.querySelector(".update-description");
const update_font = document.querySelector(".update-font");
const update_color = document.querySelector(".update-color");

create_btn.addEventListener("click", () => {
  form_create.classList.remove("hidden");
});

close_create_btn.addEventListener("click", () => {
  form_create.classList.add("hidden");
});

update_btn.addEventListener("click", () => {
  form_update.classList.remove("hidden");
});

close_update_btn.addEventListener("click", () => {
  form_update.classList.add("hidden");
});

delete_btn.addEventListener("click", () => {
  form_delete.classList.remove("hidden");
});

close_delete_btn.addEventListener("click", () => {
  form_delete.classList.add("hidden");
});

submit_create_btn.addEventListener("click", async () => {
  if (create_title.value === "") {
    error_create.classList.remove("hidden");
  } else {
    error_create.classList.add("hidden");
    const res = await fetch(`http://localhost:3001/bars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: create_title.value,
        description: create_description.value,
        font: create_font.value,
        color: create_color.value,
      }),
    });
    let data = res.status;
    if (data === 400) {
      error_create_dup.classList.remove("hidden");
    } else {
      error_create_dup.classList.add("hidden");
      alert("New notification was created");
    }
  }
});

submit_update_btn.addEventListener("click", async () => {
  if (update_title.value === "") {
    error_update.classList.remove("hidden");
  } else {
    error_create.classList.add("hidden");
    const res = await fetch(`http://localhost:3001/bars`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: update_title.value,
        description: update_description.value,
        font: update_font.value,
        color: update_color.value,
      }),
    });
    const data = res.status;
    if (data === 400) {
      error_update_exist.classList.remove("hidden");
    } else {
      error_update_exist.classList.add("hidden");
      alert(`Notification with title ${update_title.value} was updates`);
    }
  }
});

submit_delete_btn.addEventListener("click", async () => {
  if (delete_title.value === "") {
    error_delete.classList.remove("hidden");
  } else {
    error_create.classList.add("hidden");
    const res = await fetch(`http://localhost:3001/bars`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: delete_title.value,
      }),
    });
    const data = res.status;
    if (data === 400) {
      error_delete_exist.classList.remove("hidden");
    } else {
      error_delete_exist.classList.add("hidden");
      alert(`Notification with title ${delete_title.value} was deleted`);
    }
  }
});
