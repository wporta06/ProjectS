const servicetbody = document.querySelector('.servicetbody');
let output = '';

fetch("http://localhost/apitraversy/api/post/read.php")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(datar => {
            output +=

                `<tr>

                <td class="odd">${datar.title}</td>
                <td class="odd">${datar.id}</td>
                <td class="odd">
                    <a class="edit" title="delete" data-toggle="modal"><i id="delbtn" class="fas fa-trash-alt fa-1x ml-3"></i></a>
                    <a class="edit" title="edit" data-toggle="modal"><i  class="fas fas fa-edit fa-1x ml-3"></i></a>
                </td>
            </tr>`

        });
        servicetbody.innerHTML = output;
    })