
const irc = require('irc');
const request = require('request');
const fs = require('fs')
const youtube = require('scrape-youtube').youtube;
let Parser = require('rss-parser');
let parser = new Parser();

var client = new irc.Client('irc.segured.org', 'TheForce_Bot', {
    userName: 'ForceBot',
    realName: 'LukeSkywalker NodeJS Bot',
    channels: ['#dev_team', '#asdasd'],
    port: 6667
});
client.addListener('registered', function () {
    client.say('nickserv', 'identify ' + "TheForce*");
})

client.addListener('error', function (message) {
    //console.log('error: ', message);
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    var msg = message.split(' ');
    var fro = from.toString();

    if (msg.length > 1) {
        if (msg[0] == '!covid' && msg[1].toUpperCase() == 'CUB') {
            getCovidCuba(fro, msg[1]);
        } else if (msg[0] == '!frase') {
            decirFrase(to, fro, msg[1]);
        } else if (msg[0] == '!piropo') {
            decirPiropo(to, fro, msg[1]);
        } else if (msg[0] == '!insulto') {
            decirInsulto(to, fro, msg[1]);
        }
        else if (msg[0] == '!youtube!!!!!!!') {
            searchYoutube(msg[1], fro);
        }
        else if (msg[0] == '!news!!!!') {
            updateNews(fro);
        }
        else {

        }
    } else {
        if (message == '!frase') {
            decirFraseR(to, from)
        } else if (message == '!help') {
            client.say(to, from + ' :' + "Puede probar los siguientes comandos !covid CUB, !frase, !frase Nick, !insulto Nick, !piropo Nick");
        } else {

        }
    }



});

function getCovidCuba(test, country) {
    var resultado;
    request('https://covidapi.info/api/v1/country/' + country.toString().toUpperCase() + '/latest', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        resultado = ("En " + country + " hay:" + "Casos Confirmados: " + body.result['2020-05-01'].confirmed + " Muertes: " + body.result['2020-05-01'].deaths + " Casos Recuperados: " + body.result['2020-05-01'].recovered)
        client.say(test, resultado);
    });
    console.log(country);
    return resultado;
}
function getClima() {
    request('api.openweathermap.org/data/2.5/weather?q=CUBA&appid=f14debd3577be84250b8573264d13e4c', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // resultado = ("En " + country + " hay:" + "Casos Confirmados: " + body.result['2020-04-30'].confirmed + " Muertes: " + body.result['2020-04-30'].deaths + " Casos Recuperados: " + body.result['2020-04-30'].recovered)
        client.say(test, resultado);
    });
    console.log(country);
}
function decirFraseR(to, from) {
    fs.readFile('chorras/frases.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.toString('utf8');
        data = data.split('\n');
        console.log(data);
        var aleatorio = Math.round(Math.random() * data.length);
        client.say(to, from + ':' + data[aleatorio]);
    });
}
function decirFrase(to, from, mess) {
    fs.readFile('chorras/frases.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.toString('utf8');
        data = data.split('\n');
        console.log(data);
        var aleatorio = Math.round(Math.random() * data.length);
        client.say(to, mess + " ," + from + " le dedica esta fráse: " + data[aleatorio]);

    });
}
function decirPiropo(to, from, mess) {
    fs.readFile('chorras/pirospos.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.toString('utf8');
        data = data.split('\n');
        console.log(data);
        var aleatorio = Math.round(Math.random() * data.length);
        client.say(to, mess + " ," + from + " le dedica este hermoso piropo: " + data[aleatorio]);

    });
}
function decirInsulto(to, from, mess) {
    fs.readFile('chorras/insultos.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.toString('utf8');
        data = data.split('\n');
        console.log(data);
        var aleatorio = Math.round(Math.random() * data.length);
        client.say(to, mess + " ," + data[aleatorio]);
    });
}
function updateNews(fro) {
    var title;
    var from = fro;
    (async () => {

        let feed = await parser.parseURL('http://www.cubadebate.cu/feed');
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(item.title + ' : ' + item.link)
            sleep(2000);
            title = item.title;
            sayNew(item.title,from);
        });

    })();


}
function sayNew(params,from) {

    client.say(from, params);
}

function searchYoutube(string, fro) {
    youtube.searchOne(string).then(results => {
        client.say(fro, results["title"] + " " + results["link"] + " - " + results["duration"] + " segs");
        //console.log(re
    });
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function flipCoin(params) {
    var coin = {
        '0': 'cruz',
        '1': 'cara'
    }
    var aleatorio = Mat.round
}
