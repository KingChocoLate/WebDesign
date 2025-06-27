document.addEventListener('DOMContentLoaded', () => {
    const postContentInput = document.getElementById('post-content');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const discussionFeed = document.getElementById('discussion-feed');
    
    let posts = [
        {
            username: 'StudentA',
            timestamp: '2 hours ago',
            avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=User',
            content: "Has anyone found good resources for learning advanced calculus? I'm struggling with series and sequences."
        },
        {
            username: 'StudentC',
            timestamp: '5 hours ago',
            avatar: 'https://placehold.co/100x100/A0AEC0/4A5568?text=User',
            content: "I found Khan Academy to be super helpful for calculus. Their videos on Taylor series are top-notch!"
        },
        {
            username: 'StudentB',
            timestamp: '1 day ago',
            avatar: 'https://placehold.co/100x100/CBD5E0/4A5568?text=User',
            content: "Just deployed my first personal website project! It's a simple portfolio, but I'm proud of it. Built with HTML, CSS, and a little bit of JavaScript."
        }
    ];

    function displayPosts() {
        discussionFeed.innerHTML = ''; // Clear feed before re-rendering
        
        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'bg-gray-50 p-5 rounded-lg shadow-sm';
            
            const sanitizedContent = post.content.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Sanitize content
            postEl.innerHTML = `
                <div class="flex items-start space-x-4">
                    <img class="w-12 h-12 rounded-full" src="${post.avatar}" alt="User avatar">
                    <div class="flex-1">
                        <p class="font-semibold text-gray-800">${post.username}</p>
                        <p class="text-sm text-gray-500">${post.timestamp}</p>
                        <p class="mt-2 text-gray-700 break-words">${sanitizedContent}</p>
                    </div>
                </div>
            `;
            discussionFeed.appendChild(postEl);
        });
    }

    submitPostBtn.addEventListener('click', () => {
        const content = postContentInput.value.trim();
        if (content) {
            const newPost = {
                username: 'You',
                timestamp: 'Just now',
                avatar: 'https://placehold.co/100x100/93c5fd/1e3a8a?text=You', // User avatar
                content: content
            };
            
            posts.unshift(newPost); // Add new post to top
            postContentInput.value = '';
            displayPosts(); // Re-render feed
        }
    });

    displayPosts(); // Initial display of posts
});