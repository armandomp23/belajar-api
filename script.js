const apiUrl = 'http://localhost:5000/notes';

// Ambil dan Tampilkan Semua Notes
async function fetchNotes() {
    const response = await fetch(apiUrl);
    const notes = await response.json();
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.note}</p>
            <small>${new Date(note.datetime).toLocaleString()}</small>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Buat Note
async function createNote() {
    const title = document.getElementById('title').value;
    const datetime = document.getElementById('datetime').value;
    const note = document.getElementById('note').value;

    if (title && datetime && note) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, datetime, note })
        });

        if (response.ok) {
            fetchNotes();
            document.getElementById('title').value = '';
            document.getElementById('datetime').value = '';
            document.getElementById('note').value = '';
        }
    } else {
        alert('Please fill in all fields');
    }
}

// Hapus Note
async function deleteNote(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchNotes();
    }
}

// Initial fetch
fetchNotes();