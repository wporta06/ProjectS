const affectbody = document.querySelector('.affectbody');
let output = '';



let url = 'http://localhost/stgapi/affectation'
fetch("http://localhost/apitraversy/api/post/read.php")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(datar => {
            output +=

                ` <tr>

                <td class="border text-primary edit">${datar.author} <i class="fas fa-search"></i></td>
                <td class="border text-primary edit">${datar.id} <i class="fas fa-search"></i></td>
                <td class="border">${datar.category_name}</td>
                <td class="border">${datar.category_name}</td>
                <td class="border">${datar.category_name}</td>
               

            </tr>`

        });
        affectbody.innerHTML = output;
    })

const renderDropuser = (data) => {
    let dropdown = document.getElementById('locality-dropdown-users'); //repeated!!
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Selecte user';
    defaultOption.setAttribute("disabled", false);


    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    // console.log(data);
    let option;
    for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].Nom + ' ' + data[i].Prenom;
        option.value = data[i].Id;
        dropdown.add(option);

    }

}

fetch("http://localhost/stgapi/personnes")
    .then(res => res.json())
    .then(data => renderDropuser(data))


// for drop down Catégorie in popup ===========
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