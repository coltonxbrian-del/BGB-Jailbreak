const commands=[
  ["/help","Display the available command list"],["/menu","Open the main navigation menu"],["/code","Plan or generate project code"],["/debug","Analyze a bug report and suggest fixes"],["/explain","Explain code, tools or concepts"],["/optimize","Review opportunities to improve performance"],["/review","Review code quality and maintainability"],["/build","Create a project plan and build steps"],["/status","Show workspace information"],["/reset","Reset interface selections"]
];
const stacks=[
  ["Python","⌘","Scripts, automation and backend tools","Create a Python project. Help me plan its folder structure, dependencies, implementation and tests."],
  ["JavaScript","JS","Interactive websites and applications","Create a JavaScript project with a clean structure, accessible UI and clear setup instructions."],
  ["HTML / CSS","◇","Responsive websites and interfaces","Build a responsive website using HTML, CSS and JavaScript. Include complete source files."],
  ["C#","C#","Desktop apps and game logic","Plan a C# application with organized classes, clear responsibilities and testable components."],
  ["Unity","◉","Game development with Unity and C#","Plan a Unity game project with scenes, scripts, assets and development milestones."],
  ["Android","▣","Android application planning","Plan an Android app with screens, navigation, data storage and accessibility."],
  ["API development","⇄","Backend services and integrations","Design a REST API with routes, validation, authentication considerations and documentation."],
  ["Project architecture","⌘","Folders, modules and system design","Design a maintainable project architecture with modules, file structure and milestones."]
];
const tools=[
  ["Code generator","⌁","Create a code outline or starter implementation."],
  ["Bug analyzer","⌕","Organize an error report and investigate likely causes."],
  ["UI architect","▦","Plan screens, components and responsive layouts."],
  ["File planner","▤","Create a project folder and file tree."],
  ["Performance analyzer","◴","Review likely performance bottlenecks."],
  ["Documentation writer","▧","Draft setup guides and technical documentation."]
];
const $=s=>document.querySelector(s);
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2200)}
function navigate(page){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$("#sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
$("#menuToggle").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
function renderCommands(filter=""){const list=$("#commandList");list.innerHTML="";const found=commands.filter(c=>(c[0]+" "+c[1]).toLowerCase().includes(filter.toLowerCase()));if(!found.length){list.innerHTML='<p class="muted">No commands match your search.</p>';return}found.forEach(c=>{const row=document.createElement("div");row.className="command-row";const code=document.createElement("code");code.textContent=c[0];const desc=document.createElement("p");desc.textContent=c[1];const btn=document.createElement("button");btn.className="copy-btn";btn.textContent="COPY";btn.addEventListener("click",()=>copyText(c[0]));row.append(code,desc,btn);list.append(row)})}
async function copyText(value){try{await navigator.clipboard.writeText(value);toast("Copied to clipboard")}catch{const ta=document.createElement("textarea");ta.value=value;document.body.append(ta);ta.select();document.execCommand("copy");ta.remove();toast("Copied")}}
$("#commandSearch").addEventListener("input",e=>renderCommands(e.target.value));
function renderTiles(){stacks.forEach(s=>{const b=document.createElement("button");b.className="tile-card";b.innerHTML=`<span class="tile-icon">${s[1]}</span><b>${s[0]}</b><small>${s[2]}</small>`;b.addEventListener("click",()=>{$("#projectBrief").value=s[3];toast(s[0]+" project brief loaded")});$("#labGrid").append(b)});tools.forEach(t=>{const b=document.createElement("button");b.className="tool-card";b.innerHTML=`<span class="tile-icon">${t[1]}</span><b>${t[0]}</b><small>${t[2]}</small>`;b.addEventListener("click",()=>{$("#projectBrief").value=t[0]+": "+t[2]+"\n\nProject details:\n- Goal:\n- Inputs:\n- Expected output:\n- Constraints:\n\nNext steps:\n1. Define requirements\n2. Design the solution\n3. Implement and test";navigate("lab");toast(t[0]+" workspace prepared")});$("#toolGrid").append(b)})}
$("#copyBrief").addEventListener("click",()=>copyText($("#projectBrief").value));
$("#resetSettings").addEventListener("click",()=>{localStorage.removeItem("bgb-theme");localStorage.removeItem("bgb-motion");applyTheme("pink");$("#motionToggle").checked=true;document.documentElement.classList.remove("no-motion");toast("Settings reset")});
function applyTheme(theme){document.documentElement.style.setProperty("--pink",theme==="red"?"#ff405e":"#ff3293");document.documentElement.style.setProperty("--pink2",theme==="red"?"#ff8797":"#ff75b5");localStorage.setItem("bgb-theme",theme);document.querySelectorAll(".theme-choice").forEach(b=>b.classList.toggle("selected",b.dataset.theme===theme))}
document.querySelectorAll(".theme-choice").forEach(b=>b.addEventListener("click",()=>applyTheme(b.dataset.theme)));
$("#motionToggle").addEventListener("change",e=>{document.documentElement.classList.toggle("no-motion",!e.target.checked);localStorage.setItem("bgb-motion",e.target.checked?"on":"off")});
applyTheme(localStorage.getItem("bgb-theme")||"pink");if(localStorage.getItem("bgb-motion")==="off"){$("#motionToggle").checked=false;document.documentElement.classList.add("no-motion")}
renderCommands();renderTiles();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
