var input=document.getElementById("mysearch")
var fname=document.getElementById("fname")
var lname=document.getElementById("lname")
var tel=document.getElementById("tel")
var email=document.getElementById("email")
var company=document.getElementById("company")
var contact=document.getElementById("contact")
var firstmodal=document.querySelector(".firstmodal")
var fmodalcontent=document.querySelector(".fmodalcontent")
var addcon=document.getElementById("addcon")
var secondmodaladd=document.querySelector(".secondmodaladd")
var secondmodaladdcontent=document.querySelector(".secondmodaladdcontent")
var userform=document.getElementById("userform")
var showsearch=document.getElementById("showsearch")
var warn=document.getElementById("warn")
var saveto=document.getElementById("saveto")
var a="previous"
var b="successor"
var close=document.getElementById("close")
var formval=document.getElementById('formval')
var showname=document.getElementById("showname")
var displaycon=document.getElementById("displaycon")
var forview=document.getElementById("forview")
var front=document.querySelector(".front")

contact.addEventListener("click",clicked)
function clicked(){
firstmodal.style.display="block"
front.style.display="none"

}

addcon.addEventListener("click",tapped)
function tapped(){
userform.style.display="grid"


}

close.addEventListener("click",shutoff)
function shutoff(){
userform.style.display="none"

}



userform.addEventListener("submit",sent)
function sent(e){
e.preventDefault()
acceptData()

}
var details=[]

function acceptData(){
details.push({
fname:fname.value,
lname:lname.value,
tel:tel.value,
email:email.value,
company:company.value
})

localStorage.setItem("details",JSON.stringify(details))
displayNames()
compare(a,b)
}
function compare(a,b){
if(a.fname>b.fname)return 1
if(a.fname<b.fname)return -1
return 0
displayNames()
}
function displayNames(){
displaycon.innerHTML=""
details.sort(compare)
details.map(function(x,key){
    var mapped=`<div id=${key}>
        <div id="showname">${x.fname} ${x.lname}<hr>
  <div id="payname">          
<p id="restdetailsa">${x.fname}</p> 
<p id="restdetailsb">${x.lname}</p>        
<p id="restdetailsc">${x.tel}</p>         
<p id="restdetailsd">${x.email}</p>         
<p id="restdetailse">${x.company}</p> 
<button id="deleteform" onclick="deleteNames(this);displayNames()">&#128465</button>
<button id="editform" onclick="editNames(this)">&#x270E</button> 
</div>
</div>   
</div>`
displaycon.innerHTML+=mapped
forview.innerHTML=  "You have"  +" " + details.length +" "+ " contacts"
})
resetform()

}






function deleteNames(e){
e.parentElement.parentElement.parentElement.remove()
details.splice(e.parentElement.parentElement.parentElement.id,1)
//refreshes local storage after each delete
localStorage.setItem("details",JSON.stringify(details))
}

function editNames(e){

userform.style.display="grid"
displaycon.innerHTML=""

var payname=e.parentElement

fname.value=payname.children[0].innerHTML

lname.value= payname.children[1].innerHTML
tel.value=payname.children[2].innerHTML
email.value= payname.children[3].innerHTML

company.value=payname.children[4].innerHTML

deleteNames(e)

}


function resetform(){
fname.value=""
lname.value=""
tel.value=""
email.value=""
company.value=""
}




(function(){
details=JSON.parse(localStorage.getItem("details"))
displayNames()

})()

/*search operation*/
mysearch.addEventListener('keyup',keyed)
input.value=""
function keyed(){

var checked=details.filter(callback)
function callback(element){
return element.fname.toUpperCase()==input.value.toUpperCase()||element.lname.toUpperCase()==input.value.toUpperCase()||element.number==input.value
}

var render=checked.map(function(element,key){
return `${element.fname}<br/>${element.lname}<br/>${element.tel}<br/>${element.email}<br/>${element.company}<br/>  <hr>` 
})

showsearch.innerHTML=JSON.parse(JSON.stringify(render)) 

}