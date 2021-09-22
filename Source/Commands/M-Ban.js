const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase');


module.exports = {
    name: "ban",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
        { type: 4, name: 'reason', description: 'Sebep Giriniz.' }
    ],
    run: async (client, interaction) => {
        
        const reason = interaction.options.getChannel('reason');
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */

       const embed = new MessageEmbed()       
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`${user} adlı kişi başarıyla banlandı!`)

        const logembed = new MessageEmbed()       
        .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(`**Bir Kişi Banlandı** \n\n \`Banlanan Kişi:\` **${user}** \n \`Banlayan Yetkili:\` **${interaction.member} \n \`Banlanma Tarihi:\` **${client.toDate(new Date())}** \n \`Banlanma Sebebi:\` **${reason}** `)

        //Kontroller (Kullanıcı, Yetki vs.)
        if(!interaction.member.roles.cache.some(x => settings.BanHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;    
        if(!reason) return interaction.reply({content: "Bir sebep girmelisin."})
        if(!user) return interaction.reply({content: "Bir kullanıcı etiketlemelisin."})
        if(interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.reply({content: "Kendinden büyük veya aynı roldeki kişileri banlayamazsın."})
        if(user.id == interaction.member.id) return interaction.reply({content: "Kendini banlayamazsın."})

        await vectraDatabase.yban(user, interaction.member, reason)
        await user.ban({reason: `Yetkili : ${interaction.user.tag} | Sebep: ${reason}`})
        await interaction.reply({content: 'Banned', embeds: [embed]})
        await client.channels.cache.get(settings.BanLog).send({embeds: [logembed]})
    }
}