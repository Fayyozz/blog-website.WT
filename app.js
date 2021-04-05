const { urlencoded } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({extended: false}))
app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/create", (req, res) => {
    res.render("create")   
})

app.post("/create", (req, postRes) => {
    const title = req.body.title;
    const blogBody = req.body.blogBody;

    if (title.trim() === "" && blogBody.trim() === "") {
        postRes.render("create", {error: true})
    } else {
        fs.readFile("./data/blogs.json", (err, data) => {
            if (err) throw err;

            const blogsData = JSON.parse(data);

            blogsData.push({
                id: id(),
                title: title,
                blogBody: blogBody
            })

            fs.writeFile("./data/blogs.json", JSON.stringify(blogsData), (err) => {
                if (err) throw err

                postRes.render("create", {success: true})
            })
        })
    }
})


app.get("/blogs", (req, res) => {
    fs.readFile("./data/blogs.json", (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data)

        res.render("blogs", {blogs: blogs})
    })

   
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile("./data/blogs.json", (err, data) => {
        if (err) throw err

        const blogs = JSON.parse(data)

        const blog = blogs.filter(blog => blog.id == id)[0]

        res.render("detail",  {blog: blog} )

    })

})


app.listen(3000, err => {
    if (err) console.log(err);

    console.log("server is running on port 3000...");
})

function id () {
    return "_" + Math.random().toString(36).substr(2, 9);
}

