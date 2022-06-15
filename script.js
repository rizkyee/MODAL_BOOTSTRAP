//menggambil form
const formInput = document.getElementById("form-input");
//const modal = document.getElementById("exampleModal")
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
//menggambil tabel
const mytable = document.querySelector(".table");

let traLama = "";
let emailBaru, userBaru, passwordBaru;

const tambahData = (e) => {
  e.preventDefault();
  //mendapatkan form
  const email = document.getElementById("exampleInputEmail1");
  const user = document.getElementById("username");
  const password = document.getElementById("exampleInputPassword1");
  const index = email.dataset.idx;


  if (!formInput.checkValidity()) {
    e.stopPropagation();
  } else {
    console.log(index);
    if (index == "new") {
      //membuat row tabel
      const baris_baru = document.createElement("tr");
      baris_baru.innerHTML = `
                        <td>${email.value}</td>
                        <td>${user.value}</td>
                        <td>${password.value}</td>
                        <td>
                          <button type="button" class="btn btn-info" id="edit"
                          onclick="editData(this)">Edit</button>
                          <button type="button" class="btn btn-danger" id="delete"
                          onclick="hapusData(this)">Hapus</button>
                        </td>
                        `;
      document.querySelector("tbody").appendChild(baris_baru);


      //menutup modal
      modal.hide();

      //mengkosongkan form
      email.value = "";
      user.value = "";
      password.value = "";
      email.dataset.idx = "new";

    } else {
      traLama.innerHTML = `
      <td>${email.value}</td>
          <td>${user.value}</td>
          <td>${password.value}</td>
      <td>
      <button type="button" class="btn btn-info" id="edit" onclick="editData(this)">Edit</button>
      <button type="button" class="btn btn-danger" id="delete"
      onclick="hapusData(this)">Hapus</button>
      </td>
          `;

      //menutup modal
      modal.hide();

      //mengkosongkan form
      email.value = "";
      user.value = "";
      password.value = "";
      email.dataset.idx = "new";
    }
  }
}

const isiForm = (email, user, password) => {
  // console.info('isiForm', email, user, password);
  //menggisi form pada modal 
  document.getElementById("exampleInputEmail1").value = email;
  document.getElementById("username").value = user;
  document.getElementById("exampleInputPassword1").value = password;
  document.getElementById("exampleInputEmail1").dataset.idx = 0;

  //menampilkan modal
  modal.show();

}


const getIsiTd = (el) => {
  // alert("getId")
  let isiTd = [];
  const barisData = el.parentElement.parentElement;
  const getTd = Array.from(barisData.querySelectorAll('td'));
  // console.log(barisData,getTd)
  
  getTd.forEach(function (el, index) {
    //  console.log(el.textContent,index)
    isiTd[index] = el.textContent;
  });
  console.table(isiTd)

  isiForm(isiTd[0], isiTd[1], isiTd[2]);

  traLama = barisData;
}

const editData = (el) => {
  // alert("editData")
  getIsiTd(el);
}

const hapusData = (el) => {
  const barisData = el.parentElement.parentElement;
  const conf = confirm("Anda yakin akan menghapus data ini?");
  if (conf) {
    barisData.remove();
  }
}

formInput.addEventListener('submit', tambahData);


