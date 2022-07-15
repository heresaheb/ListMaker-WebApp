
var doneList = false;
const genereList =[];
const itemList=[];
let indForGenere = genereList.length;
let indForItem = itemList.length;

//for 1st Page
const index1 = 
`
 <header>
 <div>
    <h1>
        What are you going to shopping for?
    </h1>
</div>
</header>

<div id="form">
<div>
<h3  style="margin-bottom: 0px;"> Genere Of Your List
    <!-- <br> <br> -->
    <h5 id="msgGenere" class="warning">&nbsp;</h5>
</h3>
<input id="genere" type="text" placeholder=" Your ListName/ShopName"  onblur="checkInput()"  onclick="invisble()" >
<button onclick="changeGenere()">New</button>


<h3 style="margin-bottom: 0px;"> Item Name Of Your List <br>

</h3>
<h3 id="msgItems" class="warning"> &nbsp;
</h3>
<input  id="items" type="text" placeholder="Enter a name of item here" onblur="checkInput()" onclick="invisble()">
</div>
<br>
<button onclick="getVal()">Submit</button>
<button onclick="done()">Done</button>





</div>

<div id="confirm"></div> 

<h1 id="intro"> Greetings!! Welcome to ListMaker :)</h1>`;

// <h3 style="color: white ;">Genereic Score: ${indForGenere}</h3>
// <h3 style="color: white ;">Items Score: ${indForItem}</h3>
// console.log(indForGenere);

 //for 2nd Page
const index2 = `
<body><div id="askForNew"> &nbsp;
<button style="float: left;" onclick="prevPage()"> < Create new list</button>
</div>

<div>
<header>
    <h1 id="head1"> -:You are going to buy:-</h1>
    <h3 id="note1">Note:  Double Tap on list Name to edit list Names </h3>
</header>
</div>
<div id="list">
<div class="section">
<h1>hrl</h1>
<ul>contents List</ul>
</div>

<div class="section">
<h1>hrl</h1>
    <ul>
    </ul>
    <ul>contents List</ul>  
     
</div>     

<div class="section">
    <h1>hrl</h1>
    
</div>

<div class="section">
    <h1>hrl</h1>
</div>


</div>
<div  id="doneItems">
<h2>
    Untill now you have done buying:
</h2>

<hr>

<h1>
    Nothing! >:
</h1>
</div>`;

//intro for site
document.querySelector("#index").innerHTML=index1;
// const x =document.querySelector("#index");
// x.style.disply = "none";

//current page
setTimeout(()=> {document.querySelector("#intro").innerHTML="";},3000 )

const genere = document.querySelector("#genere");

const items = document.querySelector("#items");

//ChangePage from here
function nextPage(){
    document.querySelector("#index").innerHTML=index2;
    document.body.style.backgroundImage=`url("899840.png")`;// to chnge backgound in the 2nd page.
    printValue();
}

//Starting value with in storing var
let makeList =`<div class="section">`;
let count=0;
function printValue(){
   
    
    for (const ind in genereList){
        if(genereList[ind] === true)  //if the index of the array pointing value is true then skip other line until it become false(condition)
        {   makeList +=`<div class="section">`;
             continue;
            }
    
    //Adding here: Every list heading..         // for change cases only heading     
    makeList += `<h1 id="${"g"+ind}" style="text-align: center;"> ${genereList[ind].toUpperCase(genereList[ind])} </h1> <hr>`;
   
    //Print the list each values here..
while(count !== itemList.length){
    if (itemList[count] !== true) {
        makeList +=`<p id="parent${count}" >
        <input type="checkbox" onclick="fun(${count})">
        <span id= "${`val`+count}" ondblclick="sideOptions(${count})" >${itemList[count]} 
        </span>
        </p>`;
    // console.log(makeList);
    }
            else break;

            count++;
        }
        //after skip the upper while loop  //if the index of the array pointing value is true then skip other line until it become false(condition) // array have indexes.
        while(count !== itemList.length && itemList[count] === true)
        {count++;}
        //Close tag for the every list.
        makeList += `</div>`;

}
        document.querySelector("#list").innerHTML= makeList;
        //    console.log(makeList);

        //To show a colorful head note on the final list
        document.querySelector("#note1").style.color="yellow";
        setTimeout(()=>document.querySelector("#note1").style.color="red", 3000);
            setTimeout(()=>document.querySelector("#note1").innerHTML="", 5000);

                 
            
}

let optionInvoke = true;
let prevCount = count;
function sideOptions(count){ //each list values

    if(count !== prevCount){ //to make sideOptionsVisible invisible.
        optionInvoke =true;
        prevCount = count;
    }

    if(optionInvoke){
    
    document.querySelector(`#parent${count}`).innerHTML +=
    `
    <span class="image" id="child${count}" >

    <button onclick="update(${count})" id="update"> <img src="icons8-pen-66.png" alt="pen"> </button>

    <button onclick="del(${count})" id="delete"> <img src="icons8-trash.gif" alt="trash">  </button>
    </span>`;

    // console.log(makeList);
    optionInvoke =false;
    
    }

    else{
        document.querySelector(`#child${count}`).innerHTML="";
    }
}

    
 {

        function update(count) { //get the update input from user
            const options = document.querySelector(`${`#child`+count}`).innerHTML;
            
            document.querySelector(`${`#child`+count}`).innerHTML="";

            const preVal = itemList[count];

            const targetEle = document.getElementById(`${`val`+count}`);
            // document.querySelector(`#${count}`).innerHTML="";

            targetEle.innerHTML= `<input type="text" id="${"input"+count}"><button onclick="changeVal(${count})">update</button>`;

            document.querySelector(`${"#input"+count}`).value=preVal;

            return options;
        }

        function changeVal(count){ //enter value will be replaced by old
            
            const preVal = itemList[count];

            const targetEle = document.getElementById(`${`val`+count}`);

        if(targetEle.value ==="")
            {
                targetEle.innerHTML = preVal;
            }

        else
            {
                targetEle.innerHTML = document.querySelector(`${"#input"+count}`).value;
            }

            document.querySelector(`${`#child`+count}`).innerHTML=`<button onclick="update(${count})"> <img src="icons8-pen-66.png" alt="pen"> </button>

            <button onclick="del(${count})"> <img src="icons8-trash.gif" alt="trash"></button>`;//options;
        }

        function del(count) { //delete the target value
            
            document.querySelector(`${`#parent`+count}`).innerHTML="Deleted!";
            document.querySelector(`${`#parent`+count}`).style.color ="red";
            setTimeout(() => {document.querySelector(`${`#parent`+count}`).innerHTML=""}, 2000);
            // document.getElementById(`child${count}`).innerHTML="";
            // if(countItems> 0){countItems--}
        }
}

let firstClick = true;
let value ="";
let doneCount=0;
function fun(idForItem, forP_Id="parent"+idForItem){

    if(firstClick){
        document.getElementById("doneItems").innerHTML= `<h2>Untill now you have done buying:</h2> <hr>`;
        firstClick= false;
    }

    if(document.getElementById(`${`val`+idForItem}`).innerHTML !== ""){
    value = document.getElementById(`${`val`+idForItem}`).innerHTML;
    }

        setTimeout(()=>{
            document.getElementById( forP_Id).innerHTML="ok done!"; 
            document.getElementById( forP_Id).style.color ="red";
            document.getElementById("doneItems").innerHTML+=`<span class="fontSpecial">${doneCount+`.`+ value} </span> `;},1000);  doneCount++;//for counting list only

            document.getElementById("doneItems").style.color="yellow";

        setTimeout(()=>{
        document.getElementById( forP_Id).innerHTML="&nbsp;";
        document.getElementById("doneItems").style.color="red"},5000);

    // else{ //to reverse the process back
    //     document.getElementById(`${idForItem}`).innerHTML=`${value}`;

    //     document.getElementById("doneItems").innerHTML="";
    //     oddClick = true;
    // }
    // console.log(idForItem);
}




//back to page1
function prevPage(){
    document.querySelector("#askForNew").innerHTML=`<h3>*Are You Want To Delete Your old Data? <button onclick="ifAnsYes()">Yes</button> <button onclick="ifAnsNo()">No</button> </h3>`;
}

function userMsg(){
    document.querySelector("#askForNew").innerHTML=`&nbsp;   
    <button style="float: left;" onclick="prevPage()">  < Create new list</button>`;
    
}
function ifAnsNo(){
    setTimeout(userMsg ,3000); // use time after show

    document.querySelector("#askForNew").innerHTML="<h3>Keep Shopping With This List :) <h3>";
    // return;
}

function ifAnsYes(){
    location.reload();
}

    // if input have values
    function checkInput(){
        
        if(genere.value != ""){
                
            document.querySelector("#msgGenere").innerHTML="&nbsp;";
            // return;
        
        }
        
        if(items.value != ""){
            document.querySelector("#msgItems").innerHTML="&nbsp;";
            // return;
        }
        else{
            ifBlank();
        }
    }

    //check and warning
    function ifBlank() {
        // console.log(genere === null);
        if(genere.value=== "" || items.value ==="")
        
        {
            if(genere.value=== "" && items.value ===""){

                document.querySelector("#msgGenere").innerHTML="Input Required!";

                document.querySelector("#msgItems").innerHTML="Input Required!";

                return;
            }
            else if(genere.value== ""){
                
                document.querySelector("#msgGenere").innerHTML="Input Required!";
                return;

            }

            else if(items.value== ""){
                document.querySelector("#msgItems").innerHTML="Input Required!";
                return;
            }
        }

        // else{
        //     done();
        // }
    }

    //invisible pop up window for confirmation
    function invisble() {
        document.querySelector("#confirm").innerHTML = "";    
    }

    //asking user to add more
    function done() {

        // console.log(genere.value==="");
        doneList = true;
        // console.log(genereList.length);
     if (genereList.length === 0 && itemList.length === 0) {
            document.querySelector("#emptyMsg").innerHTML= `*You haven't save anything in your list!!`;

            setTimeout(()=> {document.querySelector("#emptyMsg").innerHTML= "";}, 4000);
        }
       
        
     else
        {
        const askOneMore = 
    ` <h3>
            Are you want to add something extra for today's shopping?
            <br>
            <button onClick="addMore()"> Yes </button>
        <button onClick= "nextPage()">View Your Content</button>
        </h3> `
        // <a class="btn" href= "index2.html" onClick="printLists()">View Your Content</a>

        document.querySelector("#confirm").innerHTML = askOneMore;

        getVal();//print getting value
        //console.log(genereList);

        document.querySelector("#genere").value="";
        document.querySelector("#items").value= "";

        if(genere.value=== "" || items.value ===""){
            document.querySelector("#msgGenere").innerHTML="&nbsp;";
            document.querySelector("#msgItems").innerHTML="&nbsp;";
            return;
        }
    }

    }

    // clear the msg (addMore())
    function clearMsg1() {
        document.querySelector("#confirm").innerHTML = "";
    }

    //select the input box   (done())
    function addMore() {
        document.querySelector("#confirm").innerHTML = "Go ahead add something new :)";
        // document.querySelector("#confirm").style.fontSize="20px";
        setTimeout(
            clearMsg1, 2000
        )
    }

    //get the value from user input (when submit clicked)
    function getVal() {
    // get value from genere && items var

    let genereVal = genere.value;
    let itemsVal = items.value;
    let regPattern = /(\W|\N)/g; //checking SYMBOLES using REGEXP // No Space Inside the brackets
    // \W === Non-Word chars , \N=== Non-Number chars, g=== globaly 

    //test method return only boolean value
    if(genereVal==' ' || regPattern.test(genereVal)){  //warning for only space & Symboles
        document.querySelector("#msgGenere").innerHTML="Symbole Prohibit! :(";
        document.querySelector("#genere").value= "";
        return;
    }

    if(itemsVal==' ' || regPattern.test(itemsVal)){  //warning for only space & Symboles
        document.querySelector("#msgItems").innerHTML="Symbole Prohibit! :(";
        document.querySelector("#items").value= "";
        return;
    }

    if(genere.value=== "" || items.value ===""){
        ifBlank();
        return;
    }

    // const symbol = /^[#*@!^$()-_+=,<>.`:;"'{}[]\/]+$/;  //Reg-Ex
    // console.log()

    if(itemsVal=='  ' || itemsVal==' '){  //warning for extra space
        document.querySelector("#msgItems").innerHTML="Wrong Input :(";
        document.querySelector("#items").value= "";
        return;
    }

    
    if(genereAdd) 
    {
        genereList[indForGenere]= genereVal;
        // console.log(genereAdd+"calling....");
        indForGenere++;
        genereAdd = false;
    }

    //to ignore counting true value indexes from the list
    let ind= 0;
    let countItems=1; 
    while(ind !== itemList.length){
        if(itemList[ind] !== true){
            countItems++;
        }
      ind++;
    }
    //to ignore counting true value indexes from the list
     ind =0;
    let countGenere=0;
    while(ind !== genereList.length){
        if(genereList[ind] !== true){
            countGenere++;
        }
      ind++;
    }


    document.querySelector("#genereCount").innerHTML = `Genere ${countGenere} &`;

    //for counting total list we have in itemList
    document.querySelector("#itemsCount").innerHTML = `Items ${countItems}`;

    //add items to list
    itemList[ indForItem]= itemsVal;
    indForItem++;

    document.querySelector("#items").value= ""; //set input value null

       // console.log("items List: "+itemList);
        //console.log(itemList);    
    }

    let genereAdd =true;
    
    function changeGenere() {

        ifBlank();

        genereAdd = true;
        // console.log(genereAdd);
        let genereVal = genere.value;

        if(itemList.length=== 0){
            document.querySelector("#msgGenere").innerHTML=" atleast add 1 item first :(";

            setTimeout(()=> {document.querySelector("#msgGenere").innerHTML= "&nbsp;";}, 4000);
            return;
        }

        if(genereVal=='  ' || genereVal==' '){  //warning for only space
            document.querySelector("#msgGenere").innerHTML="Wrong Input :(";
            document.querySelector("#genere").value= "";
            return;
        }
    
        document.querySelector("#genere").value= "";
        genereList[indForGenere]= true;
        indForGenere++;

        itemList[indForItem]= true;
        indForItem++;
        }

        let onTimeClick= true;
        function about(){

            if(onTimeClick)
           { document.querySelector("#knowMore").innerHTML=
    `<b>Devoloper Note: 
        <p>
             <li style="color: skyblue;">here, only used pure Html, Css, Js</li>

            <li style="color: red;">There is no server or database intigrated with this site yet

            <span style="color: green">but still you can work with your present list</span></li>

            <li><b style="color: yellow">This CRUD type Project specialy based on JS only Try it now!</b></li>
        </p> `;

        document.querySelector("#knowMoreButton").innerHTML="Wanna-Hide!";
        onTimeClick= false;
        }

        else{
            document.querySelector("#knowMoreButton").innerHTML="Know More";

            document.querySelector("#knowMore").innerHTML="";

            onTimeClick= true;
        }
        
        }
