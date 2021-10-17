const divisionstbody = document.querySelector('.divisionstbody');
const addpostform = document.querySelector('.add-post-form');
const divisioninp = document.getElementById('divisioninp');
// const del = document.getElementById('del');

let output = '';
let url = 'http://localhost/stgapi/division'

const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        output +=

            `<tr data-id="${datar.id}">
                <td  class="odd" id="savee" contenteditable="true">${datar.designiation}</td>
                <td class="odd">
                    <button class="btn btn-danger" type="submit" id="delete-row">delete</button>
                    <button class="btn btn-success" type="submit" id="edit-row">save</button>
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

    fetch(url + "/add", {
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
        fetch(url + "/delete/" + id, {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(() => location.reload());
    }
});

// update

divisionstbody.addEventListener('click', (e) => {
    e.preventDefault();
    let editBtnIsPressed = e.target.id == "edit-row";

    let id = e.target.parentElement.parentElement.dataset.id;
    let valuee = e.target.parentElement.parentElement.firstElementChild.innerText;
    // console.log(valuee);
    if (editBtnIsPressed) {
        // console.log(valuee);
        // console.log("updated");
        fetch(url + "/Update/" + id, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    designiation: valuee,
                })
            })
            .then(res => res.json())
            .then(data => {
                const dataArr = [];
                dataArr.push(data);
                renderPosts(dataArr);
            })
            .then(() => location.reload());
    }

})