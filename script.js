fetch('https://jsonplaceholder.typicode.com/posts')
.then(reply => reply.json())
.then(posts =>{
  posts.forEach(data => {
    const apiContainer = document.getElementById('api');
    const post = document.createElement('div');
    post.classList.add('post' , 'col-md-6')
    post.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.body}</p>
    <button type="button" class="m"  data-post-id="${data.id}">Show Comments</button>
    <div class="comments" id="comments-${data.id}"></div>

    `;
 
    apiContainer.appendChild(post);
    post.querySelector('button').addEventListener('click' , function() {
        const postId = this.getAttribute('data-post-id');
        const commentsContainer = document.getElementById(`comments-${postId}`);
        if(commentsContainer.innerHTML===''){
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(reply => reply.json())
            .then(comments => { 
                comments.forEach(comment =>{
                     const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerHTML = `
                    <p><strong>${comment.name} (${comment.email})</strong></p>
                    <p>${comment.body}</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                 });

                
            });
        }else {
            commentsContainer.innerHTML =` `;
        }
    });
});
});
