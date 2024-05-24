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
  const { error } = validateCourse(req.body);
  // if invalid, 400 (Bad Req)
  if (error) {
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

app.put("/api/courses/:id", (req, res) => {
  // lookup
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  // if not existing, 404 (not found)
  if (!course)
    res
      .status(404)
      .send(`STATUS: 404 The course with the given id was not found`);

  // validate
  const { error } = validateCourse(req.body);
  // if invalid, 400 (Bad Req)
  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Found!, update it
  course.name = req.body.name;
  // Return updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(2).required(),
  };

  return Joi.validate(course, schema);
}

// Listen on a env PORT or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
