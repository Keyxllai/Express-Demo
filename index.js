const express = require('express');
const joi = require('joi');

const app = new express();

app.use(express.json());

const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
];

app.get('/', (req, res) => {
    res.send('Hello World...');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(i => i.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`the course with id ${req.params.id} not found.`)
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // validation
    let { error } = validateCourse(req.body); //validResult.error
    if (error) return res.status(400).send(error.details[0].message);

    // Biz logic
    let course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(i => i.id === parseInt(req.params.id));
    if (!course) {
        res.status(404);
        res.send(`the course with id ${req.params.id} not found.`)
    }

    let { error } = validateCourse(req.body); //validResult.error
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);

});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/emails/:year/:month', (req, res) => {
    res.send(req.query);
});

function validateCourse(course) {
    var schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express listen on ${port}...`));