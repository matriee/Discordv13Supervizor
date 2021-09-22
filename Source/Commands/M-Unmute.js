const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')


module.exports = {
    name: "unmute",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
    ],
    run: async (client, interaction) => {
        
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */

        
        if(!interaction.member.roles.cache.some(x => settings.MuteHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
        if(!user) return interaction.reply({content: "Bir kişiyi etiketlemelisiniz."});

        if (user.voice.serverMute == true) {
            user.voice.setMute(false)
            interaction.reply({content: `${user} adlı kullanıcının ses cezası kaldırılmıştır.`})
           } 
        if (user.roles.cache.has(settings.MuteRole)) {
            user.roles.remove(cfg.muted)
            interaction.reply({content:`${user} adlı kullanıcının metin kanallarında ki susturulması kaldırılmıştır.`})
        }
    }
}