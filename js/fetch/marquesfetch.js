console.log("zadza");
const marquestbody = document.querySelector('.marquestbody');
let output = '';

fetch("http://localhost/stgapi/marque")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(datar => {
            output +=

                ` <tr>

                <td class="odd" contenteditable="true">${datar.marque}</td>
                <td class="odd">
                    <a class="edit" title="delete" data-toggle="modal"><i id="delbtn" class="fas fa-trash-alt fa-1x ml-3"></i></a>
                    <a class="edit" title="edit" data-toggle="modal"><i  class="fas fas fa-save fa-1x ml-3"></i></a>

                </td>
            </tr>`

        });
        marquestbody.innerHTML = output;
    })