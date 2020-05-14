const addButton=document.getElementById('add-button');
const overdueSection=document.querySelector(".overdue-card");
const todaySection=document.querySelector(".todays-card");
const tommSection=document.querySelector("#tommorrows-card");
const laterSection=document.querySelector("#later-card");


const overdueList = [];
const todayList = [];
const tommList = [];
const laterList = [];

function removeBtnHandler(){
     const parentList = this.closest('li');
    parentList.remove();
}

const renderlist= (section , list)=>{
    if (list.length===0){
        section.classList.remove('visible');
    return;
    }
    else
    section.classList.add('visible');
    
    // query for the section ul
  const container=section.querySelector('ul');
        // creating new li item
    const newNode = document.createElement('li');
  
    newNode.setAttribute('type', 'none');  // for removing the list icons 
    newNode.innerHTML=` <input class="checkbox" type="checkbox">
    <span id ="task-text"> ${list[list.length-1].task}  </span> 
    <time >${list[list.length-1].time}</time>
    <button id ="remove-btn" class="btn" > Remove</button>
    <hr>
   `;
    

  container.append(newNode);
   const removeBtn = newNode.querySelector('button');
   removeBtn.addEventListener('click', removeBtnHandler);

};




const addButtonHandler = function(){
const taskValue= document.getElementById('task').value;
const dateValue= document.getElementById('date').value;
const timeValue= document.getElementById('time').value;

if (taskValue==='' || dateValue==='' || timeValue===''){
   return;
}

const listObject={
    task: taskValue,
    date: dateValue,
    time:timeValue,
};

const day= new Date();
const dd=day.getDate();

// calculation for deciding the category
let dateStr=dateValue.toString(10).substr(8,2);
const d1=parseInt(dateStr);
if (d1 - dd ===0){
    todayList.push(listObject);
    renderlist(todaySection,todayList);
    
}
else if (d1 - dd ===1){
    tommList.push(listObject);
    renderlist( tommSection,tommList);

}
else if (d1 - dd <0){
    overdueList.push(listObject);
    renderlist( overdueSection,overdueList);
}
else{
    laterList.push(listObject);
    renderlist(laterSection, laterList);

}







};


addButton.addEventListener("click", addButtonHandler);