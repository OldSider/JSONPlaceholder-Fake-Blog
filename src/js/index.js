const postArea = document.querySelector(".posts");

async function readPosts() {
  postArea.innerHTML = "Loading...";

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await response.json();

  if (json.length > 0) {
    postArea.innerHTML = "";

    for (const { title, body } of json) {
      postArea.insertAdjacentHTML(
        "beforeend",
        `<div>
          <h1>${title}</h1>
          <hr>
          <p>${body}</p>
        </div>`
      );
    }
  } else {
    postArea.innerHTML = "No Posts Found";
  }
}

async function addNewPost(titlePost, bodyPost) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titlePost,
      body: bodyPost,
      userId: 2,
    }),
  });

  document
    .querySelectorAll("#titleField, #bodyField")
    .forEach((input) => (input.value = ""));

  readPosts();
}

document.querySelector("#insertButton").addEventListener("click", () => {
  const title = document.querySelector("#titleField").value;
  const body = document.querySelector("#bodyField").value;

  if (title && body) {
    addNewPost(title, body);
  } else {
    alert("the field is empty");
  }
});

readPosts();
