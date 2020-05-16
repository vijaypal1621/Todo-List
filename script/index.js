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
function checkboxHandler(){
    const parentList = this.closest('li');
    const removeBtn = parentList.querySelector('button');
    const text= parentList.querySelector('span');
    if (this.checked){
        
        text.style.textDecoration="line-through";
         removeBtn.classList.add('visible');
         console.log(removeBtn);
         removeBtn.addEventListener('click', removeBtnHandler);
    }
    else{
        removeBtn.classList.remove('visible');
        text.style.textDecoration="none";

    }
}

const renderlist= (section , list, day)=>{
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
    
    if (day !==0)
    {
        const newday= document.createElement('date');
        const timeEl=newNode.querySelector('.checkbox');
        newday.textContent= `${list[list.length-1].date}`;
        timeEl.before(newday);
        newday.classList.add('date-section');
    }
    container.append(newNode);
    const checkbox= newNode.querySelector('.checkbox');

//    const removeBtn = newNode.querySelector('button');
//    removeBtn.addEventListener('click', removeBtnHandler);
   checkbox.addEventListener('click', checkboxHandler);
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
    renderlist(todaySection,todayList,0);
    
}
else if (d1 - dd ===1){
    tommList.push(listObject);
    renderlist( tommSection,tommList,0);

}
else if (d1 - dd <0){
    overdueList.push(listObject);
    renderlist( overdueSection,overdueList,1);
}
else{
    laterList.push(listObject);
    renderlist(laterSection, laterList,1);

}







};


addButton.addEventListener("click", addButtonHandler);