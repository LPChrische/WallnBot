const {Client, GatewayIntentBits} = require("discord.js")

const TOKEN = "MTAyOTg1OTYxNDc1OTU4NzkyMQ.GXRaUl.rHxWRDOijI3CkYcZijFiQQCviFG373a22gB5ZA"

var answers = ["soos", "fiif", "mööm", "saas", "smens", "yoy", "coc", "lool"]

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", message => {
    if (message.content == "smums" || 
            message.content == "fiif" || 
            message.content == "mööm" || 
            message.content == "yoy" || 
            message.content == "coc" || 
            message.content == "lool" || 
            message.content == "smens" ||
            message.content == "soos") {
        
        var answer = answers[Math.floor(Math.random()*answers.length)]
        message.reply(answer)
    }
})

client.login(TOKEN)