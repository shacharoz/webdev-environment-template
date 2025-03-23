document.querySelector(".button").addEventListener("click", () => {
    alert("Button Clicked!");
});


//rest api calls with server
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // Fetch data from a REST API
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => {
      // Create a new element to display the API response
      const post = document.createElement("div");
      post.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
      `;
      container.appendChild(post);
    })
    .catch(error => console.error("Error fetching data:", error));
});


fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "My New Post",
    body: "This is the content of my new post.",
    userId: 1
  })
})
.then(response => response.json())
.then(data => console.log("Post Created:", data))
.catch(error => console.error("Error:", error));

