// const { response } = require("express")

console.log("the backend js is loaded")
// fetch('http://localhost:3000/weather?address=Patna').then((response)=>{
// response.json().then((data)=>{
//     if(data.error){
//         console.log(data.error)
//     }
//     else{
//     console.log(data)}
// })
// })

const ig= document.querySelector('input');
const ug=document.querySelector('form')
const m=document.querySelector('#m-1')
const m2=document.querySelector('#m-2')
const m3=document.querySelector('#m-3')

ug.addEventListener('submit',(e)=>{
    e.preventDefault();
const location=ig.value
    m.textContent=('Loading......')
    fetch('/weather?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
       m2.textContent=('data.error')
    }
    else{
    m2.textContent=data.forecaste
    m3.textContent=data.location
}
})
})
})