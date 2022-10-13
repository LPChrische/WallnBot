const {Client, GatewayIntentBits} = require("discord.js")
const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites
    ]
})

client.login(process.env.TOKEN)


var answers = ["soos", "fiif", "mööm", "saas", "smens", "yoy", "coc", "lool"]
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

let bot = {
    client,
    prefix: "n.",
    owners: ["139380268841566208"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return 
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid slash command")

    if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply("You do not have permission for this command")

    slashcmd.run(client, interaction)
})

module.exports = bot