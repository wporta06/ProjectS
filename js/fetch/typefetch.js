const divisionstbody = document.querySelector('.divisionstbody');
const addpostform = document.querySelector('.add-post-form');
// const divisioninp = document.getElementById('divisioninp');
let dropdown = document.getElementById('locality-dropdown');
let service = document.getElementById('service');
// const del = document.getElementById('del');




let output = '';
let url = 'http://localhost/stgapi/type'

const renderPosts = (posts) => {
    console.log("zzzz");
    posts.forEach(datar => {
        output +=

            `<tr data-id="${datar.id}">
            <td  class="odd">${datar.id_categorie}</td>
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



// for drop down in ajout popup ===========
const renderDrop = (data) => {

    let dropdown = document.getElementById('locality-dropdown'); //repeated!!
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Selecte Catégorie';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    console.log(data);
    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].categorie;
        option.value = data[i].id;
        dropdown.add(option);
    }

}

fetch("http://localhost/stgapi/categorie")
    .then(res => res.json())
    .then(data => renderDrop(data))


// create new divetion
addpostform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(dropdown.value);
    console.log(service.value);

    fetch(url + "/add", {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_categorie: dropdown.value,
                designiation: service.value,
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
    let valuee = e.target.parentElement.parentElement.getElementsByTagName('td')[1].innerText;

    console.log(valuee);
    if (editBtnIsPressed) {
        console.log(id);
        console.log("updated");
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