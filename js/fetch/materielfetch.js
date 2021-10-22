const divisionstbody = document.querySelector('.divisionstbody');
const addpostform = document.querySelector('.add-post-form');
// const divisioninp = document.getElementById('divisioninp');
let dropdown = document.getElementById('locality-dropdown');
let dropdownmarque = document.getElementById('locality-dropdownmarque');
let dropdowntype = document.getElementById('locality-dropdowntype');

let modeleinput = document.getElementById('modeleinput');
let nserieinput = document.getElementById('nserieinput');
let acquinput = document.getElementById('acquinput');
let nacquinput = document.getElementById('nacquinput');
let etatinput = document.getElementById('etatinput');
let instockinput = document.getElementById('instockinput');
let noteinput = document.getElementById('noteinput');





let output = '';
let url = 'http://localhost/stgapi/materiel'

const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        output +=

            ` <tr data-id="${datar.id}">

            <td class="border" >${datar.categorie}</td>
            <td class="border" >${datar.id_type}</td>
            <td class="border" >${datar.id_marque}</td>
            <td class="border" contenteditable="true" >${datar.model}</td>
            <td class="border" contenteditable="true" >${datar.nserie}</td>
            <td class="border" contenteditable="true" >${datar.acquisition}</td>
            <td class="border" contenteditable="true" >${datar.nacquisition}</td>
            <td class="border" >
                <select id="borderr" value="${datar.etat}">
                    <option >${datar.etat}</option>
                    <option value="neuf">neuf</option>
                    <option value="bon">Bon</option>
                    <option value="moyen">Moyen</option>
                    <option value="mauvais">Mauvais</option>
                    <option value="panne">Panne</option>
                </select>
            </td>
            <td class="border" contenteditable="true" >${datar.instock}</td>
            <td class="border" contenteditable="true" >${datar.note}</td>
            <td><button class="btn btn-success" type="submit" id="edit-row">save</button>

        </tr>`

    });
    divisionstbody.innerHTML = output;
}

fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))



// for drop down Catégorie in popup ===========
let idvalue = 1;
const renderDrop = (data) => {
    let dropdown = document.getElementById('locality-dropdown'); //repeated!!
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Selecte Catégorie';
    defaultOption.setAttribute("disabled", false);


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
    dropdown.addEventListener('click', (e) => {
        // e.preventDefault();

        idvalue = e.target.value;
        console.log(idvalue);

        // for drop down type in popup ===========
        // drop down type api ========================= from here
        const renderTypeDrop = (data) => {

            let dropdowntype = document.getElementById('locality-dropdowntype'); //repeated!!
            dropdowntype.length = 0;

            let defaultOption = document.createElement('option');
            defaultOption.text = 'Selecte Type';
            defaultOption.setAttribute("disabled", false);

            dropdowntype.add(defaultOption);
            dropdowntype.selectedIndex = 0;

            console.log(data);
            let option;
            for (let i = 0; i < data.length; i++) {
                // console.log("object");
                option = document.createElement('option');
                option.text = data[i].designiation;
                option.value = data[i].id; //i replease id with id_categorie
                // option. data-id = data[i].id_categorie;
                if (data[i].id_categorie == idvalue) {

                    dropdowntype.add(option);
                }

            }

        }

        fetch("http://localhost/stgapi/type")
            .then(res => res.json())
            .then(data => renderTypeDrop(data))

        // type api ========================= to here    
    })
}

fetch("http://localhost/stgapi/categorie")
    .then(res => res.json())
    .then(data => renderDrop(data))

console.log(idvalue);

// for drop down type in popup ===========



// for drop down in Marque in popup ===========
const renderMarqueDrop = (data) => {


    let dropdownmarque = document.getElementById('locality-dropdownmarque'); //repeated!!
    dropdownmarque.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Selecte Marque';
    defaultOption.setAttribute("disabled", false);

    dropdownmarque.add(defaultOption);
    dropdownmarque.selectedIndex = 0;

    console.log(data);
    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].marque;
        option.value = data[i].id;
        dropdownmarque.add(option);

    }

}

fetch("http://localhost/stgapi/marque")
    .then(res => res.json())
    .then(data => renderMarqueDrop(data))



// create new materiel
addpostform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(dropdown.value);
    console.log(dropdownmarque.value);
    console.log(modeleinput.value);
    console.log(nserieinput.value);
    console.log(acquinput.value);
    console.log(nacquinput.value);
    console.log(etatinput.value);
    console.log(instockinput.value);
    console.log(noteinput.value);

    fetch(url + "/add", {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categorie: dropdown.value,
                model: modeleinput.value,
                nserie: nserieinput.value,
                acquisition: acquinput.value,
                nacquisition: nacquinput.value,
                etat: etatinput.value,
                instock: instockinput.value,
                id_marque: dropdownmarque.value,
                id_type: dropdowntype.value,
                note: noteinput.value
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


// // delete divesion

// divisionstbody.addEventListener('click', (e) => {
//     // console.log(e.target.id);
//     e.preventDefault();
//     let delBtnIsPressed = e.target.id == "delete-row";
//     let editBtnIsPressed = e.target.id == "edit-row";

//     let id = e.target.parentElement.parentElement.dataset.id;
//     if (delBtnIsPressed) {
//         fetch(url + "/delete/" + id, {

//             method: 'POST',
//             headers: {

//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         }).then(() => location.reload());
//     }
// });




// update

divisionstbody.addEventListener('click', (e) => {
    e.preventDefault();
    let editBtnIsPressed = e.target.id == "edit-row";

    let id = e.target.parentElement.parentElement.dataset.id;
    let modeleinput = e.target.parentElement.parentElement.getElementsByTagName('td')[3].innerText;
    let nserieinput = e.target.parentElement.parentElement.getElementsByTagName('td')[4].innerText;
    let acquinput = e.target.parentElement.parentElement.getElementsByTagName('td')[5].innerText;
    let nacquinput = e.target.parentElement.parentElement.getElementsByTagName('td')[6].innerText;
    let etatinputu = e.target.parentElement.parentElement.getElementsByTagName('td')[7].firstElementChild.value;
    let instockinput = e.target.parentElement.parentElement.getElementsByTagName('td')[8].innerText;
    let noteinput = e.target.parentElement.parentElement.getElementsByTagName('td')[9].innerText;
    console.log(id);
    console.log(modeleinput);
    console.log(nserieinput);
    console.log(acquinput);
    console.log(nacquinput);
    console.log(etatinputu);
    console.log(instockinput);
    console.log(noteinput);

    if (editBtnIsPressed) {
        console.log("updated");
        fetch(url + "/Update/" + id, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    model: modeleinput,
                    nserie: nserieinput,
                    acquisition: acquinput,
                    nacquisition: nacquinput,
                    etat: etatinputu,
                    instock: instockinput,
                    note: noteinput
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