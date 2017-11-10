/**
 * Created by NeiroMendez on 10/26/17.
 */
let fs = require('fs');
let array = fs.readFileSync('input copy.txt').toString().split("\n");
let arr = [];
let time = new Date();

console.log(time);

for (let i = 1; i < array.length; i++) {
    value = array[i].split(" ");
    for (let j of value)
        arr.push(j);
}

console.log(array);

for (let i = 1; i < arr.length; i += (parseInt(arr[i]) + 3) - 1) {
    let pit = (parseInt(arr[i]) + 2);

    let money = [];

    for (let j = i + 1; j < pit + i - 1; j++)
        money.push(arr[j]);

    interchange(parseInt(arr[i - 1]), money, pit - 2);
}

function interchange(amount, money) {
    let arrResult = [];

    for (let i = 1; i <= amount; i++) {
        if (i == 83)
            console.log("here", i);
        arrResult.push(recursiva(i, money));
    }
    //console.log(arrResult);
    console.log("average: " + average(arrResult) + " More Interchange: " + usage(arrResult));
}

function getMoney(money, amount) {
    let value = 0;
    let moneyToUse = 0, moneyToUse2 = 0;
    let backup = 0, backup2;
    let arr = [];
    let i = 0;
    let up = (amount * amount) * 100;
    let up2 = 0;
    let down = (amount * amount) * -100;
    let down2 = 0;
    let flag = false;

    for (i = 0; i < money.length; i++) {
        if (money[i] / amount < 2) {
            value = money[i] / amount;

            if (value * 100 == 100) {
                moneyToUse = money[i];
                flag = true;
                break;
            }

            if (value * 100 > down && value * 100 < 100) {
                down2 = down;
                down = value * 100;
            }

            if (value * 100 < up && value * 100 > 100)
                up = value * 100;
        }
    }
    if (!flag) {
        for (let i = 0; i < money.length; i++) {
            if ((money[i] / amount) * 100 == down)
                backup = money[i];
            if ((money[i] / amount) * 100 == up)
                moneyToUse = money[i];
            if (up == (amount * amount) * 100)
                if ((money[i] / amount) * 100 == down2)
                    moneyToUse = money[i];
        }

        if (backup != moneyToUse && backup != 0 && moneyToUse != 0)
            arr.push(backup, moneyToUse);
        else if (backup != moneyToUse && backup == 0 && moneyToUse != 0)
            arr.push(moneyToUse);
        else if (backup != moneyToUse && backup != 0 && moneyToUse == 0)
            arr.push(backup);
    }
    else
        arr.push(moneyToUse);


    return arr;
}

function recursiva(amount, money) {
    let res = 0;
    let min = (amount * amount) * money[money.length - 1];
    let wallet = getMoney(money, amount);
    let wallet2 = getvuelto(money, amount);
    //TODO: meta ejercicio 3 alcanzar 2.85 monto 47 y 83
    for (let i = 0; i < wallet.length; i++) {
        if (parseInt(wallet[i]) != 0) {
            res = pago(amount, parseInt(wallet[i]), money, 1);
            if (res < min)
                min = res;
        }
    }
    for (let i = 0; i < wallet.length; i++) {
        if (parseInt(wallet2[i]) != 0) {
            res = pago2(amount, parseInt(wallet2[i]), money, 1);
            if (res < min)
                min = res;
        }
    }

    for (let i = 0; i < wallet2.length; i++) {
        res = vuelto2(amount, parseInt(wallet2[i]), money, 1);
        if (res < min)
            min = res;
    }
    for (let i = 0; i < money.length; i++) {
        if (money[i] > amount) {
            res = vuelto(amount, parseInt(money[i]), money, 1);
            if (res < min)
                min = res;
        }
    }

    for(let i = 0; i < money.length; i++){
        if(money[i]< amount){
            res = vuelto(amount, parseInt(money[i]), money, 1);
            if (res < min)
                min = res;
        }
    }


    return min;
}

function pago(amount, moneyUse, money, cont) {
    if (moneyUse - amount == 0)
        return cont;

    if (moneyUse > amount)
        return vuelto(amount, moneyUse, money, cont);

    let res;
    let min = (amount * amount) * money[money.length - 1];
    let wallet = getMoney(money, Math.abs(amount - moneyUse));

    for (let i = 0; i < wallet.length; i++) {
        res = pago(amount, moneyUse + parseInt(wallet[i]), money, cont + 1);
        if (res < min)
            min = res;
    }
    return min;
}

function pago2(amount,moneyUse,money,cont) {
    if (moneyUse - amount == 0)
        return cont;

    if (moneyUse > amount)
        return vuelto(amount, moneyUse, money, cont);

    let res;
    let min = (amount * amount) * money[money.length - 1];
    let wallet = getvuelto(money, amount);

    for (let i = 0; i < wallet.length; i++) {
        res = pago(amount, moneyUse + parseInt(wallet[i]), money, cont + 1);
        if (res < min)
            min = res;
    }
    return min;
}
function vuelto(amount, res, money, cont) {
    if (res - amount == 0)
        return cont;
    if (res - amount < 0)
        return pago(Math.abs(res - amount), 0, money, cont);

    let wallet = getMoney(money, res - amount);
    let resta;
    let min = (amount * amount) * money[money.length - 1];

    for (let i = 0; i < wallet.length; i++) {
        resta = vuelto(amount, res - parseInt(wallet[i]), money, cont + 1);
        if (resta < min)
            min = resta;
    }
    return min;
}

function vuelto2(amount, res, money, cont) {
    if (res - amount == 0)
        return cont;
    if (res - amount < 0)
        return pago(Math.abs(res - amount), 0, money, cont);

    let wallet = getvuelto(money, res);

    let resta;
    let min = (amount * amount) * money[money.length - 1];

    for (let i = 0; i < wallet.length; i++) {
        resta = vuelto(amount, res - parseInt(wallet[i]), money, cont + 1);
        if (resta < min)
            min = resta;
    }
    return min;
}

function getvuelto(money, amount) {
    let value = 0;
    let moneyToUse = 0;
    let backup = 0, backup2;
    let arr = [];
    let i = 0;
    let up = (amount * amount) * 100;
    let down = (amount * amount) * -100;
    let down2 = 0;

    for (let i = 0; i < money[i]; i++) {
        value = (money[i] / amount) * 100;

        if (value > down && value < 100) {
            down2 = down;
            down = value;
        }

        if (value < up && value > 100)
            up = value;
    }

    for (let i = 0; i < money.length; i++) {
        if ((money[i] / amount) * 100 == down)
            backup = money[i];
        if ((money[i] / amount) * 100 == up)
            moneyToUse = money[i];
        if ((money[i] / amount) * 100 == down2)
            backup2 = money[i];
    }

    if (backup != moneyToUse && backup != 0 && moneyToUse != 0)
        arr.push(backup, moneyToUse);
    else if (backup != moneyToUse && backup == 0 && moneyToUse != 0)
        arr.push(moneyToUse);
    else if (backup != moneyToUse && backup != 0 && moneyToUse == 0)
        arr.push(backup);

    if (backup2 != backup && backup2 != 0)
        arr.push(backup2);

    return arr;
}

function average(array) {
    let acum = 0;

    for (let i = 0; i < array.length; i++)
        acum += array[i];

    return acum / array.length;
}

function usage(array) {
    let max = 0;

    for (let i = 0, len = array.length; i < len; i++)
        if (max < array[i])
            max = array[i];

    return max;
}

console.log(new Date());