const run = async (client, interaction) => {
	let user = interaction.options.getUser("user")
	let reason = interaction.options.getString("reason") || "No reason given"

	if (!user) return interaction.reply("You must provide a user to kick")

	// ban
	try {
		await interaction.guild.members.kick(user, reason)
		return interaction.reply(`${user.tag} has been kicked for *${reason}*`)
	} catch (e) {
		if (e) {
			console.error(e)
			return interaction.reply(`Failed to kick ${user.tag}`)
		}
	}
}

module.exports = {
    name: "kick",
    description: "Kick a member",
    perm: "KICK_MEMBERS",
    options: [
        {
            name: "user", description: "The user to timeout",
            type: 6, required: true
        },
        {
            name: "reason",
            description: "reason for punishment",
            type: 3,
            required: false
        }
    ],
    run
}