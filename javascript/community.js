/**
 * JavaScript for Community Page
 * - Submit and display posts.
 */
document.addEventListener('DOMContentLoaded', () => {
    const postContentInput = document.getElementById('post-content');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const discussionFeed = document.getElementById('discussion-feed');
    
    // --- Load posts from localStorage ---
    let posts = JSON.parse(localStorage.getItem('studyhub-posts')) || [];

    function savePosts() {
        localStorage.setItem('studyhub-posts', JSON.stringify(posts));
    }

    function displayPosts() {
        // discussionFeed.innerHTML = '';
         if (posts.length === 0) {
             // The example post is in the HTML, so we don't need a message here.
             // You can add one if you remove the static example.
             return;
        }
        
        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'bg-gray-50 p-5 rounded-lg shadow-sm';
            postEl.innerHTML = `
                <div class="flex items-start space-x-4">
                    <img class="w-12 h-12 rounded-full" src="https://placehold.co/100x100/E2E8F0/4A5568?text=You" alt="User avatar">
                    <div class="flex-1">
                        <p class="font-semibold text-gray-800">You</p>
                        <p class="text-sm text-gray-500">${new Date(post.timestamp).toLocaleString()}</p>
                        <p class="mt-2 text-gray-700">${post.content}</p>
                    </div>
                </div>
            `;
            // insert at top
            discussionFeed.prepend(postEl);
        });
    }

    submitPostBtn.addEventListener('click', () => {
        const content = postContentInput.value.trim();
        if (content) {
            posts.push({
                content: content,
                timestamp: new Date().toISOString()
            });
            postContentInput.value = '';
            savePosts();
            displayPosts();
        }
    });

    // Initial display - this will show saved posts along with the static one
    displayPosts();

});
