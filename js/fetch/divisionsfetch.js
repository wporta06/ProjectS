const divisionstbody = document.querySelector('.divisionstbody');
const addpostform = document.querySelector('.add-post-form');
const divisioninp = document.getElementById('divisioninp');

let output = '';
let url = 'http://localhost/stgapi/division'

// read
const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        output +=

            `<tr data-id="${datar.id}">
        <td class="odd" contenteditable="true"  >${datar.designiation}</td>
        <td class="odd">
        <a class="" id="delete-row">delete</a>
        <a class="edit" id="edit-row" data-toggle="modal"><i  class="fas fas fa-save fa-1x ml-3"></i></a>
        </td>
        </tr>`

    });
    divisionstbody.innerHTML = output;
}

fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))


// create new divetion
addpostform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("clicked");

    fetch(url, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                designiation: divisioninp.value,
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
        .then(() => location.reload());
})

// delete divesion

divisionstbody.addEventListener('click', (e) => {
    // console.log(e.target.id);
    e.preventDefault();
    let delBtnIsPressed = e.target.id == "delete-row";
    let editBtnIsPressed = e.target.id == "edit-row";

    let id = e.target.parentElement.parentElement.dataset.id;
    if (delBtnIsPressed) {
        console.log("eeee");
        const myDataObject = { id: id }
        fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myDataObject)
            })
            .then(response => {
                return response.json()
            })
            .then(data =>
                // this is the data we get after doing the delete request, do whatever you want with this data
                console.log(data)
            );
    }

})