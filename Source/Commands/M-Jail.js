const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')


module.exports = {
    name: "jail",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
        { type: 4, name: 'reason', description: 'Bir sebep giriniz.' }
    ],
    run: async (client, interaction) => {
        
        const channel = interaction.options.getChannel('channel');
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */

        const logembed = new MessageEmbed()       
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`**Bir Kişi Cezalandırıldı** \n\n \`Cezalandırılan Kişi:\` **${user}** \n \`Cezalandıran Yetkili:\` **${interaction.member} \n \`Cezalandırılma Tarihi:\` **${client.toDate(new Date())}** \n \`Cezalandırılma Sebebi:\` **${reason}** `)
    
     
        if(!interaction.member.roles.cache.some(x => settings.JailHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
        if(!user) return interaction.reply({content: "Bir kişiyi etiketlemelisin."});
        if(!reason) return interaction.reply({content: "Bir sebep girmelisin."});
        if(interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.reply({content: "Kendinden büyük veya aynı roldeki kişileri cezalıya atamazsın."})
        if(user.id == interaction.member.id) return interaction.reply({content: "Kendini cezalıya atamazsın."})
        
        await vectraDatabase.yjail(user, interaction.member)
        await user.roles.set([settings.JailRole]);
        await client.channels.cache.get(settings.JailLog).send({embeds: [embed]})

    }
}