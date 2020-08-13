const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(cors());
app.use(bodyParser.json());

const dummyDb = {
    subscription: null
};

const publicVapidKey = 'BO2o-qUJJEbSYGL7BcPlHAtEU0cPdW5OGrAJcm-swR4GYZl6_OK7lFGrQaHXtQtlHMG6V5f72hU_ug6kg4A_voo';
const privateVapidKey = 'glgPrZhddpbdw-1R2T4ju7a3QCJCxORIUZS5fXPYQHI';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.get('/', async (req, res) => {
    res.send('Hello world!');
})

app.post('/subscribe', async (req, res) => {
    const subscribe = req.body;
    dummyDb.subscription = subscribe;
    console.log('Veri geldi!');
});

app.get('/send', async (req, res) => {
    const notificationPayload = {
        notification: {
            title: 'HTML ve CSS uyumu nasıl olmalı?',
            body: 'Olcay Usta, sorunuza yanıt verdi',
            actions: [
                {action: 'like', title: '👍Like'},
                {action: 'reply', title: '⤻ Reply'}],
            icon: 'https://images.pexels.com/users/avatars/54196/madison-inouye-304.jpeg?w=256&h=256&fit=crop&crop=faces'
        }
    };
    webpush.sendNotification(dummyDb.subscription, JSON.stringify(notificationPayload)).then(value => {
        res.send('Message sended!');
    }).catch(err => console.log(err));
});



app.listen(5000);
