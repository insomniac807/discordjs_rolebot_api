const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.login(process.env.BOT_TOKEN);

async function add_role(memberID, roleName) {
    let guild = client.guilds.cache.find(guild => guild.id === process.env.GUILD_ID);
    console.log(`Guild: ${guild}`);
    await guild.members.fetch(memberID)
    .then(member => { 
        console.log(`Member: ${member}`);
        let role = guild.roles.cache.find(role => role.name === roleName);
        member.roles.add(role);
    })
    .catch((error) => {
        console.log(error);
    });
}

async function remove_role(memberID, roleName) {
    let guild = client.guilds.cache.find(guild => guild.id === process.env.GUILD_ID);
    console.log(`Guild: ${guild}`);
    await guild.members.fetch(memberID)
    .then(member => { 
        console.log(`Member: ${member}`);
        let role = guild.roles.cache.find(role => role.name === roleName);
        member.roles.remove(role);
    })
    .catch((error) => {
        console.log(error);
    });
}

client.once('ready', () => {
	console.log('Bot Loaded!');
});


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req,res) => {
    res.send('Hello World!!!');
})

app.post('/add_role', (req, res) => {
    add_role(req.body.userID, req.body.roleName);
    res.sendStatus(200);
})

app.post('/remove_role', (req, res) => {
    remove_role(req.body.userID, req.body.roleName);
    res.sendStatus(200);
    
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})