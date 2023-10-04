const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/weather", (req, res) => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const data = {
        day:day,
        today_date: formattedDate
    };
    res.render('weather', data);
});

app.get("*", (req, res) => {
    res.render('404error',{
        errorMsg:"Opps! Page Not Found"
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
