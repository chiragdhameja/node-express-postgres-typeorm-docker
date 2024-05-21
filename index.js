const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

// array of courses
const courses = [
  { id: 1, name: "c1" },
  { id: 2, name: "c2" },
  { id: 3, name: "c3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// GET: list all present courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// GET: find course by id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  // GET: if course not present:
  if (!course)
    res
      .status(404)
      .send(`STATUS: 404 The course with the given id was not found`);

  // when course is present:
  res.send(course);
});

// POST: adding a course to the array
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(2).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Listen on a env PORT or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
