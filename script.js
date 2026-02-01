let accounts=[];
let currentUser=null;
let chosenOp="";

fetch("accounts.json")
.then(res=>res.json())
.then(data=>accounts=data.accounts);

function login(){
let name=document.getElementById("name").value.trim();
let accNo=document.getElementById("accNo").value.trim();

currentUser=accounts.find(a=>a.name===name && a.accountNo===accNo);

if(currentUser) show("pinPage");
else document.getElementById("loginMsg").innerText="Invalid details";
}

function verifyPin(){
let pin=document.getElementById("pin").value;

if(pin===currentUser.pin) show("operationPage");
else document.getElementById("pinMsg").innerText="Wrong ATM PIN";
}

function selectOperation(op){
chosenOp=op;

if(op==="balance"){
document.getElementById("amountBox").style.display="none";
show("rePinPage");
}else{
document.getElementById("amountBox").style.display="block";
}
}

function askRePin(){
show("rePinPage");
}

function confirmTransaction(){
let rePin=document.getElementById("rePin").value;
let amt=Number(document.getElementById("amount").value);

if(rePin!==currentUser.pin){
document.getElementById("rePinMsg").innerText="Incorrect PIN";
return;
}

if(chosenOp==="balance"){
showResult("Your balance is ₹"+currentUser.balance,false);
return;
}

if(amt<=0){
showResult("Invalid amount",true);
return;
}

if(chosenOp==="withdraw"){

if(amt>currentUser.balance){
showResult("Insufficient Balance\nYour balance: ₹"+currentUser.balance,true);
return;
}

currentUser.balance-=amt;
showResult("Withdraw ₹"+amt+"\nBalance: ₹"+currentUser.balance,false);

}else if(chosenOp==="deposit"){

currentUser.balance+=amt;
showResult("Deposit ₹"+amt+"\nBalance: ₹"+currentUser.balance,false);
}
}

function showResult(text,isError){
show("resultPage");
let box=document.getElementById("displayResult");
box.innerText=text;
box.className=isError?"error":"success";
}

function continueOperation(){
show("operationPage");
document.getElementById("amountBox").style.display="none";
document.getElementById("amount").value="";
}

function logout(){
currentUser=null;
show("loginPage");
document.querySelectorAll("input").forEach(i=>i.value="");
}

function show(id){
["loginPage","pinPage","operationPage","rePinPage","resultPage"]
.forEach(p=>document.getElementById(p).style.display="none");
document.getElementById(id).style.display="block";
}
