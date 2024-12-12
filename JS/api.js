
const loadPhones=async (searchText=13,isShowAll)=>{
  const response =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const phones=await response.json();
  displayPhones(phones.data,isShowAll)

  
}

const singleLoadPhone=async(id)=>{
  const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data=await res.json();
  displaySinglePhones(data.data)
}

const displayPhones=(phones,isShowAll)=>{
  
const phonesWrapper=document.getElementById('phonesWrapper');
const showAllButton=document.getElementById('showAllButtonContainer')
    if(phones.length >12 && !isShowAll){
      showAllButton.classList.remove('hidden')
    
    }
    else{
      showAllButton.classList.add('hidden')
    }
   phonesWrapper.textContent=" ";
   if(!isShowAll){
    phones=phones.slice(0,9)
   }
   phones.forEach((phone)=>{
    const phoneCard=document.createElement('div');
    phoneCard.classList.add('card,bg-base-100,w-96,shadow-xl')
    phoneCard.innerHTML=`
            <div class="card bg-base-100 shadow-xl">
              <figure class="px-10 pt-10">
                <img
                  src=${phone.image}
                  alt="Shoes"
                  class="rounded-xl" />
              </figure>
          <div class="card-body items-center text-center">
              <span>Brand:${phone.brand}</span>
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button onclick="singlePhoneDetiels('${phone?.slug}')" class="btn btn-primary">Details Phone</button>
            </div>
          </div>
        </div>
    `
   
    phonesWrapper.appendChild(phoneCard)
   
  })
  loading(false)
}

const displaySinglePhones=(phone)=>{
  my_modal_5.showModal()
  const ul=document.getElementById('ul');
  const phone__image=document.getElementById('phone__image');
  const phone__brand=document.getElementById('phone__brand');
  const phone__model=document.getElementById('phone__model');
  const phone__chipSet=document.getElementById('phone__chipSet');
  const displaySize=document.getElementById('displaySize');
  const memory=document.getElementById('memory');
  const storage=document.getElementById('storage');

  phone__image.innerHTML=` <img class="mx-auto"  src="${phone?.image}" alt="">`;
  phone__brand.innerText=`Brand Name: ${phone?.brand}`;
  phone__model.innerText=`Model Name: ${phone?.name}`;
  phone__chipSet.innerText=`ChipSet: ${phone?.mainFeatures?.chipSet}`;
  displaySize.innerText=`Display Size: ${phone?.mainFeatures?.displaySize}`;
  memory.innerText=`Memory: ${phone?.mainFeatures?.memory}`;
  storage.innerText=`Memory: ${phone?.mainFeatures?.storage}`;
  console.log(phone?.mainFeatures?.sensors.forEach(data=>{
    const li=document.createElement('li')
    li.innerText=data;
    ul.appendChild(li)
  }
  ));
  
  }



 const singlePhoneDetiels=(id)=>{
  singleLoadPhone(id)
  console.log(id);
  
 }

const searchHandle=(isShowAll)=>{
  const searchField=document.getElementById('searchField');
  const searchText=searchField.value;
  loading(true)
  loadPhones(searchText,isShowAll)
  // searchField.value=""
}


const handleShowAll=()=>{
  searchHandle(true)
console.log("show all button is click");

}

const loading=(isLoading)=>{
  const loading=document.getElementById('loading');
  if(isLoading){
    loading.classList.remove('hidden')
  }
  else{
    loading.classList.add('hidden')
  }
}

loadPhones()