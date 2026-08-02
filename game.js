let player = "rick";

let hp = 100;
let enemyHp = 100;

let rage = 0;
let gold = 0;


function pickPlayer(name){

    player = name;

    let img = document.getElementById("playerImg");
    let title = document.getElementById("playerName");

    if(name === "rick"){
        title.innerHTML = "🧪 Rick";
        img.src = "assets/rick/normal.png";
    }

    else{
        title.innerHTML = "👦 Morty";
        img.src = "assets/morty/normal.png";
    }

}



function attack(){

    enemyHp -= 10;

    rage += 15;

    gold += 10;


    update();


    if(enemyHp <=0){

        alert("Bạn thắng! + vàng");

        gold += 100;

        enemyHp = 100;

        update();
    }

}



function skill1(){

    enemyHp -= 20;

    rage += 20;

    update();

}



function skill2(){

    enemyHp -= 30;

    rage += 30;

    update();

}




function ultimate(){

    if(rage >=100){

        enemyHp -= 60;

        rage = 0;


        if(player=="rick"){

            document.getElementById("playerImg").src =
            "assets/rick/prime.png";

            document.getElementById("playerName").innerHTML =
            "🔥 Rick Prime";

        }


        else{

            document.getElementById("playerImg").src =
            "assets/morty/evil.png";

            document.getElementById("playerName").innerHTML =
            "😈 Evil Morty";

        }


    }

    else{

        alert("Chưa đủ nộ!");

    }


    update();

}




function update(){


document.getElementById("enemyHp").style.width =
enemyHp+"%";


document.getElementById("rage").style.width =
rage+"%";


document.getElementById("gold").innerHTML =
gold;


}