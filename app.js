const container = document.querySelector('.container');
const loadingEl = document.querySelector('.loading');

getPost();
getPost();
getPost();

window.addEventListener('scroll', () => {
  // scrollTop: mennyit tekertünk le, ScrollHeight: a dokumenum teljes magassága, clientHeight: amennyi éppen látszik a dokumentumból
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // show loading animation
    showLoading();
  }
});

function showLoading() {
  loadingEl.classList.add('show');
  // load more data
  setTimeout(getPost, 1000);
}

async function getPost() {
  const postsUrl = `https://jsonplaceholder.typicode.com/posts/${randomPost()}`;
  const randUserUrl = `https://randomuser.me/api/`;
  // fetch posts
  const response = await fetch(postsUrl);
  const postData = await response.json();
  // fetch users
  const usersResponse = await fetch(randUserUrl);
  const usersData = await usersResponse.json();

  const data = { post: postData, user: usersData.results[0] };

  render(data);
}

function render(posts) {
  const post = document.createElement('div');
  post.classList.add('blog-post');
  post.innerHTML = `
      <h2 class="title">${posts.post.title}</h2>
      <p class="text">${posts.post.body}</p>
      <div class="author">
        <img src="${posts.user.picture.thumbnail}" alt=""/>
        <span>${posts.user.name.title} ${posts.user.name.first} ${posts.user.name.last}</span>
      </div>
      
      `;
  container.appendChild(post);
  // hideing loading animation
  loadingEl.classList.remove('show');
}

// genereate random number to fetch random post
function randomPost() {
  return Math.floor(Math.random() * 100) + 1;
}
