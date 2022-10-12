const {Client, GatewayIntentBits} = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

var answers = ["soos", "fiif", "mööm", "saas", "smens", "yoy", "coc", "lool"]

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
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

const welcomeChannelId = "427868150516940810"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Hallo! Ich bin Marcel D'Avis, Leiter für Kundenzufriedenheit bei 1&1!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)