const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const add_role = (memberID, roleName) => {
    let guild = client.guilds.cache.find(guild => guild.id === process.env.GUILD_ID);
    let member = guild.members.cache.find(member => member.id === memberID);
    let role = guild.roles.cache.find(role => role.name === roleName);
    member.roles.add(role);
}

const remove_role = (memberID, roleName) => {
    let guild = client.guilds.cache.find(guild => guild.id === process.env.GUILD_ID);
    let member = guild.members.cache.find(member => member.id === memberID);
    let role = guild.roles.cache.find(role => role.name === roleName);
    member.roles.remove(role);
}

client.once('ready', () => {
	console.log('Ping Pong Bot Loaded!');
});

client.login(process.env.BOT_TOKEN);

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