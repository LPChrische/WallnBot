const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://i.ytimg.com/vi/D9LxMut3TMM/maxresdefault.jpg"

const av = {
    size:256,
    x: 175,
    y: 325
}

const dim = {
    height: 720,
    width: 1280,
    margin : 50
}

const generateImage = async (member) => {
    let avaratURL = member.user.displayAvatarURL({dynamic: false, size:av.size}).replace(".webp", ".png")

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backImg = await Canvas.loadImage(background)
    ctx.drawImage(backImg, 0, 0)

    const avImg = await Canvas.loadImage(avaratURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avImg, av.x, av.y)
    ctx.restore()

    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage