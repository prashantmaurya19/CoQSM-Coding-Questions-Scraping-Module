import TinyDB from "tinydb";

const db = new TinyDB('./data/test_progress.db');
db.onReady = function () {
    console.log('database is ready for operating');

    // set info to DB
    db.setInfo('title', 'Test DB', function (err, key, value) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('[setInfo] ' + key + ' : ' + value);
    });

    // get info from DB
    db.getInfo('title', function (err, key, value) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('[getInfo] ' + key + ' : ' + value);
    });

    // do other things below
    db.forEach(function (err, item) {
        if (err) {
            console.log(err);
            return;
        }

        for (var key in item) {
            console.log(key + ' : ' + item[key]);
        }
    });

    // db.appendItem({s:'testing'},(a)=>{
    //     console.log(a);
    // })
    db.find({ s: "testing" }, (a) => {
        console.log(a);
    })
    db.findById('e60141e4-f90f-4c16-87b3-511094d4dd06',(a)=>{
        console.log(a);
    });
}


