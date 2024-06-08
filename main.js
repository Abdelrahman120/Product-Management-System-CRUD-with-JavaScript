let title =document.getElementById('title');
let price = document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let searchMoodd="title";
let mood="create";
let data;//var to store the array of data in it
let temp;//fake variable to Assign the index in update function

if(localStorage.product !=null){
    data=JSON.parse(localStorage.product)//if their is data let it in the array and return it before it be string
}else{
    data=[];// else let the array empty
}

function getTotal(){
    if(price.value !=""){
        let result=(+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor="green";
    }else{
        total.innerHTML="";
        total.style.backgroundColor="red";
    }
}

submit.onclick=function(){
    let dataObj={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value !="" && price.value !="" && category.value !="" && dataObj.count <100){
        if(mood==="create"){
            if(dataObj.count>1){
                for(let i=0;i<dataObj.count;i++){
                    data.push(dataObj);
                }
            }else{
                data.push(dataObj);
            }
        }else{
            data[temp]=dataObj;
            mood="create";
            submit.innerHTML="Create";
            count.style.display="block";
        }
        clear();//to not clear the data exept create or update data
    }
    localStorage.setItem('product',JSON.stringify(data));/*to store product in localStorage after convert to 
    string because teh local stotage acsept string only */
    showData();
}

function clear(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}

function showData(){
    getTotal();
    let table="";
    for(let i=0;i<data.length;i++){
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="Delete(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll');
    if(data.length >0){
        btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All (${data.length})</button>`
    }else{
        btnDelete.innerHTML="";
    }
}
showData();

function Delete(i){
    data.splice(i,1);/*the first the index of the element , 
    the second the number of elements that you want to delete used in array to delete the object in this index*/
    localStorage.product=JSON.stringify(data);
    showData();
}

function deleteAll(){
    localStorage.clear();//delete all in localStorage
    data.splice(0);//delete all in array
    showData();
}

function update(i){
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
    getTotal();
    category.value=data[i].category
    count.style.display="none";
    submit.innerHTML="update";
    mood="update";
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

function searchMood(id){
    let search=document.getElementById("search");
    if(id==="searchTitle"){
        searchMoodd="title";
    }else{
        searchMoodd="category";
    }
    search.placeholder="search by "+searchMoodd;
    search.focus()
    search.value="";
    showData();
}

function search(value){
    let table="";
    for(let i=0;i<data.length;i++){
        if(searchMoodd=="title"){
                if(data[i].title.includes(value.toLowerCase())){
                    table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button onclick="update(${i})" id="update">update</button></td>
                            <td><button onclick="Delete(${i})" id="delete">delete</button></td>
                        </tr>
                        `
                }
        }else{
                if(data[i].category.includes(value.toLowerCase())){
                    table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${data[i].title}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].taxes}</td>
                            <td>${data[i].ads}</td>
                            <td>${data[i].discount}</td>
                            <td>${data[i].total}</td>
                            <td>${data[i].category}</td>
                            <td><button onclick="update(${i})" id="update">update</button></td>
                            <td><button onclick="Delete(${i})" id="delete">delete</button></td>
                        </tr>
                        `
                }
        }
}
    document.getElementById('tbody').innerHTML=table;
}