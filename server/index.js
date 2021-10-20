// import './db.js';
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const { Sequelize, DataTypes, Model } = require('sequelize');
const models = require('./models');
const Student = require('./models/students');
const PORT = process.env.PORT || 3001;
const router = express.Router();

// var cors = require('cors');
// var corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let forceDB = false

// await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

models.sequelize.sync({ logging: console.log, force: forceDB }).then(result => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  app.get("/students/all", (req, res) => {
    models.students.findAll().then(data => {
      res.json({ message: "Hello from server!!!", data: data });
    });
  });

  app.get("/modules/all", (req, res) => {
    models.modules.findAll().then(data => {
      res.json({ message: "Hello from server!!!", data: data });
    });
  });

  app.get("/parents/all", async (req, res) => {
    // await setTimeout(() => {
    //   console.log('bum');
    //   models.parents.findAll().then(data => {
    //     res.json({ message: "Hello from server!!!", data: data });
    //   });
    // }, 2000);

    //good somehow
    // await new Promise(resolve => setTimeout(() => {
    //   models.parents.findAll().then(data => {
    //     res.json({ message: "Hello from server!!!", data: data });
    //   })
    // }, 5000));

    await models.parents.findAll().then(parents => {
      for await (const parent of parent) {
        var students = await models.sequelize.query(`SELECT * FROM students s LEFT JOIN parentStudents ps ON s.id = ps.studentId where ps.parentId =${parent['dataValues']['id']}`);
        parent['dataValues']['students'] = students;
      }

      res.json({ message: "Hello from server!!!", data: parents });
      // res.json({ message: "Hello from server!!!", data: data });
    })




    // async function test() {
    //   await setTimeout(() => {
    //     return '-----test';
    //   }, 5000);
    // }

    // test().then(data => {
    //   console.log(data);
    //   models.parents.findAll().then(data => {
    //     res.json({ message: "Hello from server!!!", data: data });
    //   });
    // });



    // let test = await setTimeout(() => {
    //   console.log('bum')
    // }, 5000);

    // test.then(val => {
    //   models.parents.findAll().then(data => {
    //     res.json({ message: "Hello from server!!!", data: data });
    //   });
    // })

  });

  // app.get("/parents/all", (req, res) => {
  //   // models.parents.findAll({
  //   //   // include: [models.students]
  //   // }).then(data => {
  //   //   res.json({ message: "Hello from server!!!", data: data });
  //   // });

  //   var dataToSend;


  //   models.parents.findAll({
  //     // include: [{
  //     //   model: models.students,
  //     //   where: { id: models.parentStudents.studentId }
  //     // }]
  //   }).then(async data => {
  //     dataToSend = data;
  //     dataToSend.forEach(ele => {
  //       // let prom = new Promise((resolve, reject) => {
  //       //   var students = models.sequelize.query(`SELECT * FROM students s LEFT JOIN parentStudents ps ON s.id = ps.studentId where ps.parentId =${ele['dataValues']['id']}`);
  //       //   resolve(students);
  //       // });

  //       var students = models.sequelize.query(`SELECT * FROM students s LEFT JOIN parentStudents ps ON s.id = ps.studentId where ps.parentId =${ele['dataValues']['id']}`);
  //       ele['dataValues']['students'] = students;
  //       ele['dataValues']['test'] = 'muie';
  //       // prom.then(students => {
  //       //   // console.log('--', students);
  //       //   ele['dataValues']['students'] = students;
  //       //   ele['dataValues']['test'] = 'muie';
  //       // })
  //     });

  //     return dataToSend;
  //   }).then(data => {
  //     console.log('--someData', dataToSend)
  //   });
  //   res.json({ message: "Hello from server!!!", data: dataToSend });
  // });

  app.get("/professors/all", (req, res) => {
    models.professors.findAll().then(data => {
      res.json({ message: "Hello from server!!!", data: data });
    });
  });


  //ADD
  app.post("/student/add", (req, res) => {
    console.log('/student/add req.body: ', req.body);
    models.students.build(req.body).save();
    res.send('Student inserted');
  });

  app.post("/parent/add", (req, res) => {
    console.log('/parents/add req.body: ', req.body);
    models.parents.build(req.body).save();
    res.send('Student inserted');
  });

  app.post("/professor/add", (req, res) => {
    console.log('/professor/add req.body: ', req.body);
    models.professors.build(req.body).save();
    res.send('Student inserted');
  });

  app.post("/module/add", (req, res) => {
    console.log('/module/add req.body: ', req.body);
    models.modules.build(req.body).save();
    res.send('Module inserted');
  });

  app.post("/course/add", (req, res) => {
    console.log('/courses/add req.body: ', req.body);
    models.courses.build(req.body).save();
    res.send('Course inserted');
  });

  app.post("/course-module/add", (req, res) => {
    console.log('/course-modules/add req.body: ', req.body);
    models.courseModules.build(req.body).save();
    res.send('courses-modules inserted');
  });


  app.post("/parent-student/add", (req, res) => {
    console.log('/parent/add req.body: ', req.body);
    models.parentStudents.build(req.body).save();
    res.send('courses-modules inserted');
  });





  //DELETE
  app.post("/module/delete", (req, res) => {
    console.log('/module/delete:', req.body);
    models.modules.destroy({ where: { id: req.body.id } });
    res.send('Module deleted');
  });

  app.post("/student/delete", (req, res) => {
    console.log('/student/delete:', req.body);
    models.students.destroy({ where: { id: req.body.id } });
    res.send('Student deleted');
  });

  app.post("/parent/delete", (req, res) => {
    console.log('/parent/delete:', req.body);
    models.parents.destroy({ where: { id: req.body.id } });
    res.send('Parent deleted');
  });

  app.post("/professor/delete", (req, res) => {
    console.log('/professor/delete:', req.body);
    models.professors.destroy({ where: { id: req.body.id } });
    res.send('Parent deleted');
  });


  //EDIT
  app.post("/student/edit", (req, res) => {
    console.log("/student/edit body:", req.body);
    models.students.update({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'UID': req.body.UID,
      'email': req.body.email,
      'phone': req.body.phone,
      'school': req.body.school,
      'class': req.body.class,
      'dateOfBirth': req.body.dateOfBirth,
    }, { where: { id: req.body.id } });
    res.send("Edit student");
  });


  app.post("/professor/edit", (req, res) => {
    console.log("/professor/edit body:", req.body);
    models.professors.update({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'UID': req.body.UID,
      'email': req.body.email,
      'phone': req.body.phone,
      'school': req.body.school,
      'dateOfBirth': req.body.dateOfBirth,
    }, { where: { id: req.body.id } });
    res.send("Edit student");
  });

  app.post("/parent/edit", (req, res) => {
    console.log("/parent/edit body:", req.body);
    models.parents.update({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'UID': req.body.UID,
      'email': req.body.email,
      'phone': req.body.phone,
      'dateOfBirth': req.body.dateOfBirth,
    }, { where: { id: req.body.id } });
    res.send("Edit student");
  });

  app.post("/module/edit", (req, res) => {
    console.log("/module/edit body:", req.body);
    models.modules.update({
      'name': req.body.name,
      'type': req.body.type,
      'price': req.body.price,
      'notes': req.body.notes,
    }, { where: { id: req.body.id } });
    res.send("Edit student");
  });

  app.use('/', router);

}).catch(err => {
  console.log(err);
});

// await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');


