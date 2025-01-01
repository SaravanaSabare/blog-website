const blogForm = document.getElementById("blog-form");
const blogContainer = document.getElementById("blog-container");

async function fetchBlogs() {
    const response = await fetch('http://localhost:3000/blogs');
    const blogs = await response.json();
    blogContainer.innerHTML = '';
    blogs.forEach(blog => {
        const blogDiv = document.createElement("div");
        blogDiv.className = "blog";
        blogDiv.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p>`;
        blogContainer.appendChild(blogDiv);
    });
}

blogForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;

    await fetch('http://localhost:3000/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });

    blogForm.reset();
    fetchBlogs();
});

fetchBlogs();
