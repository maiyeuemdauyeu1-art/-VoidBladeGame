AndzOS/
├── index.html
├── css/
│   ├── home.css
│   ├── lockscreen.css
│   ├── apps.css
│   └── settings.css
├── js/
│   ├── home.js
│   ├── camera.js
│   ├── photos.js
│   ├── safari.js
│   ├── settings.js
│   ├── appstore.js
│   └── account.js
└── assets/
    ├── wallpapers/
    ├── icons/
    └── sounds/
    <link rel="stylesheet" href="css/home.css">
<link rel="stylesheet" href="css/lockscreen.css">
<link rel="stylesheet" href="css/apps.css">
<link rel="stylesheet" href="css/settings.css">
<script src="js/home.js"></script>
<script src="js/camera.js"></script>
<script src="js/photos.js"></script>
<script src="js/safari.js"></script>
<script src="js/settings.js"></script>
<script src="js/appstore.js"></script>
<script src="js/account.js"></script>
<div id="faceIDScreen">

<div id="faceCircle">

<div class="faceRing"></div>

😊

</div>

<h2>Face ID</h2>

<p>Đang xác thực...</p>

</div>
#faceIDScreen{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
justify-content:center;
align-items:center;
flex-direction:column;
background:#000;
color:white;
z-index:90000;
}

#faceCircle{
position:relative;
width:180px;
height:180px;
border-radius:50%;
border:4px solid #00bfff;
display:flex;
justify-content:center;
align-items:center;
font-size:70px;
}

.faceRing{
position:absolute;
width:180px;
height:180px;
border-radius:50%;
border:4px solid cyan;
animation:scan 1.5s linear infinite;
}

@keyframes scan{

0%{
transform:scale(.8);
opacity:1;
}

100%{
transform:scale(1.3);
opacity:0;
}

}
const faceIDScreen=
document.getElementById("faceIDScreen");

function startFaceID(){

faceIDScreen.style.display="flex";

setTimeout(()=>{

faceIDScreen.style.display="none";

showIsland(

"🔓 Face ID",

"Đã mở khóa",

"😊"

);

lockScreen.style.display="none";

},2500);

}
unlockBtn.onclick=()=>{
unlockBtn.onclick=()=>{

if(

unlockPin.value===

localStorage.getItem("pin")

){

startFaceID();

}else{

alert("Sai mã PIN");

}

};
<div id="cloudApp">

<div class="cloudHeader">

<button id="closeCloud">✕</button>

<h2>Andz Cloud</h2>

</div>

<button id="backupBtn">
💾 Sao lưu dữ liệu
</button>

<button id="restoreBtn">
📂 Khôi phục dữ liệu
</button>

<input
type="file"
id="restoreFile"
accept=".json"
hidden>

</div>
#cloudApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#f5f5f7;
z-index:80000;
padding:20px;
}

.cloudHeader{
display:flex;
align-items:center;
gap:20px;
margin-bottom:30px;
}

#backupBtn,
#restoreBtn{
width:100%;
padding:18px;
margin:10px 0;
border:none;
border-radius:18px;
background:#007AFF;
color:white;
font-size:18px;
}
const cloudApp=document.getElementById("cloudApp");

function openCloud(){

cloudApp.style.display="block";

}

closeCloud.onclick=()=>{

cloudApp.style.display="none";

};

backupBtn.onclick=()=>{

const data={

settings:localStorage,

time:new Date().toLocaleString()

};

const blob=new Blob(

[JSON.stringify(data)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="AndzCloudBackup.json";

a.click();

showIsland(

"☁️ Andz Cloud",

"Đã sao lưu",

"💾"

);

};

restoreBtn.onclick=()=>{

restoreFile.click();

};

restoreFile.onchange=e=>{

const file=e.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=()=>{

const data=JSON.parse(reader.result);

for(let key in data.settings){

localStorage.setItem(

key,

data.settings[key]

);

}

showIsland(

"☁️ Andz Cloud",

"Đã khôi phục",

"✅"

);

};

reader.readAsText(file);

};
<script src="js/cloud.js"></script>
<div id="backupList">

<h3>Các bản sao lưu</h3>

<div id="backupItems"></div>

</div>
#backupList{
margin-top:30px;
}

.backupItem{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px;
margin:10px 0;
background:white;
border-radius:16px;
}

.backupActions{
display:flex;
gap:10px;
}

.backupActions button{
padding:8px 15px;
border:none;
border-radius:12px;
background:#007AFF;
color:white;
}
function getBackups(){

return JSON.parse(

localStorage.getItem("andz_backups")||"[]"

);

}

function saveBackupList(list){

localStorage.setItem(

"andz_backups",

JSON.stringify(list)

);

}

function refreshBackupList(){

backupItems.innerHTML="";

const list=getBackups();

list.forEach((item,index)=>{

const row=document.createElement("div");

row.className="backupItem";

const title=document.createElement("span");

title.innerText=item.name;

const actions=document.createElement("div");

actions.className="backupActions";

const download=document.createElement("button");

download.innerText="Tải";

download.onclick=()=>{

const blob=new Blob(

[item.data],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download=item.name+".json";

a.click();

};

const remove=document.createElement("button");

remove.innerText="Xóa";

remove.onclick=()=>{

list.splice(index,1);

saveBackupList(list);

refreshBackupList();

};

actions.append(download);

actions.append(remove);

row.append(title);

row.append(actions);

backupItems.append(row);

});

}
backupBtn.onclick=()=>{

const data=JSON.stringify({

settings:Object.fromEntries(

Object.entries(localStorage)

),

time:new Date().toLocaleString()

});

const list=getBackups();

list.unshift({

name:"Backup "+Date.now(),

data:data

});

saveBackupList(list);

refreshBackupList();

showIsland(

"☁️ Andz Cloud",

"Đã tạo bản sao lưu",

"💾"

);

};
refreshBackupList();
<div id="profileApp">

<div class="profileHeader">

<button id="closeProfile">✕</button>

<h2>Hồ sơ</h2>

</div>

<div class="profileCard">

<img
id="avatar"
src="assets/icons/avatar.png">

<input
id="profileName"
placeholder="Tên">

<input
id="profileEmail"
placeholder="Email">

<button id="saveProfile">

Lưu hồ sơ

</button>

</div>

</div>
#profileApp{

position:fixed;

top:0;

left:0;

width:100%;

height:100%;

background:#f2f2f7;

display:none;

z-index:90000;

}

.profileCard{

display:flex;

flex-direction:column;

align-items:center;

padding:30px;

}

#avatar{

width:120px;

height:120px;

border-radius:50%;

margin-bottom:25px;

object-fit:cover;

border:4px solid #007AFF;

}

.profileCard input{

width:100%;

padding:15px;

margin:10px 0;

border:none;

border-radius:15px;

font-size:18px;

}

#saveProfile{

width:100%;

padding:15px;

border:none;

border-radius:18px;

background:#007AFF;

color:white;

font-size:18px;

}
const profileApp=document.getElementById("profileApp");

function openProfile(){

profileApp.style.display="block";

profileName.value=

localStorage.getItem("profileName")||"";

profileEmail.value=

localStorage.getItem("profileEmail")||"";

}

closeProfile.onclick=()=>{

profileApp.style.display="none";

};

saveProfile.onclick=()=>{

localStorage.setItem(

"profileName",

profileName.value

);

localStorage.setItem(

"profileEmail",

profileEmail.value

);

showIsland(

"👤 Hồ sơ",

"Đã lưu thông tin",

"✅"

);

};
<script src="js/profile.js"></script>
<div id="weatherApp">

<div class="weatherHeader">

<button id="closeWeather">✕</button>

<h2>Thời tiết</h2>

</div>

<div class="weatherCard">

<h1 id="temp">30°</h1>

<h2 id="city">Hà Nội</h2>

<p id="condition">☀️ Trời nắng</p>

<div class="weatherInfo">

<div>
🌡️
<p>30°</p>
</div>

<div>
💨
<p>5 km/h</p>
</div>

<div>
💧
<p>65%</p>
</div>

</div>

</div>

</div>
#weatherApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:linear-gradient(#4facfe,#00c6fb);
color:white;
z-index:95000;
}

.weatherHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
}

.weatherCard{
text-align:center;
margin-top:60px;
}

#temp{
font-size:90px;
font-weight:200;
}

.weatherInfo{
display:flex;
justify-content:space-around;
margin-top:50px;
}

.weatherInfo div{
width:90px;
padding:20px;
border-radius:20px;
background:rgba(255,255,255,.2);
backdrop-filter:blur(20px);
}
const weatherApp=document.getElementById("weatherApp");

function openWeather(){

weatherApp.style.display="block";

}

closeWeather.onclick=()=>{

weatherApp.style.display="none";

};

const weatherList=[

{
temp:"30°",
city:"Hà Nội",
condition:"☀️ Trời nắng"
},

{
temp:"26°",
city:"Đà Nẵng",
condition:"🌧️ Có mưa"
},

{
temp:"28°",
city:"TP.HCM",
condition:"⛅ Có mây"
}

];

let weatherIndex=0;

setInterval(()=>{

weatherIndex++;

if(weatherIndex>=weatherList.length){

weatherIndex=0;

}

temp.innerHTML=
weatherList[weatherIndex].temp;

city.innerHTML=
weatherList[weatherIndex].city;

condition.innerHTML=
weatherList[weatherIndex].condition;

},5000);
<script src="js/weather.js"></script>
<div id="mapsApp">

<div class="mapsHeader">

<button id="closeMaps">✕</button>

<h2>Bản đồ</h2>

</div>

<div id="mapToolbar">

<input
id="mapSearch"
placeholder="🔍 Tìm địa điểm">

<button id="locateBtn">
📍
</button>

</div>

<div id="mapArea">

<div id="mapGrid"></div>

<div id="marker">📍</div>

</div>

<div id="mapInfo">

<p id="locationText">

Chưa xác định vị trí

</p>

</div>

</div>
#mapsApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#eef3f8;
z-index:96000;
}

.mapsHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
background:white;
}

#mapToolbar{
display:flex;
padding:10px;
gap:10px;
background:white;
}

#mapSearch{
flex:1;
padding:12px;
border:none;
border-radius:15px;
}

#locateBtn{
width:55px;
border:none;
border-radius:15px;
background:#007AFF;
color:white;
font-size:22px;
}

#mapArea{
position:relative;
height:calc(100% - 180px);
background:
linear-gradient(#d7efd2 1px,transparent 1px),
linear-gradient(90deg,#d7efd2 1px,transparent 1px);
background-size:40px 40px;
}

#marker{
position:absolute;
left:50%;
top:50%;
transform:translate(-50%,-50%);
font-size:36px;
}

#mapInfo{
padding:15px;
background:white;
}
const mapsApp=document.getElementById("mapsApp");

function openMaps(){

mapsApp.style.display="block";

}

closeMaps.onclick=()=>{

mapsApp.style.display="none";

};

locateBtn.onclick=()=>{

if(!navigator.geolocation){

locationText.innerHTML=

"Thiết bị không hỗ trợ GPS";

return;

}

navigator.geolocation.getCurrentPosition(

(pos)=>{

locationText.innerHTML=

"Vĩ độ: "+pos.coords.latitude.toFixed(5)+
"<br>Kinh độ: "+
pos.coords.longitude.toFixed(5);

showIsland(

"📍 Bản đồ",

"Đã xác định vị trí",

"🧭"

);

},

()=>{

locationText.innerHTML=

"Không thể lấy vị trí";

}

);

};

mapSearch.oninput=()=>{

const text=

mapSearch.value.trim();

locationText.innerHTML=

"Tìm kiếm: "+text;

};
<script src="js/maps.js"></script>
<div id="filesApp">

<div class="filesHeader">

<button id="closeFiles">✕</button>

<h2>Tệp</h2>

</div>

<div class="filesToolbar">

<button id="newFile">
+ Tệp mới
</button>

</div>

<div id="fileList"></div>

<div id="editor">

<input
id="fileName"
placeholder="Tên tệp">

<textarea
id="fileContent"
placeholder="Nhập nội dung..."></textarea>

<button id="saveFile">
Lưu
</button>

</div>

</div>
#filesApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#f5f5f7;
z-index:97000;
}

.filesHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
background:white;
}

.filesToolbar{
padding:15px;
}

#fileList{
padding:10px;
max-height:280px;
overflow:auto;
}

.fileItem{
display:flex;
justify-content:space-between;
align-items:center;
background:white;
padding:15px;
margin-bottom:10px;
border-radius:15px;
}

#editor{
padding:15px;
}

#fileName,
#fileContent{
width:100%;
margin-bottom:12px;
padding:12px;
border:none;
border-radius:12px;
}

#fileContent{
height:180px;
resize:none;
}

#saveFile{
width:100%;
padding:15px;
border:none;
border-radius:15px;
background:#007AFF;
color:white;
font-size:18px;
}
const filesApp=document.getElementById("filesApp");

function openFiles(){

filesApp.style.display="block";

loadFiles();

}

closeFiles.onclick=()=>{

filesApp.style.display="none";

};

function getFiles(){

return JSON.parse(

localStorage.getItem("andz_files")||"[]"

);

}

function saveFiles(list){

localStorage.setItem(

"andz_files",

JSON.stringify(list)

);

}

function loadFiles(){

fileList.innerHTML="";

getFiles().forEach((file,index)=>{

const row=document.createElement("div");

row.className="fileItem";

row.innerHTML=`

<span>${file.name}</span>

<div>

<button onclick="editFile(${index})">
Mở
</button>

<button onclick="deleteFile(${index})">
🗑
</button>

</div>

`;

fileList.appendChild(row);

});

}

function editFile(index){

const file=getFiles()[index];

fileName.value=file.name;

fileContent.value=file.content;

saveFile.dataset.index=index;

}

function deleteFile(index){

const files=getFiles();

files.splice(index,1);

saveFiles(files);

loadFiles();

}

saveFile.onclick=()=>{

const files=getFiles();

const data={

name:fileName.value,

content:fileContent.value

};

if(saveFile.dataset.index){

files[saveFile.dataset.index]=data;

}else{

files.unshift(data);

}

saveFiles(files);

fileName.value="";

fileContent.value="";

saveFile.dataset.index="";

loadFiles();

showIsland(

"📁 Tệp",

"Đã lưu tệp",

"💾"

);

};

newFile.onclick=()=>{

fileName.value="";

fileContent.value="";

saveFile.dataset.index="";

};
<script src="js/files.js"></script>
<div id="mailApp">

<div class="mailHeader">

<button id="closeMail">✕</button>

<h2>Mail</h2>

</div>

<div class="mailToolbar">

<button id="composeMail">
✉️ Soạn thư
</button>

</div>

<div id="mailList"></div>

<div id="composePage">

<input
id="mailTo"
placeholder="Người nhận">

<input
id="mailSubject"
placeholder="Tiêu đề">

<textarea
id="mailContent"
placeholder="Nội dung"></textarea>

<button id="sendMail">

Gửi

</button>

</div>

</div>
#mailApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#f5f5f7;
z-index:98000;
}

.mailHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
background:white;
}

.mailToolbar{
padding:15px;
}

#mailList{
padding:10px;
max-height:280px;
overflow:auto;
}

.mailItem{
background:white;
padding:15px;
margin-bottom:10px;
border-radius:15px;
}

#composePage{
display:none;
padding:15px;
}

#composePage input,
#composePage textarea{
width:100%;
padding:12px;
margin-bottom:12px;
border:none;
border-radius:12px;
}

#composePage textarea{
height:180px;
resize:none;
}

#sendMail{
width:100%;
padding:15px;
border:none;
border-radius:15px;
background:#007AFF;
color:white;
font-size:18px;
}
const mailApp=document.getElementById("mailApp");

function openMail(){

mailApp.style.display="block";

composePage.style.display="none";

loadMail();

}

closeMail.onclick=()=>{

mailApp.style.display="none";

};

function getMail(){

return JSON.parse(

localStorage.getItem("andz_mail")||"[]"

);

}

function saveMail(list){

localStorage.setItem(

"andz_mail",

JSON.stringify(list)

);

}

function loadMail(){

mailList.innerHTML="";

getMail().forEach(mail=>{

const row=document.createElement("div");

row.className="mailItem";

row.innerHTML=

"<b>"+mail.subject+"</b><br>"+

mail.to;

mailList.appendChild(row);

});

}

composeMail.onclick=()=>{

composePage.style.display="block";

};

sendMail.onclick=()=>{

const list=getMail();

list.unshift({

to:mailTo.value,

subject:mailSubject.value,

content:mailContent.value,

time:new Date().toLocaleString()

});

saveMail(list);

mailTo.value="";

mailSubject.value="";

mailContent.value="";

composePage.style.display="none";

loadMail();

showIsland(

"📧 Mail",

"Đã gửi thư",

"✅"

);

};
<script src="js/mail.js"></script>
<div id="calendarApp">

<div class="calendarHeader">

<button id="closeCalendar">✕</button>

<h2>Lịch</h2>

</div>

<div class="calendarToolbar">

<button id="newEvent">
➕ Thêm sự kiện
</button>

</div>

<div id="eventList"></div>

<div id="eventEditor">

<input
id="eventTitle"
placeholder="Tên sự kiện">

<input
id="eventDate"
type="date">

<input
id="eventTime"
type="time">

<textarea
id="eventNote"
placeholder="Ghi chú"></textarea>

<button id="saveEvent">

Lưu sự kiện

</button>

</div>

</div>
#calendarApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#f5f5f7;
z-index:99000;
}

.calendarHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
background:white;
}

.calendarToolbar{
padding:15px;
}

#eventList{
padding:10px;
max-height:280px;
overflow:auto;
}

.eventItem{
background:white;
padding:15px;
margin-bottom:10px;
border-radius:15px;
}

#eventEditor{
display:none;
padding:15px;
}

#eventEditor input,
#eventEditor textarea{
width:100%;
padding:12px;
margin-bottom:12px;
border:none;
border-radius:12px;
}

#eventEditor textarea{
height:120px;
resize:none;
}

#saveEvent{
width:100%;
padding:15px;
border:none;
border-radius:15px;
background:#ff3b30;
color:white;
font-size:18px;
}
const calendarApp=document.getElementById("calendarApp");

function openCalendar(){

calendarApp.style.display="block";

eventEditor.style.display="none";

loadEvents();

}

closeCalendar.onclick=()=>{

calendarApp.style.display="none";

};

function getEvents(){

return JSON.parse(

localStorage.getItem("andz_calendar")||"[]"

);

}

function saveEvents(list){

localStorage.setItem(

"andz_calendar",

JSON.stringify(list)

);

}

function loadEvents(){

eventList.innerHTML="";

getEvents().forEach(event=>{

const row=document.createElement("div");

row.className="eventItem";

row.innerHTML=

"<b>"+event.title+"</b><br>"+

event.date+

" "+event.time;

eventList.appendChild(row);

});

}

newEvent.onclick=()=>{

eventEditor.style.display="block";

};

saveEvent.onclick=()=>{

const list=getEvents();

list.unshift({

title:eventTitle.value,

date:eventDate.value,

time:eventTime.value,

note:eventNote.value

});

saveEvents(list);

eventTitle.value="";

eventDate.value="";

eventTime.value="";

eventNote.value="";

eventEditor.style.display="none";

loadEvents();

showIsland(

"📅 Lịch",

"Đã lưu sự kiện",

"✅"

);

};
<script src="js/calendar.js"></script>
<div id="clockApp">

<div class="clockHeader">

<button id="closeClock">✕</button>

<h2>Đồng hồ</h2>

</div>

<div id="clockTime">

00:00:00

</div>

<div class="clockButtons">

<button id="startStopwatch">
▶️
</button>

<button id="resetStopwatch">
🔄
</button>

</div>

<div class="timerBox">

<input
id="timerMinutes"
type="number"
placeholder="Phút">

<button id="startTimer">
⏲️ Bắt đầu
</button>

</div>

</div>
#clockApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#111;
color:white;
z-index:100000;
}

.clockHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
}

#clockTime{
font-size:70px;
text-align:center;
margin-top:50px;
font-weight:200;
}

.clockButtons{
display:flex;
justify-content:center;
gap:20px;
margin-top:40px;
}

.clockButtons button,
#startTimer{
padding:15px 30px;
border:none;
border-radius:18px;
font-size:20px;
}

.timerBox{
padding:30px;
display:flex;
flex-direction:column;
gap:15px;
}

#timerMinutes{
padding:15px;
border:none;
border-radius:15px;
font-size:18px;
}
const clockApp=document.getElementById("clockApp");

function openClock(){

clockApp.style.display="block";

}

closeClock.onclick=()=>{

clockApp.style.display="none";

};

let sec=0;

let stopwatch=null;

startStopwatch.onclick=()=>{

if(stopwatch){

clearInterval(stopwatch);

stopwatch=null;

startStopwatch.innerHTML="▶️";

}else{

startStopwatch.innerHTML="⏸";

stopwatch=setInterval(()=>{

sec++;

const h=Math.floor(sec/3600);

const m=Math.floor(sec%3600/60);

const s=sec%60;

clockTime.innerHTML=

String(h).padStart(2,"0")+":"+

String(m).padStart(2,"0")+":"+

String(s).padStart(2,"0");

},1000);

}

};

resetStopwatch.onclick=()=>{

clearInterval(stopwatch);

stopwatch=null;

sec=0;

clockTime.innerHTML="00:00:00";

startStopwatch.innerHTML="▶️";

};

startTimer.onclick=()=>{

let remain=

Number(timerMinutes.value)*60;

const timer=setInterval(()=>{

remain--;

if(remain<=0){

clearInterval(timer);

showIsland(

"⏰ Hẹn giờ",

"Đã hết thời gian",

"⏰"

);

alert("Hết giờ!");

}

},1000);

};
<script src="js/clock.js"></script>
<div id="siriApp">

<div id="siriOrb"></div>

<h2>Siri</h2>

<p id="siriText">

Chạm để nói...

</p>

<button id="startSiri">

🎤

</button>

</div>
#siriApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
justify-content:center;
align-items:center;
flex-direction:column;
background:black;
color:white;
z-index:110000;
}

#siriOrb{
width:160px;
height:160px;
border-radius:50%;
background:linear-gradient(45deg,#00c6ff,#7b2ff7);
animation:siriPulse 2s infinite;
}

@keyframes siriPulse{

0%{
transform:scale(1);
}

50%{
transform:scale(1.15);
}

100%{
transform:scale(1);
}

}

#startSiri{
margin-top:40px;
width:90px;
height:90px;
border:none;
border-radius:50%;
font-size:35px;
background:white;
}
const siriApp=document.getElementById("siriApp");

function openSiri(){

siriApp.style.display="flex";

}

const SpeechRecognition=

window.SpeechRecognition||

window.webkitSpeechRecognition;

if(SpeechRecognition){

const recognition=

new SpeechRecognition();

recognition.lang="vi-VN";

startSiri.onclick=()=>{

siriText.innerHTML=

"Đang nghe...";

recognition.start();

};

recognition.onresult=(e)=>{

const text=

e.results[0][0].transcript

.toLowerCase();

siriText.innerHTML=text;

if(text.includes("camera")){

openCamera();

}

if(text.includes("thời tiết")){

openWeather();

}

if(text.includes("bản đồ")){

openMaps();

}

if(text.includes("lịch")){

openCalendar();

}

if(text.includes("đồng hồ")){

openClock();

}

speechSynthesis.speak(

new SpeechSynthesisUtterance(

"Đã thực hiện lệnh"

)

);

};

}else{

siriText.innerHTML=

"Trình duyệt không hỗ trợ";

}
<script src="js/siri.js"></script>
<div id="notificationCenter">

<div class="notificationHeader">

<h2>Thông báo</h2>

<button id="clearNotifications">
Xóa tất cả
</button>

</div>

<div id="notificationList"></div>

</div>
#notificationCenter{
position:fixed;
top:-100%;
left:0;
width:100%;
height:100%;
background:rgba(20,20,20,.95);
backdrop-filter:blur(30px);
transition:.4s;
z-index:120000;
color:white;
overflow:auto;
}

#notificationCenter.show{
top:0;
}

.notificationHeader{
display:flex;
justify-content:space-between;
align-items:center;
padding:25px;
font-size:22px;
}

.notificationItem{
background:rgba(255,255,255,.1);
margin:12px;
padding:16px;
border-radius:18px;
}

.notificationTime{
font-size:13px;
opacity:.6;
margin-top:6px;
}
const notificationCenter=
document.getElementById(
"notificationCenter"
);

const notificationList=
document.getElementById(
"notificationList"
);

function getNotifications(){

return JSON.parse(

localStorage.getItem(

"andz_notifications"

)||"[]");

}

function saveNotifications(list){

localStorage.setItem(

"andz_notifications",

JSON.stringify(list)

);

}

function addNotification(

title,

message

){

const list=getNotifications();

list.unshift({

title,

message,

time:new Date().toLocaleTimeString()

});

saveNotifications(list);

loadNotifications();

}

function loadNotifications(){

notificationList.innerHTML="";

getNotifications()

.forEach(item=>{

const box=

document.createElement("div");

box.className=

"notificationItem";

box.innerHTML=

"<b>"+item.title+"</b><br>"+

item.message+

"<div class='notificationTime'>"+

item.time+

"</div>";

notificationList.appendChild(box);

});

}

clearNotifications.onclick=()=>{

saveNotifications([]);

loadNotifications();

};

loadNotifications();
let startY=0;

document.addEventListener(

"touchstart",

e=>{

startY=

e.touches[0].clientY;

}

);

document.addEventListener(

"touchend",

e=>{

const end=

e.changedTouches[0].clientY;

if(

startY<40&&

end>180

){

notificationCenter

.classList.add("show");

}

if(

end<100

){

notificationCenter

.classList.remove("show");

}

}

);
addNotification(

title,

message

);
showIsland(

"📧 Mail",

"Đã gửi thư",

"✅"

);

addNotification(

"📧 Mail",

"Đã gửi thư"

);
<script src="js/notification.js"></script>
<div id="controlCenter">

<div class="ccHeader">

<h2>Trung tâm điều khiển</h2>

<button id="closeCC">✕</button>

</div>

<div class="ccGrid">

<button class="toggleBtn" id="wifiBtn">
📶
<p>Wi-Fi</p>
</button>

<button class="toggleBtn" id="bluetoothBtn">
🟦
<p>Bluetooth</p>
</button>

<button class="toggleBtn" id="airplaneBtn">
✈️
<p>Máy bay</p>
</button>

<button class="toggleBtn" id="flashBtn">
🔦
<p>Đèn pin</p>
</button>

<button class="toggleBtn" id="rotateBtn">
🔒
<p>Khóa xoay</p>
</button>

<button class="toggleBtn" id="focusBtn">
🌙
<p>Tập trung</p>
</button>

</div>

</div>
#controlCenter{

position:fixed;

right:-100%;

top:0;

width:340px;

max-width:90%;

height:100%;

background:rgba(30,30,30,.95);

backdrop-filter:blur(30px);

transition:.35s;

z-index:130000;

color:white;

padding:20px;

}

#controlCenter.show{

right:0;

}

.ccHeader{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:30px;

}

.ccGrid{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:20px;

}

.toggleBtn{

height:110px;

border:none;

border-radius:24px;

font-size:32px;

background:#3a3a3c;

color:white;

}

.toggleBtn p{

margin-top:8px;

font-size:15px;

}

.toggleBtn.active{

background:#0a84ff;

}
const controlCenter=

document.getElementById(

"controlCenter"

);

function openControlCenter(){

controlCenter.classList.add(

"show"

);

}

closeCC.onclick=()=>{

controlCenter.classList.remove(

"show"

);

};

document.querySelectorAll(

".toggleBtn"

).forEach(btn=>{

const key=

"cc_"+btn.id;

if(

localStorage.getItem(key)==

"true"

){

btn.classList.add(

"active"

);

}

btn.onclick=()=>{

btn.classList.toggle(

"active"

);

localStorage.setItem(

key,

btn.classList.contains(

"active"

)

);

showIsland(

"🎛️ Control Center",

btn.innerText.trim(),

btn.classList.contains(

"active"

)

?"🟢":"⚪"

);

};

});
document.addEventListener(

"touchstart",

e=>{

const x=

e.touches[0].clientX;

const y=

e.touches[0].clientY;

if(

x>

window.innerWidth-40

&&

y<40

){

openControlCenter();

}

});
<script src="js/controlcenter.js"></script>
<div id="calculatorApp">

<div class="calculatorHeader">

<button id="closeCalculator">✕</button>

<h2>Máy tính</h2>

</div>

<input
id="calcDisplay"
readonly
value="0">

<div id="calcButtons">

<button>7</button>
<button>8</button>
<button>9</button>
<button>/</button>

<button>4</button>
<button>5</button>
<button>6</button>
<button>*</button>

<button>1</button>
<button>2</button>
<button>3</button>
<button>-</button>

<button>0</button>
<button>.</button>
<button>=</button>
<button>+</button>

<button id="clearCalc">
C
</button>

</div>

<div id="calcHistory"></div>

</div>
#calculatorApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:black;
display:none;
z-index:140000;
color:white;
}

.calculatorHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
}

#calcDisplay{
width:calc(100% - 40px);
margin:20px;
height:70px;
font-size:36px;
text-align:right;
border:none;
border-radius:20px;
padding:10px;
background:#1c1c1e;
color:white;
}

#calcButtons{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:10px;
padding:20px;
}

#calcButtons button{
height:70px;
border:none;
border-radius:20px;
font-size:28px;
background:#2c2c2e;
color:white;
}

#calcHistory{
height:180px;
overflow:auto;
padding:20px;
font-size:15px;
color:#bbb;
}
const calculatorApp=
document.getElementById("calculatorApp");

function openCalculator(){

calculatorApp.style.display="block";

loadHistory();

}

closeCalculator.onclick=()=>{

calculatorApp.style.display="none";

};

const display=
document.getElementById("calcDisplay");

document.querySelectorAll(
"#calcButtons button"
).forEach(btn=>{

btn.onclick=()=>{

const value=btn.innerText;

if(value=="C"){

display.value="0";

return;

}

if(value=="="){

try{

const result=
eval(display.value);

saveHistory(

display.value+

" = "+result

);

display.value=result;

}catch{

display.value="Lỗi";

}

loadHistory();

return;

}

if(display.value=="0"){

display.value=value;

}else{

display.value+=value;

}

};

});

function saveHistory(text){

const list=JSON.parse(

localStorage.getItem(

"calc_history"

)||"[]"

);

list.unshift(text);

localStorage.setItem(

"calc_history",

JSON.stringify(list)

);

}

function loadHistory(){

calcHistory.innerHTML="";

const list=JSON.parse(

localStorage.getItem(

"calc_history"

)||"[]"

);

list.forEach(item=>{

calcHistory.innerHTML+=

item+"<br>";

});

}
<script src="js/calculator.js"></script>
<div id="musicApp">

<div class="musicHeader">

<button id="closeMusic">✕</button>

<h2>Nhạc</h2>

</div>

<div class="player">

<img
id="cover"
src="assets/icons/music.png">

<h2 id="songName">
Chưa chọn bài
</h2>

<p id="artistName">
Andz Music
</p>

<audio id="playerAudio"></audio>

<input
type="range"
id="musicProgress"
value="0"
min="0"
max="100">

<div class="musicControls">

<button id="shuffleBtn">
🔀
</button>

<button id="prevSong">
⏮
</button>

<button id="playSong">
▶️
</button>

<button id="nextSong">
⏭
</button>

<button id="repeatBtn">
🔁
</button>

</div>

</div>

<div id="songList"></div>

</div>
#musicApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#111;
color:white;
z-index:150000;
overflow:auto;
}

.musicHeader{
height:60px;
display:flex;
align-items:center;
gap:20px;
padding:0 20px;
}

.player{
text-align:center;
padding:20px;
}

#cover{
width:220px;
height:220px;
border-radius:25px;
object-fit:cover;
}

.musicControls{
display:flex;
justify-content:center;
gap:20px;
margin-top:20px;
}

.musicControls button{
width:60px;
height:60px;
border:none;
border-radius:50%;
font-size:24px;
}

.songItem{
padding:15px;
margin:10px;
background:#222;
border-radius:15px;
cursor:pointer;
}
const musicApp=document.getElementById("musicApp");

function openMusic(){

musicApp.style.display="block";

loadSongs();

}

closeMusic.onclick=()=>{

musicApp.style.display="none";

};

const songs=[

{
title:"Andz Theme",
artist:"AndzOS",
file:"assets/sounds/theme.mp3"
},

{
title:"Demo Song",
artist:"Unknown",
file:"assets/sounds/demo.mp3"
}

];

let currentSong=0;

function loadSongs(){

songList.innerHTML="";

songs.forEach((song,index)=>{

const item=document.createElement("div");

item.className="songItem";

item.innerHTML=

"<b>"+song.title+"</b><br>"+song.artist;

item.onclick=()=>playSongIndex(index);

songList.appendChild(item);

});

}

function playSongIndex(index){

currentSong=index;

const song=songs[index];

songName.innerHTML=song.title;

artistName.innerHTML=song.artist;

playerAudio.src=song.file;

playerAudio.play();

playSong.innerHTML="⏸";

}

playSong.onclick=()=>{

if(playerAudio.paused){

playerAudio.play();

playSong.innerHTML="⏸";

}else{

playerAudio.pause();

playSong.innerHTML="▶️";

}

};

nextSong.onclick=()=>{

currentSong=(currentSong+1)%songs.length;

playSongIndex(currentSong);

};

prevSong.onclick=()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

playSongIndex(currentSong);

};

shuffleBtn.onclick=()=>{

currentSong=

Math.floor(

Math.random()*songs.length

);

playSongIndex(currentSong);

};

repeatBtn.onclick=()=>{

playerAudio.loop=

!playerAudio.loop;

repeatBtn.classList.toggle("active");

};

playerAudio.ontimeupdate=()=>{

musicProgress.value=

playerAudio.currentTime/

playerAudio.duration*100||0;

};
<script src="js/music.js"></script>
<div id="lockScreenIOS">

<div id="lockWallpaper"></div>

<div id="lockContent">

<div id="lockDate">
Thứ Hai, 3 tháng 8
</div>

<div id="lockClock">
00:00
</div>

<div id="lockNotifications">

</div>

</div>

<div id="lockBottom">

<button id="lockFlashlight">
🔦
</button>

<div id="unlockHint">

⬆️ Vuốt lên để mở khóa

</div>

<button id="lockCamera">
📷
</button>

</div>

</div>
#lockScreenIOS{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:black;
display:flex;
flex-direction:column;
justify-content:space-between;
z-index:200000;
overflow:hidden;
}

#lockWallpaper{
position:absolute;
width:100%;
height:100%;
background:url("../assets/wallpapers/1.jpg");
background-size:cover;
background-position:center;
filter:brightness(.8);
z-index:-1;
}

#lockContent{
text-align:center;
margin-top:90px;
color:white;
}

#lockDate{
font-size:26px;
margin-bottom:10px;
}

#lockClock{
font-size:90px;
font-weight:200;
}

#lockNotifications{
margin:40px 20px;
}

.lockNotification{
background:rgba(255,255,255,.18);
backdrop-filter:blur(25px);
padding:15px;
margin-top:10px;
border-radius:20px;
}

#lockBottom{
display:flex;
justify-content:space-between;
align-items:center;
padding:35px;
color:white;
}

#lockBottom button{
width:65px;
height:65px;
border:none;
border-radius:50%;
background:rgba(255,255,255,.2);
font-size:28px;
color:white;
}

#unlockHint{
font-size:18px;
animation:upDown 1.2s infinite;
}

@keyframes upDown{

0%{
transform:translateY(0);
}

50%{
transform:translateY(-8px);
}

100%{
transform:translateY(0);
}

}
const lockScreenIOS=
document.getElementById(
"lockScreenIOS"
);

function updateLockClock(){

const now=new Date();

lockClock.innerHTML=

String(now.getHours())
.padStart(2,"0")

+":"

+

String(now.getMinutes())
.padStart(2,"0");

lockDate.innerHTML=

now.toLocaleDateString(

"vi-VN",

{

weekday:"long",

day:"numeric",

month:"long"

}

);

}

setInterval(

updateLockClock,

1000

);

updateLockClock();

function showLockScreen(){

lockScreenIOS.style.display="flex";

loadLockNotifications();

}

function hideLockScreen(){

lockScreenIOS.style.display="none";

}

function loadLockNotifications(){

lockNotifications.innerHTML="";

const list=getNotifications();

list.slice(0,5).forEach(item=>{

const div=document.createElement("div");

div.className="lockNotification";

div.innerHTML=

"<b>"+item.title+"</b><br>"+

item.message;

lockNotifications.appendChild(div);

});

}

let lockStart=0;

lockScreenIOS.addEventListener(

"touchstart",

e=>{

lockStart=

e.touches[0].clientY;

}

);

lockScreenIOS.addEventListener(

"touchend",

e=>{

const end=

e.changedTouches[0].clientY;

if(lockStart-end>120){

hideLockScreen();

}

});

lockCamera.onclick=()=>{

hideLockScreen();

openCamera();

};

lockFlashlight.onclick=()=>{

showIsland(

"🔦",

"Đèn pin",

"💡"

);

};
<script src="js/lockscreen.js"></script>
<div id="homeWidgets">

<div class="widget" id="weatherWidget">

<h3>🌤 Thời tiết</h3>

<p id="widgetTemp">
30°
</p>

<p id="widgetCity">
Hà Nội
</p>

</div>

<div class="widget" id="calendarWidget">

<h3>📅 Lịch</h3>

<p id="widgetEvent">

Không có sự kiện

</p>

</div>

<div class="widget" id="batteryWidget">

<h3>🔋 Pin</h3>

<p id="batteryLevel">

--%

</p>

</div>

<div class="widget" id="musicWidget">

<h3>🎵 Đang phát</h3>

<p id="musicWidgetTitle">

Chưa phát nhạc

</p>

</div>

</div>
#homeWidgets{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:18px;
padding:20px;
}

.widget{
background:rgba(255,255,255,.18);
backdrop-filter:blur(25px);
border-radius:24px;
padding:18px;
color:white;
min-height:140px;
}

.widget h3{
margin-bottom:12px;
font-size:18px;
}

.widget p{
font-size:22px;
}
function updateWeatherWidget(){

widgetTemp.innerHTML="30°";

widgetCity.innerHTML="Hà Nội";

}

function updateCalendarWidget(){

const list=JSON.parse(

localStorage.getItem(

"andz_calendar"

)||"[]"

);

if(list.length){

widgetEvent.innerHTML=

list[0].title;

}else{

widgetEvent.innerHTML=

"Không có sự kiện";

}

}

function updateMusicWidget(){

if(typeof songs!=="undefined"){

if(songs[currentSong]){

musicWidgetTitle.innerHTML=

songs[currentSong].title;

}

}

}

async function updateBattery(){

if(navigator.getBattery){

const battery=

await navigator.getBattery();

batteryLevel.innerHTML=

Math.round(

battery.level*100

)+"%";

}

}

updateWeatherWidget();

updateCalendarWidget();

updateMusicWidget();

updateBattery();

setInterval(()=>{

updateCalendarWidget();

updateMusicWidget();

},3000);
<script src="js/widgets.js"></script>
<div id="themeApp">

<div class="themeHeader">

<button id="closeTheme">
✕
</button>

<h2>Giao diện</h2>

</div>

<button id="lightTheme">
☀️ Chế độ sáng
</button>

<button id="darkTheme">
🌙 Chế độ tối
</button>

<input
type="color"
id="accentColor">

<select id="wallpaperSelect">

<option value="1.jpg">
Hình nền 1
</option>

<option value="2.jpg">
Hình nền 2
</option>

<option value="3.jpg">
Hình nền 3
</option>

</select>

<button id="saveTheme">

Lưu giao diện

</button>

</div>
#themeApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#f5f5f7;
padding:20px;
z-index:160000;
}

.themeHeader{
display:flex;
align-items:center;
gap:20px;
margin-bottom:30px;
}

#themeApp button,
#themeApp select,
#themeApp input{
width:100%;
padding:15px;
margin-bottom:15px;
border:none;
border-radius:18px;
font-size:18px;
}
const themeApp=
document.getElementById("themeApp");

function openTheme(){

themeApp.style.display="block";

}

closeTheme.onclick=()=>{

themeApp.style.display="none";

};

lightTheme.onclick=()=>{

document.body.classList.remove("darkMode");

};

darkTheme.onclick=()=>{

document.body.classList.add("darkMode");

};

saveTheme.onclick=()=>{

localStorage.setItem(

"theme",

document.body.classList.contains("darkMode")

?"dark":"light"

);

localStorage.setItem(

"accent",

accentColor.value

);

localStorage.setItem(

"wallpaper",

wallpaperSelect.value

);

document.documentElement.style
.setProperty(

"--accent",

accentColor.value

);

lockWallpaper.style.backgroundImage=

"url(assets/wallpapers/"+

wallpaperSelect.value+")";

showIsland(

"🎨 Giao diện",

"Đã lưu",

"✅"

);

};

window.onload=()=>{

const mode=

localStorage.getItem("theme");

if(mode==="dark"){

document.body.classList.add(

"darkMode"

);

}

const accent=

localStorage.getItem("accent");

if(accent){

document.documentElement.style
.setProperty(

"--accent",

accent

);

accentColor.value=accent;

}

const wallpaper=

localStorage.getItem("wallpaper");

if(wallpaper){

wallpaperSelect.value=wallpaper;

lockWallpaper.style.backgroundImage=

"url(assets/wallpapers/"+

wallpaper+")";

}

};
:root{

--accent:#007AFF;

}

.darkMode{

background:#000;

color:white;

}

button{

transition:.25s;

}

button:hover{

opacity:.9;

}

.accent{

color:var(--accent);

}
<script src="js/theme.js"></script>
<div id="appStoreApp">

<div class="appStoreHeader">

<button id="closeAppStore">
✕
</button>

<h2>App Store</h2>

</div>

<input
id="searchApp"
placeholder="🔍 Tìm ứng dụng">

<div id="appStoreList"></div>

</div>
#appStoreApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#f5f5f7;
z-index:170000;
overflow:auto;
}

.appStoreHeader{
display:flex;
align-items:center;
gap:20px;
padding:20px;
background:white;
}

#searchApp{
width:calc(100% - 40px);
margin:20px;
padding:15px;
border:none;
border-radius:18px;
font-size:18px;
}

.storeItem{
display:flex;
justify-content:space-between;
align-items:center;
margin:15px;
padding:15px;
background:white;
border-radius:18px;
}

.storeItem button{
padding:10px 20px;
border:none;
border-radius:15px;
background:#007AFF;
color:white;
}
const appStoreApp=document.getElementById("appStoreApp");

function openAppStore(){

appStoreApp.style.display="block";

renderStore();

}

closeAppStore.onclick=()=>{

appStoreApp.style.display="none";

};

const storeApps=[

{
name:"Máy tính",
size:"5 MB"
},

{
name:"Thời tiết",
size:"8 MB"
},

{
name:"Bản đồ",
size:"12 MB"
},

{
name:"Mail",
size:"9 MB"
},

{
name:"Nhạc",
size:"18 MB"
},

{
name:"Lịch",
size:"6 MB"
}

];

function getInstalled(){

return JSON.parse(

localStorage.getItem(

"installed_apps"

)||"[]"

);

}

function renderStore(){

appStoreList.innerHTML="";

const installed=getInstalled();

storeApps.forEach(app=>{

const row=document.createElement("div");

row.className="storeItem";

const isInstalled=

installed.includes(app.name);

row.innerHTML=

"<div><b>"+app.name+

"</b><br>"+app.size+

"</div>";

const btn=document.createElement("button");

btn.innerHTML=

isInstalled?

"Gỡ":"Cài";

btn.onclick=()=>{

let list=getInstalled();

if(isInstalled){

list=list.filter(

i=>i!==app.name

);

}else{

list.push(app.name);

}

localStorage.setItem(

"installed_apps",

JSON.stringify(list)

);

renderStore();

showIsland(

"🏪 App Store",

isInstalled?

"Đã gỡ ứng dụng":

"Đã cài ứng dụng",

"📦"

);

};

row.appendChild(btn);

appStoreList.appendChild(row);

});

}

searchApp.oninput=()=>{

const keyword=

searchApp.value.toLowerCase();

document.querySelectorAll(

".storeItem"

).forEach(item=>{

item.style.display=

item.innerText

.toLowerCase()

.includes(keyword)

?"flex":"none";

});

};
<script src="js/appstore.js"></script>
<div id="andzAIApp">

<div class="aiHeader">

<button id="closeAI">
✕
</button>

<h2>Andz AI</h2>

</div>

<div id="aiMessages"></div>

<div class="aiInputBox">

<input
id="aiInput"
placeholder="Nhập câu hỏi...">

<button id="sendAI">
Gửi
</button>

</div>

</div>
#andzAIApp{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:none;
background:#111;
color:white;
z-index:180000;
}

.aiHeader{
display:flex;
align-items:center;
gap:20px;
padding:20px;
}

#aiMessages{
height:calc(100% - 150px);
overflow:auto;
padding:15px;
}

.aiUser,
.aiBot{
margin:12px 0;
padding:12px;
border-radius:16px;
max-width:80%;
}

.aiUser{
background:#0A84FF;
margin-left:auto;
}

.aiBot{
background:#2C2C2E;
}

.aiInputBox{
display:flex;
padding:15px;
gap:10px;
}

#aiInput{
flex:1;
padding:15px;
border:none;
border-radius:18px;
}

#sendAI{
padding:15px 25px;
border:none;
border-radius:18px;
background:#0A84FF;
color:white;
}
const andzAIApp=document.getElementById("andzAIApp");

function openAI(){

andzAIApp.style.display="block";

loadChat();

}

closeAI.onclick=()=>{

andzAIApp.style.display="none";

};

function getChat(){

return JSON.parse(

localStorage.getItem(

"andz_ai_chat"

)||"[]"

);

}

function saveChat(list){

localStorage.setItem(

"andz_ai_chat",

JSON.stringify(list)

);

}

function botReply(text){

text=text.toLowerCase();

if(text.includes("xin chào")){

return "Xin chào 👋";

}

if(text.includes("giờ")){

return new Date().toLocaleTimeString();

}

if(text.includes("ngày")){

return new Date().toLocaleDateString("vi-VN");

}

if(text.includes("pin")){

return "Mức pin hiển thị trong Widget Pin.";

}

return "Xin lỗi, mình chưa hiểu câu hỏi đó.";

}

function loadChat(){

aiMessages.innerHTML="";

getChat().forEach(item=>{

aiMessages.innerHTML+=

"<div class='"+item.type+"'>"+

item.text+

"</div>";

});

aiMessages.scrollTop=

aiMessages.scrollHeight;

}

sendAI.onclick=()=>{

const text=aiInput.value.trim();

if(!text)return;

const chat=getChat();

chat.push({

type:"aiUser",

text:text

});

chat.push({

type:"aiBot",

text:botReply(text)

});

saveChat(chat);

aiInput.value="";

loadChat();

showIsland(

"🧠 Andz AI",

"Đã trả lời",

"🤖"

);

};
<script src="js/andzai.js"></script>
// apps.js

const apps = document.querySelectorAll(".app-icon");

apps.forEach(app => {
    app.addEventListener("click", () => {
        const name = app.dataset.app;
        openApp(name);
    });
});

function openApp(name) {
    const windowApp = document.createElement("div");
    windowApp.className = "app-window";

    windowApp.innerHTML = `
        <div class="app-header">
            <span>${name}</span>
            <button onclick="closeApp(this)">×</button>
        </div>
        <div class="app-content">
            <h2>${name}</h2>
            <p>Ứng dụng đang chạy trên AndzOS</p>
        </div>
    `;

    document.body.appendChild(windowApp);
}

function closeApp(btn) {
    btn.parentElement.parentElement.remove();
}
.app-window {
    position: fixed;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 70%;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 30px #0005;
    z-index: 999;
}

.app-header {
    height: 50px;
    background: #222;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.app-header button {
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

.app-content {
    padding: 20px;
}