const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.static(__dirname + "/../frontend"))
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.get('/', function (req, res) {
    console.log("girdi")
    fs.readFile(__dirname + '/../frontend/index.html', 'utf8', function (err, data) {
        if (err) {
            throw new Error("HATA", err)
        } else {

            res.send(data)
            res.end("")
        }
    })
})
app.post('/add', function (req, res) {
    console.log("post geldi")
    ekle(req.body)
    // fs.appendFile('mynewfile1.txt', 'Hello content!', "utf8", function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
    fs.readFile(__dirname + '/../frontend/addNewComponent.html', 'utf8', function (err, data) {
        if (err) {
            throw new Error("HATA", err)
        } else {
            var x = "<script>alert('İşlem onaylandı')</script>"
            res.write(data + x)

            res.end("")
        }
    })
})
app.post('/delete', function (req, res) {
    console.log("delete post geldi")
    console.log(req.body.Id)
    sil(req.body.Id)
    res.end("")
})


app.get('/addNewComponent', function (req, res) {
    fs.readFile(__dirname + '/../frontend/addNewComponent.html', 'utf8', function (err, data) {
        if (err) {
            throw new Error("HATA", err)
        } else {
            res.send(data)
            res.end("")
        }
    })
})

app.get('/editor', function (req, res) {
    fs.readFile(__dirname + '/../frontend/editor.html', 'utf8', function (err, data) {
        if (err) {
            throw new Error("HATA", err)
        } else {
            res.send(data)
            res.end("")
        }
    })
})



app.listen(80, function () {
    console.log("listening on port 80")

})


function ekle(data1) {
    var x = new Promise(function (resolve, reject) {
        fs.readFile("__dirname + /../frontend/components.json", "utf8", function (err, data) {
            console.log(__dirname)
            resolve(JSON.parse(data));
            reject(err);
        })
    })
    x.then((response) => {
        var lastId = response[response.length - 1].id;

        if (false) {
            console.error("boş post geldi")
        } else {
            console.error(data1)
            data1.id = lastId + 1;
            response.push(data1)
            write(response)
        }

    }).catch((err) => console.log("hata", err))

    function write(deger) {
        fs.writeFile(__dirname + '/../frontend/components.json', JSON.stringify(deger), "utf8", function (err, data) {})
    }
}

function sil(data1) {
    var x = new Promise(function (resolve, reject) {
        fs.readFile(__dirname + "/../frontend/components.json", "utf8", function (err, data) {
            resolve(JSON.parse(data));
            reject(err);
        })
    })
    x.then((response) => {
        // var lastId = response[response.length - 1].id;

        if (data1 == 0) {
            console.error("ilk değer silinmez")
        } else {
            var deleted = response.find(element => element.id == data1)
            var indexNumber = response.indexOf(deleted)
            response.splice((indexNumber), 1);
            write(response)
        }

    }).catch((err) => console.log(err))

    function write(deger) {
        fs.writeFile(__dirname + '/../frontend/components.json', JSON.stringify(deger), "utf8", function (err, data) {})
    }
}