const uertbody = document.querySelector('.uertbody');
const adduserform = document.querySelector('.add-user-form');
const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const fonction = document.querySelector('#fonction');
const structure = document.querySelector('#structure');
const division = document.querySelector('#division');
const service = document.querySelector('#service');
const ppr = document.querySelector('#ppr');
const note = document.querySelector('#note');
let output = '';

const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        output +=

            ` <tr>
        <!-- <th scope="row">1</th> -->
        <td class="border" contenteditable="true">${datar.author}</td>
        <td class="border" contenteditable="true">${datar.author}</td>
        <td class="border" contenteditable="true">${datar.author}</td>
        <td class="border" contenteditable="true">${datar.id}</td>
        <td class="border" contenteditable="true">${datar.author}</td>
        <td class="border" contenteditable="true">${datar.author}</td>
        <td class="border" contenteditable="true">${datar.author}</td>
        <td class="border" contenteditable="true">${datar.title}</td>
        <td><a class="edit" title="Edit" data-toggle="modal"><i  class="fas fa-save fa-2x ml-3"></i></a>
            <!-- <a class="delete" title="Delete" data-toggle="modal"></a> -->
        </td>
    </tr>`

    });
    uertbody.innerHTML = output;
}

fetch("http://localhost/apitraversy/api/post/read.php")
    .then(res => res.json())
    .then(data => renderPosts(data))

// creat user - inser

adduserform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("added");
    fetch('http://localhost/apitraversy/api/post/create.php', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: nom.value,
                title: prenom.value,
                // fonction: fonction.value,
                // structure: structure.value,
                // division: division.value,
                // service: service.value,
                // ppr: ppr.value,
                // note: note.value,
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
})