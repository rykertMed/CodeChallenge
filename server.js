
var express = require("express");

var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var distDir = __dirname + "/dist/code-challenge/";
app.use(express.static(distDir));

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

const mbiTemplate = [{type: 'C' }, {type: 'A' }, {type: 'AN' }, {type: 'N' }, {type: '-'}, {type: 'A' }, {type: 'AN' }, {type: 'N' }, {type: '-'}, {type: 'A' }, {type: 'A' }, {type: 'N' }, {type: 'N' }]

const randomChar = function (type) {
    if (type.indexOf('-') > -1) return '-';

    var mask = '';
    if (type.indexOf('C') > -1) mask += '123456789';
    if (type.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (type.indexOf('N') > -1) mask += '0123456789';

    return mask[Math.round(Math.random() * (mask.length - 1))];
}

const generateMBI = function(){
    var mbi = '';

    mbiTemplate.forEach(function(obj) {
        mbi += randomChar(obj.type);
    });

    return mbi;
}

const verifyPosition = function(char, position){
    const mbiType = mbiTemplate[position].type;

    var mask = '';
    if (mbiType.indexOf('C') > -1) mask += '123456789';
    if (mbiType.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (mbiType.indexOf('N') > -1) mask += '0123456789';

    return mask.indexOf(char) > -1;
}

const verifyMbi = function(mbi){
    if(!mbi){
        return false;
    }
    
    for(let i in mbi){
        if(mbi[i] === '-'){
            continue;
        }

        if(!verifyPosition(mbi[i], i))
        {
            console.log(mbi[i], i);
            return false;
        }
    }

    return true;
}

app.get('/api/generate', function(req, res) {
    res.status(200).json({ mbi: generateMBI() });
});

app.post('/api/verify', function(req, res){
    console.log('verify post->', req.body);
    var result = verifyMbi(req.body.mbiObj.mbi.toUpperCase());

    res.status(200).json({ result });
});