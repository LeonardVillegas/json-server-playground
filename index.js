console.log("funciono");
const API_URL = 'http://localhost:3000/books/';

const SECURITY_HEADERS = {
    method: "GET",
    headers: {
        "content-type": "applications/json",
    }
};

fetch(API_URL, SECURITY_HEADERS)
    .then(response => response.json())
    .then(file => {
        console.log(file)
        createTable(file)
    });

function createTable(data) {
    console.log("datos del sistema")
    console.log(data)
    // Create table element
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';

    // Create table header row
    const tHead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Id', 'Nombre', 'Vistas'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        // th.style.border = '1px solid black';
        // th.style.padding = '8px';
        headerRow.appendChild(th);
    });
    tHead.appendChild(headerRow);
    table.appendChild(tHead);

    // Create table rows
    const tbody = document.createElement('tbody');
    data.forEach(rowData => {
        const row = document.createElement('tr');
        console.log("row data");
        console.log(rowData);
        Object.values(rowData).forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            // td.style.border = '1px solid black';
            // td.style.padding = '8px';
            row.appendChild(td);
        });
        tbody.append(row)
    });
    table.appendChild(tbody);

    // Append table to the container
    const tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(table);
}


document.addEventListener('DOMContentLoaded', function() {
    console.log("leee");
    document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const bookId = document.getElementById('bookId').value;
    const bookName = document.getElementById('bookName').value;
    const bookViews = document.getElementById('bookViews').value;

    const bookData = {
        id: bookId,
        title: bookName,
        views: bookViews
    };
    console.log("adentro")

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
});