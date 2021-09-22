const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')


module.exports = {
    name: "example",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
        { type: 3, name: 'channel', description: 'Mention channel.' }
    ],
    run: async (client, interaction) => {
        
        const channel = interaction.options.getChannel('channel');
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */
        if(channel) {
            await interaction.reply({ content: `${client.user.username} | ${channel.id}`, ephemeral: true  })
        }
        if(user) {
            await interaction.followUp({ content: `${client.user.username} | ${user.username}`, ephemeral: true  })
        }
    }
}