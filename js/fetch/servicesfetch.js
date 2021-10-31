const divisionstbody = document.querySelector('.divisionstbody');
const addpostform = document.querySelector('.add-post-form');
const divisioninp = document.getElementById('divisioninp');
let dropdown = document.getElementById('locality-dropdown');
let service = document.getElementById('service');
// const del = document.getElementById('del');




let output = '';
let url = 'http://localhost/stgapi/service'

const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        // show divition name using the id
        fetch("http://localhost/stgapi/division")
            .then(res => res.json())
            .then(data => {

                data.forEach(datar1 => {
                    if (datar.id_division == datar1.id) {

                        output +=

                            `<tr data-id="${datar.id}">
                        <td  class="odd bg-light">${datar1.designiation}</td>
                        <td  class="odd" id="savee" contenteditable="true">${datar.designiation}</td>
                        <td class="odd">
                            <button class="btn btn-danger" type="submit" id="delete-row">delete</button>
                            <button class="btn btn-success" type="submit" id="edit-row">save</button>
                        </td>
                    </tr>`


                    }
                });
                divisionstbody.innerHTML = output;
            })
    })
}

fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))



// for drop down in ajout popup ===========
const renderDrop = (data) => {

    let dropdown = document.getElementById('locality-dropdown'); //repeated!!
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Selecte Division';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    console.log(data);
    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].designiation;
        option.value = data[i].id;
        dropdown.add(option);
    }

}

fetch("http://localhost/stgapi/division")
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
                designiation: service.value,
                id_division: dropdown.value
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