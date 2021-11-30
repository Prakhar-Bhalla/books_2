const express = require("express");

const app = express();

let books = require("./books.json");

app.use(express.json());

function addUser(req, res, next) {
    const originalSendFunc = res.send.bind(res);
    res.send = function(body) {
    body.api_requested_by = "Prakhar Bhalla";
    return originalSendFunc(body);
  };
    next();
}

app.use(addUser);

app.get("/", (req, res) => {
    res.send({books});
});

app.post("/books", (req, res) => {
    books = [...books, req.body];
    res.send({books});
})

app.get("/books/:id", (req, res) => {
    const book = books.filter((b) => {
        return req.params.id == b.id;
    })
    res.send({book});
});

app.delete("/books/:id", (req, res) => {
    books = books.filter((b) => {
        return req.params.id != b.id;
    })
    res.send({books});
});

app.patch("/books/:id", (req, res) => {
    books = books.map((b) => {
        if(req.params.id == b.id)
        {
            if(req?.body?.author)
            b.author = req?.body?.author;
            if(req?.body?.book)
            b.book = req?.body?.book;
            if(req?.body?.pages)
            b.pages = req?.body?.pages;
            if(req?.body?.year)
            b.year = req?.body?.year;
        }
        return b;
    })
    res.send({books});
})

app.listen(2345, function() {
    console.log("listening port 2345");
});