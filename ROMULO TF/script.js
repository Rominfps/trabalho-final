// Seleção de elementos
const modal = document.getElementById("addDogModal");
const addDogBtn = document.getElementById("addDogBtn");
const dogForm = document.getElementById("dogForm");
const dogList = document.getElementById("dogList");
let editIndex = null;

// Abrir o modal para adicionar cachorro
addDogBtn.onclick = function() {
    openModal();
}

// Abrir o modal para adicionar ou editar cachorro
function openModal(editData = null, index = null) {
    modal.style.display = "block";
    if (editData) {
        document.getElementById("dogName").value = editData.name;
        document.getElementById("ownerName").value = editData.owner;
        document.getElementById("phone").value = editData.phone;
        document.getElementById("email").value = editData.email;
        document.getElementById("imageUrl").value = editData.imageUrl;
        document.getElementById("modalTitle").innerText = "Editar Cachorro";
        editIndex = index;
    } else {
        dogForm.reset();
        document.getElementById("modalTitle").innerText = "Adicionar Cachorro";
        editIndex = null;
    }
}

// Fechar o modal
function closeModal() {
    modal.style.display = "none";
    dogForm.reset();
}

// Evento de submissão do formulário
dogForm.onsubmit = function(e) {
    e.preventDefault();
    const newDog = {
        imageUrl: document.getElementById("imageUrl").value,
        name: document.getElementById("dogName").value,
        owner: document.getElementById("ownerName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
    };
    
    if (editIndex !== null) {
        updateDog(editIndex, newDog);
    } else {
        addDog(newDog);
    }
    closeModal();
}

// Adicionar novo cachorro na lista
function addDog(dog) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${dog.imageUrl}" alt="Imagem do cachorro"></td>
        <td>${dog.name}</td>
        <td>${dog.owner}</td>
        <td>${dog.phone}</td>
        <td>${dog.email}</td>
        <td>
            <button class="edit" onclick="editDog(${dogList.children.length})">Editar</button>
            <button class="delete" onclick="deleteDog(${dogList.children.length})">Excluir</button>
        </td>
    `;
    dogList.appendChild(row);
}

// Atualizar cachorro existente
function updateDog(index, dog) {
    const row = dogList.children[index];
    row.innerHTML = `
        <td><img src="${dog.imageUrl}" alt="Imagem do cachorro"></td>
        <td>${dog.name}</td>
        <td>${dog.owner}</td>
        <td>${dog.phone}</td>
        <td>${dog.email}</td>
        <td>
            <button class="edit" onclick="editDog(${index})">Editar</button>
            <button class="delete" onclick="deleteDog(${index})">Excluir</button>
        </td>
    `;
}

// Editar cachorro existente
function editDog(index) {
    const row = dogList.children[index];
    const dogData = {
        imageUrl: row.cells[0].children[0].src,
        name: row.cells[1].innerText,
        owner: row.cells[2].innerText,
        phone: row.cells[3].innerText,
        email: row.cells[4].innerText
    };
    openModal(dogData, index);
}

// Excluir cachorro
function deleteDog(index) {
    dogList.removeChild(dogList.children[index]);
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}
