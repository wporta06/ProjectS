const divisionstbody = document.querySelector('.divisionstbody');
let output = '';



const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        output +=

            `<tr data-id="${datar.id}">
            <td class="odd" contenteditable="true"  >${datar.title}</td>
            <td class="odd">
                <a class="edit fas fa-trash-alt fa-1x ml-3" id="delete-row">d</a>
                <a class="edit" id="edit-row" data-toggle="modal"><i  class="fas fas fa-save fa-1x ml-3"></i></a>
            </td>
        </tr>`

    });
    divisionstbody.innerHTML = output;
}

fetch("http://localhost/apitraversy/api/post/read.php")
    .then(res => res.json())
    .then(data => renderPosts(data));



divisionstbody.addEventListener('click', (e) => {
    console.log(e.target.id);
    e.preventDefault();
    let delBtnIsPressed = e.target.id == "delete-row";
    let editBtnIsPressed = e.target.id == "edit-row";

    console.log(e.target.parentElement.dataset.id);
    if (delBtnIsPressed) {

    }
    let id = e.target.parentElement.parentElement.dataset.id;
})