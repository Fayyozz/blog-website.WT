const express = require("express");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/create", (req, res) => {
    res.render("create")
})

app.get("/blogs", (req, res) => {
    res.render("blogs", {blogs: blogs})
})

app.get("/blogs/detail", (req, res) => {
    res.render("detail")
})

const blogs = ["sfgsdfg ", "dfshethaet"]

app.listen(3000, err => {
    if (err) console.log(err);

    console.log("serser is running on port 3000...");
})

