let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("Total");
let pricing = document.querySelectorAll(".pricing");
let title = document.getElementById("title");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let body = document.getElementById("body");
let delAllBtn = document.getElementById("DeleteAll");
let updateBtn = document.getElementById("update");
let search = document.getElementById("search");
let products;
let temp;
let searchMood = "Title";
let form = "Create";
submit.innerHTML = form;
if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  products = [];
}
for (let element of pricing) {
  element.addEventListener("keyup", getTotal);
}
submit.addEventListener("click", function () {
  let item = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: +price.value + +taxes.value + +ads.value - +discount.value,
    count: count.value,
    category: category.value,
  };
  if (form === "Create") {
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        products.push(item);
      }
    } else {
      products.push(item);
    }
  } else {
    submit.innerHTML = "Create";
    count.classList.remove("d-none");
    products[temp] = item;
  }
  localStorage.setItem("products", JSON.stringify(products));
  clearData();
  showProducts();
});
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `Total : ${result}`;
    total.classList.replace("bg-danger", "bg-success");
  } else {
    total.classList.replace("bg-success", "bg-danger");
    total.innerHTML = "Total : ";
  }
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = `Total : `;
  total.classList.replace("bg-success", "bg-danger");
}
function showProducts() {
  let box = ``;
  for (let index = 0; index < products.length; index++) {
    box += `
        <tr>
                        <td class="bg-transparent text-white">
                            ${index + 1}
                        </td>
                        <td class="bg-transparent text-white">
                            ${products[index].title}
                        </td>
                        <td class="bg-transparent text-white">
                           ${products[index].price}
                        </td>
                        <td class="bg-transparent text-white">
                            ${products[index].taxes}
                        </td>
                        <td class="bg-transparent text-white">
                            ${products[index].ads}
                        </td>
                        <td class="bg-transparent text-white">
                            ${products[index].discount}
                        </td>
                        <td class="bg-transparent text-white">
                            ${products[index].total}
                        </td>
                        <td class="bg-transparent text-white">
                            ${products[index].category}
                        </td>
                        <td class="bg-transparent text-white">
                            <button onclick="updateData(${index})" class="btn bg-warning"><i class="fa-regular fa-pen-to-square"></i></button>
                        </td>
                        <td class="bg-transparent text-white">
                            <button id="delete" onclick="deleteProduct(${index})" class="btn bg-danger"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
        `;
  }
  body.innerHTML = box;
  if (localStorage.getItem("products") != null) {
    delAllBtn.innerHTML = `<button class="btn w-50 mx-auto" onclick="deleteAllProducts()">Delete All (${products.length})</button>`;
  } else {
    delAllBtn.innerHTML = "";
  }
}
showProducts();

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showProducts();
}
function deleteAllProducts() {
  products = [];
  localStorage.clear();
  showProducts();
}
function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  category.value = products[i].category;
  getTotal();
  temp = i;
  console.log(temp);
  count.classList.add("d-none");
  form = "Update";
  submit.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
function searchBy(id) {
  if (id == "category") {
    search.placeholder = "Search By Category";
    searchMood = "Category";
    search.removeAttribute('disabled')
  } else {
    search.placeholder = "Search By Title";
    searchMood = "Title";
    search.removeAttribute('disabled')
  }
  search.focus()
}

function productsSearch(value) {
  let box = ``;
  if (searchMood == "Title") {
    for (let index = 0; index < products.length; index++) {
      if (products[index].title.toLowerCase().includes(value.toLowerCase())) {
        box += `
      <tr>
                      <td class="bg-transparent text-white">
                          ${index + 1}
                      </td>
                      <td class="bg-transparent text-white">
                          ${products[index].title}
                      </td>
                      <td class="bg-transparent text-white">
                         ${products[index].price}
                      </td>
                      <td class="bg-transparent text-white">
                          ${products[index].taxes}
                      </td>
                      <td class="bg-transparent text-white">
                          ${products[index].ads}
                      </td>
                      <td class="bg-transparent text-white">
                          ${products[index].discount}
                      </td>
                      <td class="bg-transparent text-white">
                          ${products[index].total}
                      </td>
                      <td class="bg-transparent text-white">
                          ${products[index].category}
                      </td>
                      <td class="bg-transparent text-white">
                          <button onclick="updateData(${index})" class="btn bg-warning"><i class="fa-regular fa-pen-to-square"></i></button>
                      </td>
                      <td class="bg-transparent text-white">
                          <button id="delete" onclick="deleteProduct(${index})" class="btn bg-danger"><i class="fa-solid fa-trash-can"></i></button>
                      </td>
                  </tr>
      `;
      }
    }
  } else {
    for (let index = 0; index < products.length; index++) {
      if (
        products[index].category.toLowerCase().includes(value.toLowerCase())
      ) {
        box += `
       <tr>
                       <td class="bg-transparent text-white">
                           ${index + 1}
                       </td>
                       <td class="bg-transparent text-white">
                           ${products[index].title}
                       </td>
                       <td class="bg-transparent text-white">
                          ${products[index].price}
                       </td>
                       <td class="bg-transparent text-white">
                           ${products[index].taxes}
                       </td>
                       <td class="bg-transparent text-white">
                           ${products[index].ads}
                       </td>
                       <td class="bg-transparent text-white">
                           ${products[index].discount}
                       </td>
                       <td class="bg-transparent text-white">
                           ${products[index].total}
                       </td>
                       <td class="bg-transparent text-white">
                           ${products[index].category}
                       </td>
                       <td class="bg-transparent text-white">
                           <button onclick="updateData(${index})" class="btn bg-warning"><i class="fa-regular fa-pen-to-square"></i></button>
                       </td>
                       <td class="bg-transparent text-white">
                           <button id="delete" onclick="deleteProduct(${index})" class="btn bg-danger"><i class="fa-solid fa-trash-can"></i></button>
                       </td>
                   </tr>
       `;
      }
    }
  }
  body.innerHTML = box;
}
search.addEventListener("keyup", function () {
  productsSearch(this.value);
});
