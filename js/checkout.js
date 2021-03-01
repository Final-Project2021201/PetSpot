'use strict';

let reviewArr = new Review([]);

let loadedPetCart;
let tableBody = document.getElementsByTagName('tbody')[0];
let personalInfo = document.getElementById('personalInfo');
personalInfo.addEventListener('submit', handlePersonalInfoSubmit);
tableBody.addEventListener('click', removeItemFromCart);

function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function loadCart() {
  const cartPets = JSON.parse(localStorage.getItem('petCart')) || [];
  loadedPetCart = new PetCart(cartPets);
}

loadCart();

function showCart() {
  for (let i in loadedPetCart.adoptedPets) {
    let tableRow = document.createElement('tr');
    tableBody.appendChild(tableRow);
    let linkDelete = document.createElement('td');
    tableRow.appendChild(linkDelete);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    linkDelete.appendChild(deleteButton);
    let breed = document.createElement('td');
    tableRow.appendChild(breed);
    breed.textContent = loadedPetCart.adoptedPets[i].breed;
    let age = document.createElement('td');
    tableRow.appendChild(age);
    age.textContent = loadedPetCart.adoptedPets[i].age;
    let price = document.createElement('td');
    tableRow.appendChild(price);
    price.textContent = loadedPetCart.adoptedPets[i].price;
    let pictureData = document.createElement('td');
    tableRow.appendChild(pictureData);
    let picture = document.createElement('img');
    pictureData.appendChild(picture);
    for (let j in petArr) {
      if (petArr[j].source == loadedPetCart.adoptedPets[i].source) {
        picture.src = petArr[j].source;
      }
    }
  }

}

function clearCart() {
  tableBody.innerHTML = '';
}

function removeItemFromCart(event) {
  let itemIndex = event.path[2].rowIndex - 1;
  let deletedRow = tableBody.childNodes[itemIndex];
  tableBody.removeChild(deletedRow);
  let newArr = loadedPetCart.removePet(itemIndex);
  localStorage.setItem('petCart', JSON.stringify(newArr));
}

renderCart();

const loadedReviewsArr = JSON.parse(localStorage.getItem('reviews')) || [];
let loadedReviews = new Review(loadedReviewsArr);

function handlePersonalInfoSubmit(event) {
  event.preventDefault();
  let newReview = new NewReview(event.target.fullName.value, event.target.review.value);
  loadedReviews.addReview(newReview);
  loadedReviews.saveReviewToStorage();
  personalInfo.reset();
}

