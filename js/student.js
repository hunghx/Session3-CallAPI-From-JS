// hiê thị du lieu
let btnDelete = [];
const showAllStudents = async () => {
    // lấy du liệu
    // call api
    let res = await fetch('http://localhost:8080/api.example.com/students');
    let data = await res.json();
    // chen vao the body
    let html = "";
    for (let i = 0; i < data.length; i++) {
        let student = data[i];
        html += ` <tr>
<!--                    <input type="hidden" value="${student.studentId}">-->
                    <td>${i + 1}</td>
                    <td>${student.name}</td>
                     <td>${student.age}</td>
                     <td><button onclick="showEdit(${student.studentId})">Edit</button></td>
                      <td><button class="delete" onclick="deleteById(${student.studentId})">Delete</button></td>
                   </tr>`;
    }
    document.getElementById("body").innerHTML = html;
    // btnDelete = document.querySelectorAll(".delete");
    // for (let i = 0; i < btnDelete.length; i++) {
    //     btnDelete[i].addEventListener('click', deleteStudent);
    // }

}
showAllStudents();
function deleteStudent(e) {
    let id = e.target.parentNode.parentNode.firstElementChild.value
    fetch("http://localhost:8080/api.example.com/students/" + id, {method: 'delete'})
        .then(res => {
            showAllStudents()
        })

}

function deleteById(id){
    fetch("http://localhost:8080/api.example.com/students/" + id, {method: 'delete'})
        .then(res => {
            showAllStudents()
        })
}
function addStudent() {

    let action = document.getElementById("add").innerText;
    let name = document.getElementById('name').value
    let age = +document.getElementById('age').value
    if (action==="Add"){
        let data = JSON.stringify({name,age})

        fetch("http://localhost:8080/api.example.com/students",{method : 'post',headers:{
                'Content-Type': 'application/json'
            },body : data})
            .then(res=> showAllStudents())
    }else {
        let id =document.getElementById("id").value;
        let data = JSON.stringify({name,age})

        fetch("http://localhost:8080/api.example.com/students/"+id,{method : 'put',headers:{
                'Content-Type': 'application/json'
            },body : data})
            .then(res=> showAllStudents())
        document.getElementById("add").innerText= "Add";
    }


}

let btnAdd = document.getElementById("add")
console.log(btnAdd)
btnAdd.addEventListener('click',addStudent)


// showedit
async function showEdit(id){
    let res = await fetch('http://localhost:8080/api.example.com/students/'+id);
    let data = await res.json();
    // chen vao the body
   document.getElementById('name').value=data.name;
   document.getElementById('age').value=data.age;
   document.getElementById('id').value= data.studentId;
   document.getElementById("add").innerText= "Save";
}

