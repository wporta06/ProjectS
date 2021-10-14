const affectbody = document.querySelector('.affectbody');
let output = '';

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
                <td class="border">${datar.title}</td>
                <td class="text-center"><a class="edit" title="print" data-toggle="modal"><i class="fas fa-file-pdf fa-2x mr-1"></i></a>
                    <a class="edit" title="fin Affectation" data-toggle="modal" data-target="#affectationModal"><i class="fas fa-window-close fa-2x"></i></a>

                </td>

            </tr>`

        });
        affectbody.innerHTML = output;
    })