const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')


module.exports = {
    name: "unjail",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
    ],
    run: async (client, interaction) => {
        
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */

        const embeda = new MessageEmbed() 
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`${user} adlı kişinin cezası başarıyla kaldırıldı!`)

        
        const embedlog = new MessageEmbed() 
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`**Bir Kişinin Cezası Kaldırıldı** \n\n \`Cezası Kaldırılan Kişi:\` **${user}** \n \`Cezayı Kaldıran Yetkili:\` **${interaction.member}`)
        
        if(!interaction.member.roles.cache.some(x => settings.JailHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
        if(!user) return interaction.reply({content: "Bir kişiyi etiketlemelisin."});
        user.roles.cache.has(settings.BoosterRole) ? user.roles.set([settings.BoosterRole, settings.Unregister]) : user.roles.set([settings.Unregister]).catch(e => console.error(e))
        interaction.reply({embeds: [embeda]});
        client.channels.cache.get(settings.JailLog).send({embeds: [embedlog]});

    }
}