const container = document.getElementById("issue-container")
const modal = document.getElementById("modal")
const issueCount = document.getElementById("issue-count")

let allIssues = []
let currentTab = "all"


async function loadIssues(){

try{

const res = await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
)

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

}

catch(error){

console.log("API error",error)

}

}

loadIssues()




function displayIssues(issues){

container.innerHTML = ""

issueCount.innerText = issues.length + " Issues"

issues.forEach(issue =>{

const card = document.createElement("div")

card.classList.add("card")



const color =
issue.status === "open"
? "#2da44e"
: "#8250df"

card.style.borderTop = `4px solid ${color}`




const priority =
issue.priority === "high"
? "HIGH"
: issue.priority === "medium"
? "MEDIUM"
: "LOW"

const priorityClass =
issue.priority === "high"
? "high"
: issue.priority === "medium"
? "medium"
: "low"



card.innerHTML = `

<div class="card-top">

<span class="status-dot" style="border-color:${color}"></span>

<span class="priority ${priorityClass}">
${priority}
</span>

</div>

<h4>${issue.title}</h4>

<p class="desc">${issue.description || ""}</p>

<div class="labels">
<span class="label bug">BUG</span>
<span class="label help">HELP WANTED</span>
</div>

<div class="card-footer">

<span>#${issue.id} by ${issue.author}</span>

<span>
${issue.createdAt
? issue.createdAt.slice(0,10)
: ""}
</span>

</div>

`

container.appendChild(card)



card.addEventListener("click",()=>{
openModal(issue.id)
})

})

}





function setTab(tab,btn){

currentTab = tab

document
.querySelectorAll(".tab")
.forEach(t => t.classList.remove("active"))

btn.classList.add("active")

if(tab === "all"){
displayIssues(allIssues)
}

else{

const filtered =
allIssues.filter(i =>
i.status === tab
)

displayIssues(filtered)

}

}



document.getElementById("all").onclick =
function(){
setTab("all",this)
}

document.getElementById("open").onclick =
function(){
setTab("open",this)
}

document.getElementById("closed").onclick =
function(){
setTab("closed",this)
}




document
.getElementById("searchInput")
.addEventListener("input",function(){

searchIssue(this.value)

})

function searchIssue(text){

text = text.toLowerCase()

const filtered =
allIssues.filter(issue =>
issue.title.toLowerCase()
.includes(text)
)

displayIssues(filtered)

}




async function openModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data

modal.innerHTML = `

<div class="modal-box">

<h2>${issue.title}</h2>

<div class="modal-status">

<span class="status-opened">
Opened
</span>

<span>Opened by ${issue.author}</span>

<span>
${issue.createdAt
? issue.createdAt.slice(0,10)
: ""}
</span>

</div>

<div class="modal-tags">

<span class="tag tag-bug">BUG</span>

<span class="tag tag-help">HELP WANTED</span>

</div>

<p class="modal-desc">

${issue.description || ""}

</p>

<div class="modal-info">

<div>
<div class="modal-info-title">Assignee:</div>
<b>${issue.author}</b>
</div>

<div>
<div class="modal-info-title">Priority:</div>
<span class="priority-high">
${issue.priority.toUpperCase()}
</span>
</div>

</div>

<div class="modal-actions">
<button onclick="closeModal()">Close</button>
</div>

</div>

`

modal.style.display="flex"

}




function closeModal(){

modal.style.display="none"

}