import express from 'express';
import cors from 'cors';
import fs from  'fs';

const app = express();
app.use(cors());
app.use(express.json());
let list  = [];

app.get('/', (req, res) => {
    let items = fs.readFileSync('list.txt', 'utf8');
    list = items.split('\n');
    for(let item in list) list[item] = list[item].replace('\r', '');
    res.send({list});
});

app.post('/set', (req, res) => {
    list = req.body.list;
    console.log(req.body);
    fs.writeFileSync('list.txt', list.join('\n'));
    res.status(200).send();
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})