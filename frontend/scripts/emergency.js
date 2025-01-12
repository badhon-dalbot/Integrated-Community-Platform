function fetchMessages() {
    // Example: Replace with your API call to fetch messages
    fetch('/api/getMessages')
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '<h2>All Emergency Messages</h2>'; // Reset messages
            data.forEach(message => {
                const card = document.createElement('div');
                card.classList.add('message-card');
                card.innerHTML = `
                            <h3>${message.title}</h3>
                            <p>${message.description}</p>
                            <p><strong>Date Issued:</strong> ${message.date_issued}</p>
                            <p><strong>Time Issued:</strong> ${message.time_issued}</p>
                            <p class="message-status">Status: ${message.status}</p>
                        `;
                messagesDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
}

// Add a new message to the database
document.getElementById('addMessageBtn').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dateIssued = document.getElementById('date_issued').value;
    const timeIssued = document.getElementById('time_issued').value;
    const status = document.getElementById('status').value;

    const message = { title, description, date_issued: dateIssued, time_issued: timeIssued, status };

    // Example: Replace with your API call to add the message
    fetch('/api/addMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => {
            if (response.ok) {
                alert('Message added successfully!');
                fetchMessages(); // Refresh messages
            } else {
                alert('Failed to add message.');
            }
        })
        .catch(error => console.error('Error adding message:', error));
});

// Initial fetch of messages
fetchMessages();