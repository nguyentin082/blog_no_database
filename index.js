//// IMPORT
import {
    fileURLToPath
} from "url";
import {
    dirname
} from "path";
import express from "express";
import bodyParser from "body-parser";
import {
    log
} from "console";



//// CONSTANTS AND VARIABLES
const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express()
const port = 3000
var allPosts = [{
        topic: "New iPadOS",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        topic: "New watchOS",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    },
    {
        topic: "New macOS",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    }
]

//// USE MIDDLEWARES
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))

//// SET VIEW ENGINE
app.set('view engine', 'ejs');

//// ROUTES
app.get('/', (req, res) => {
    res.render("index", {
        allPosts
    });
});

app.get('/create', (req, res) => {
    res.render("create_post");
});

app.post('/submit', (req, res) => {
    var newPost = {
        topic: req.body["topic"],
        content: req.body["content"],
    }
    allPosts.push(newPost);
    res.redirect("/")
});

app.get('/view/:id', (req, res) => { // Corrected route path
    const id = req.params.id;
    var data = allPosts[id];
    console.log(data);
    res.render("view_post", {
        data
    }); // Passed data as an object
});

// Route for deleting a post
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    // Delete the post with the specified id from the allPosts array
    allPosts.splice(id, 1);
    // Redirect back to the home page or any other appropriate page
    res.redirect("/");
});

// Route for editing a post (just an example, you might need a more complex setup for editing)
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = allPosts[id];
    console.log(post);
    res.render("edit_post", {
        post: post,
        id: id // Pass the post ID
    });
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const updatedPost = {
        topic: req.body.topic,
        content: req.body.content
    };
    // Update the post with the specified id in the allPosts array
    allPosts[id] = updatedPost;

    // Redirect back to the view page for the updated post
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});