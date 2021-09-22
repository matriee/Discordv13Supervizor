const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')


module.exports = {
    name: "example",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
    ],
    run: async (client, interaction) => {
        
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */

        const logembed = new MessageEmbed()       
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`**Bir Kişinin Banı Açıldı** \n\n \`Banı Açılan Kişi:\` **${user}** \n \`Banı Açan Yetkili:\` **${interaction.member} `)

        const msgem = new MessageEmbed()       
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`${user} adlı kişinin banı açıldı.`)

        
        if(!interaction.member.roles.cache.some(x => settings.BanHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
        if(!user) return interaction.reply({content: "Bir kişi etiketlemelisin."});
        const guild = client.guilds.cache.get(settings.GuildID);
        guild.members.unban(user);
        interaction.reply({embeds: [msgem]});
        await client.channels.cache.get(settings.BanLog).send({embeds: [logembed]});



    }
}