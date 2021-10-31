const uertbody = document.querySelector('.uertbody');
const addpostform = document.querySelector('.add-post-form');
const nom = document.querySelector('#nom');
const prenom = document.querySelector('#prenom');
const factionid = document.querySelector('#factionid');
const dropdown = document.querySelector('#locality-dropdown');
const dropdownservice = document.querySelector('#locality-dropdowntype');
const structure = document.querySelector('#structure');
// const divisiondropdown = document.querySelector('#divisiondropdown');
const servicedropdown = document.querySelector('#servicedropdown');
const ppr = document.querySelector('#ppr');
const note = document.querySelector('#note');
let output = '';
let url = 'http://localhost/stgapi/personnes'
    // const divisionstbody = document.querySelector('.divisionstbody');


const renderPosts = (posts) => {
    console.log(posts);
    posts.forEach(datar => {
        // show division name using the id
        fetch("http://localhost/stgapi/division")
            .then(res => res.json())
            .then(data => {
                data.forEach(datar1 => {
                    // show Service name using the id
                    fetch("http://localhost/stgapi/service")
                        .then(res => res.json())
                        .then(data => {
                            data.forEach(datar2 => {
                                // ican revove this if
                                if (datar.Id_division == datar1.id) {
                                    output +=

                                        ` <tr data-id="${datar.Id}">
        <td class="border" contenteditable="true">${datar.Nom}</td>
        <td class="border" contenteditable="true">${datar.Prenom}</td>
        <td class="border ">
            <select id="borderr" value="${datar.Fonction}">
                <option hidden >${datar.Fonction}</option>
                <option value="Agent">Agent</option>
                <option value="Chef Service">Chef Service</option>
                <option value="Chef Division">Chef Division</option>
                <option value="Autre">Autre</option>
            </select>
        </td>
        <td class="border" contenteditable="true">${datar.Structure}</td>
        <td class="border bg-light"  >${datar1.designiation}</td>
        <td class="border bg-light" >${datar2.designiation}</td>
        <td class="border" contenteditable="true">${datar.Ppr}</td>
        <td class="border" contenteditable="true">${datar.Note}</td>
        <td><button class="btn btn-success" type="submit" id="edit-row">save</button>
    </tr>`

                                }
                            });
                            uertbody.innerHTML = output;
                        })
                })
            })
    })
}

fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))


// for drop down CatÃ©gorie in popup ===========
let idvalue = 1;
const renderDrop = (data) => {
    let dropdown = document.getElementById('locality-dropdown'); //repeated!!
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Selecte Division';
    defaultOption.setAttribute("disabled", false);


    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    // console.log(data);
    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].designiation;
        option.value = data[i].id;
        dropdown.add(option);

    }
    dropdown.addEventListener('click', (e) => {
        // e.preventDefault();

        idvalue = e.target.value;
        // console.log(idvalue);

        // for drop down type in popup ===========
        // drop down type api ========================= from here
        const renderTypeDrop = (data) => {

            let dropdownservice = document.getElementById('locality-dropdowntype'); //repeated!!
            dropdownservice.length = 0;

            let defaultOption = document.createElement('option');
            defaultOption.text = 'Selecte Type';
            defaultOption.setAttribute("disabled", false);

            dropdownservice.add(defaultOption);
            dropdownservice.selectedIndex = 0;

            // console.log(data);
            let option;
            for (let i = 0; i < data.length; i++) {
                // console.log("object");
                option = document.createElement('option');
                option.text = data[i].designiation;
                option.value = data[i].id; //i replease id with id_categorie
                // option. data-id = data[i].id_categorie;
                if (data[i].id_division == idvalue) {

                    dropdownservice.add(option);
                }

            }

        }

        fetch("http://localhost/stgapi/service")
            .then(res => res.json())
            .then(data => renderTypeDrop(data))

        // type api ========================= to here    
    })
}

fetch("http://localhost/stgapi/division")
    .then(res => res.json())
    .then(data => renderDrop(data))

console.log(idvalue);


// create new user
addpostform.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(nom.value);
    console.log(prenom.value);
    console.log(factionid.value);
    console.log(structure.value);
    console.log(dropdown.value);
    console.log(dropdownservice.value);
    console.log(ppr.value);
    console.log(note.value);
    fetch(url + "/add", {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: nom.value,
                prenom: prenom.value,
                structure: structure.value,
                fonction: factionid.value,
                id_division: dropdown.value,
                id_service: dropdownservice.value,
                ppr: ppr.value,
                note: note.value

            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        }).then(() => location.reload());

})


// update

uertbody.addEventListener('click', (e) => {
    e.preventDefault();
    let editBtnIsPressed = e.target.id == "edit-row";

    let id = e.target.parentElement.parentElement.dataset.id;
    let nominput = e.target.parentElement.parentElement.getElementsByTagName('td')[0].innerText;
    let prenominput = e.target.parentElement.parentElement.getElementsByTagName('td')[1].innerText;
    let foncinputu = e.target.parentElement.parentElement.getElementsByTagName('td')[2].firstElementChild.value;
    let strucinput = e.target.parentElement.parentElement.getElementsByTagName('td')[3].innerText;
    let pprinput = e.target.parentElement.parentElement.getElementsByTagName('td')[6].innerText;
    let notrinput = e.target.parentElement.parentElement.getElementsByTagName('td')[7].innerText;
    console.log(id);
    console.log(nominput);
    console.log(prenominput);
    console.log(foncinputu);
    console.log(strucinput);
    console.log(pprinput);
    console.log(notrinput);

    if (editBtnIsPressed) {
        console.log("updated");
        fetch(url + "/Update/" + id, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    nom: nominput,
                    prenom: prenominput,
                    structure: strucinput,
                    fonction: foncinputu,
                    // id_division: dropdown.value,
                    // id_service: dropdownservice.value,
                    ppr: pprinput,
                    note: notrinput
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