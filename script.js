let container = document.getElementById("container");
let btn = document.getElementById("btn");

function getData(){
    fetch("https://trusted-exciting-property.glitch.me/products")
    .then(res => res.json())
    .then(data => displayData(data))
}

function displayData(products){
    container.innerHTML = ``;
    products.forEach(obj => {
        let item = document.createElement('div');
        item.innerHTML=`
        <p> ${obj.title} </p>
        <p> ${obj.price} </p>
        <p> ${obj.category} </p>
        <button onclick = deleteData('${obj.id}')> Delete </button>
        `;
        container.appendChild(item)
    });
    
}

btn.addEventListener("click" , function (){
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let category = document.getElementById("category");
    if(title.value == "" || price.value == "" || category.value == ""){
        alert("Enter full data");
    }
    else{
        fetch("https://trusted-exciting-property.glitch.me/products",{
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json"
            },
            "body" : JSON.stringify({
                "title" : title.value,
                "price" : price.value,
                "category" : category.value,
            }),
        })
        .then(res =>{
            if(res.ok){
                getData();
                alert("Data Added successfully");
                title.value = "";
                price.value = "";
                category.value = "";
            }
        })
    }
})

function deleteData(id){
    fetch(`https://trusted-exciting-property.glitch.me/products/${id}`, {
        "method" : "DELETE"
    })
    .then(res => {
        if(res.ok){
            getData();
            alert("Data Deleted");
        }
    })
    .catch(err => console.error(err))
}


getData();