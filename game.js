let player = "rick";

let hp = 100;
let allyHp = 100;
let enemyHp = 100;

let rage = 0;
let gold = 0;

let copiedSkill = null;


// Chọn Rick hoặc Morty

function pickPlayer(name){

    player = name;

    let img = document.getElementById("playerImg");
    let title = document.getElementById("playerName");

    if(name=="rick"){

        title.innerHTML="🧪 Rick";
        img.src="assets/rick/normal.png";

    }else{

        title.innerHTML="👦 Morty";
        img.src="assets/morty/normal.png";

    }

}



// Đánh thường

function attack(){

    enemyHp -= 10;

    rage += 15;

    gold += 10;


    enemyAttack();

    allyAttack();

    update();

}



// Skill 1

function skill1(){

    enemyHp -= 20;

    rage +=20;

    enemyAttack();

    update();

}



// Skill 2

function skill2(){

    enemyHp -=30;

    rage +=25;

    enemyAttack();

    update();

}



// Ultimate biến hình

function ultimate(){


if(rage>=100){


rage=0;


if(player=="rick"){

document.getElementById("playerImg").src=
"assets/rick/prime.png";

document.getElementById("playerName").innerHTML=
"🔥 Rick Prime";


enemyHp-=70;


}


else{


document.getElementById("playerImg").src=
"assets/morty/evil.png";


document.getElementById("playerName").innerHTML=
"😈 Evil Morty";


enemyHp-=70;


}


}


else{

alert("Chưa đủ nộ!");

}


enemyAttack();

update();


}



// AI đồng đội

function allyAttack(){

let damage = Math.floor(Math.random()*15)+5;

enemyHp -= damage;

}



// AI địch

function enemyAttack(){

let damage =
Math.floor(Math.random()*12)+5;


hp -= damage;


if(hp<=0){

alert("Bạn thua!");

hp=100;

enemyHp=100;

}


}



// Rick hút DNA

function extractDNA(){


if(player!="rick"){

alert("Chỉ Rick dùng được!");

return;

}


let skills=[

"Gojo - Vô Hạn",

"Goku - Kamehameha",

"Naruto - Rasengan",

"Ben10 - Alien Power"

];


copiedSkill =
skills[Math.floor(Math.random()*skills.length)];


alert(
"Rick đã lấy được kỹ năng: "
+copiedSkill
);


}


// Dùng skill đã lấy

function useDNA(){


if(copiedSkill){

alert(
"Rick dùng: "+copiedSkill
);


enemyHp-=40;


}

else{

alert("Chưa có DNA!");

}


update();

}





function update(){


document.getElementById("enemyHp").style.width=
enemyHp+"%";


document.getElementById("rage").style.width=
rage+"%";


document.getElementById("gold").innerHTML=
gold;


}
let difficulty = "normal";

let stage = 1;


let bosses = [
    {
        name:"🔥 Gojo",
        image:"assets/enemies/gojo.png"
    },

    {
        name:"🐉 Goku",
        image:"assets/enemies/goku.png"
    },

    {
        name:"🍥 Naruto",
        image:"assets/enemies/naruto.png"
    },

    {
        name:"👽 Ben 10",
        image:"assets/enemies/ben10.png"
    }
];
function setDifficulty(mode){

    difficulty = mode;

    alert(
        "Đã chọn chế độ: "
        + mode
    );

}



function nextStage(){

    stage++;

    let boss =
    bosses[
        (stage-1)
        %
        bosses.length
    ];


    document.getElementById("bossName")
    .innerHTML=boss.name;


    document.querySelector(".enemy img")
    .src=boss.image;


    enemyHp=100;


    document.getElementById("stageNumber")
    .innerHTML=stage;


}
let currentSkin = "normal";


let skins = {

rick:{
normal:{
name:"Rick thường",
price:0,
img:"assets/rick/normal.png"
},

battle:{
name:"Battle Rick",
price:500,
img:"assets/rick/battle.png"
},

prime:{
name:"Rick Prime",
price:2000,
img:"assets/rick/prime.png"
}

},


morty:{
normal:{
name:"Morty thường",
price:0,
img:"assets/morty/normal.png"
},

dark:{
name:"Dark Morty",
price:700,
img:"assets/morty/dark.png"
},

evil:{
name:"Evil Morty",
price:2000,
img:"assets/morty/evil.png"
}

}

};
function changeSkin(skin){

let data =
skins[player][skin];


if(!data){

alert("Skin không tồn tại!");

return;

}


if(gold < data.price){

alert(
"Cần "+data.price+" vàng!"
);

return;

}


gold -= data.price;


currentSkin = skin;


document.getElementById("playerImg")
.src=data.img;


document.getElementById("gold")
.innerHTML=gold;


alert(
"Đã trang bị "+data.name
);


}