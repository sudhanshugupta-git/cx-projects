const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json')
const app = express();

app.get('/users', (req, res)=>{
    const html = `
        <ul>
            ${users.map((user)=>{
                return `<li>${user.first_name}</li>`
            }).join("")}
        </ul>
    `;
    res.send(html);
})

app.get('/api/users', (req, res)=>{
    return res.json(users);
})

// app.get('/api/users/:id', (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id = id);

//     return res.json(user);
// })

app.route('/api/users/:id')
    .get((req, res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id = id);
    
        return res.json(user);
    })
    .patch((req, res)=>{
        // not implemented
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id = id);
    
        return res.json({status: "pending"});
    })
    .delete((req, res)=>{
        // not implemented
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id = id);
        return res.json({status: "pending"});
    })

app.use(express.urlencoded({extended:true}));
app.post('/api/users', (req, res)=>{
    const user = req.body;
    console.log(user);
    users.push({...user,id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.json({status:"success", id:user.length});
    });
})


const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server is listening at port: ${PORT}`);
})