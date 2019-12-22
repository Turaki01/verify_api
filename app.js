const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [{
        id: 1,
        bvn: 25064501456,
        fullName: "Turaki Ezekiel",
        dateOfBirth: "02-08-1960",
        phoneNumber: 08160451781
    },
    {
        id: 2,
        bvn: 25064231456,
        fullName: "Henry Okonkwo",
        dateOfBirth: "12-02-1965",
        phoneNumber: 08060454581
    }
]

app.get('/', (req, res) => {
    res.send('Verify User')
});


app.get('/api/users', (req, res) => {
    res.send(users)
});


// Post request for users
app.post('/api/users', (req, res) => {

    // console.log(req.body);
    const { fullName, dateOfBirth, phoneNumber, bvn, id } = req.body;
    const user = {
        id: id,
        bvn: bvn,
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber
    }

    const result = users.filter((obj) => {
        return user.id == obj.id || user.bvn == obj.bvn || user.fullName == obj.fullName || user.dateOfBirth == obj.dateOfBirth || user.phoneNumber == obj.phoneNumber;
    });

    if (result.length == 0) {
        res.json({ msg: 'User not found' })
    } else {
        res.json({ msg: result })
    }
    // console.log(req.body);
    // const { error } = validateUser(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // const user = {
    //     id: users.length + 1,
    //     bvn: req.body.bvn,
    //     fullName: req.body.fullName,
    //     dateOfBirth: req.body.dateOfBirth,
    //     phoneNumber: req.body.phoneNumber
    // };
    users.push(user);
    res.send(users);
});




// updating users
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with the given ID was not found');

    const { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // update the user
    user.bvn = req.body.bvn;
    user.fullName = req.body.fullName;
    user.dateOfBirth = req.body.dateOfBirth;
    user.phoneNumber = req.body.phoneNumber;

    res.send(user);
});

// fetching user via ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with the given ID was not found');
    res.send(user);
});

// delete request
app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with the given ID was not found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});


// valid user function
function validateUser(user) {
    const schema = {
        bvn: Joi.number().min(11).required(),
        fullName: Joi.string().min(5).required(),
        dateOfBirth: Joi.string().min(8).required(),
        phoneNumber: Joi.number().min(11).required()
    };

    return Joi.validate(user, schema);
};



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));