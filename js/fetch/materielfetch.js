const materieltbody = document.querySelector('.materieltbody');
let output = '';

fetch("http://localhost/apitraversy/api/post/read.php")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(datar => {
            output +=

                `  <tr>

                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.id}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.id}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td class="border" contenteditable="true">${datar.author}</td>
                <td><a class="edit" title="Edit" data-toggle="modal"><i  class="fas fa-save fa-2x ml-3"></i></a>

            </tr>`

        });
        materieltbody.innerHTML = output;
    })