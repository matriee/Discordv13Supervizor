const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')
const moment = require("moment")
require("moment-duration-format");
moment.locale("tr")
const ms = require("ms")


module.exports = {
    name: "mute",
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
        
        
        if(!interaction.member.roles.cache.some(x => settings.MuteHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
        if(!user) interaction.reply({content: "Bir kişi etiketleyiniz."})
        if(!reason) interaction.reply({content: "Bir Sebep Giriniz."})
        if(interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.reply({content: "Kendinden büyük veya aynı roldeki kişileri muteleyemezsin."})
        if(user.id == interaction.member.id) return interaction.reply({content: "Kendini muteleyemezsin."})
        

        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("1")
            .setLabel("1")
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("2")
            .setLabel("2")
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("3")
            .setLabel("3")
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("4")
            .setLabel("4")
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("5")
            .setLabel("5")
            .setStyle("SECONDARY")
        )

        const vmsg = await interaction.reply({content: `**1)** Küfür - 10DK.\n**2)** Ailevi Küfür - 15DK.\n**3)** Chat Troll - 20DK.\n**4)** Kışkırtma 25DK.\n**5)** Huzur Bozma - 25DK.`, components: [row] })
        const iFilter = i => i.user.id === interaction.member.id;
        const collector = m.createMessageComponentCollector({ filter: iFilter, time: 60000, max: 1})

        
        collector.on("collect", async (i) => {
            if(i.customId === "1") {
             await vectraDatabase.ymute(user, interaction.member, reason)
             await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Küfür** sebebi ile ${interaction.member} adlı yetkili tarafından chat kanallarında mutelendi. (**Ceza Numarası:** \`[${count}]\`)`})
             await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Küfür** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından chat kanallarında mutelendi. [\`${count}\`]` })            
             user.roles.add(settings.MuteRole)
             setTimeout(() => {
               user.roles.remove(settings.MuteRole)
           }, ms("10m"))
           } if(i.customId === "2") {
             await vectraDatabase.ymute(user, interaction.member, reason)
             await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Ailevi Küfür** sebebi ile ${interaction.member} adlı yetkili tarafından chat kanallarında mutelendi. (**Ceza Numarası:** \`[${count}]\`)`})
             await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Ailevi Küfür** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından chat kanallarında mutelendi. [\`${count}\`]` })
             user.roles.add(settings.MuteRole)
             setTimeout(() => {
                 user.roles.remove(settings.MuteRole)
             }, ms("15m"))
            } if(i.customId === "3") {
               await vectraDatabase.ymute(user, interaction.member, reason)
               await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Chat Troll** sebebi ile ${interaction.member} adlı yetkili tarafından chat kanallarında mutelendi. (**Ceza Numarası:** \`[${count}]\`)`})
               await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Chat Troll** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından chat kanallarında mutelendi. [\`${count}\`]` })
               user.roles.add(settings.MuteRole)
               setTimeout(() => {
                   user.roles.remove(settings.MuteRole)
               }, ms("20m"))
           } if(i.customId === "4") {
               await vectraDatabase.ymute(user, interaction.member, reason)
               await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Kışkırtma** sebebi ile ${interaction.member} adlı yetkili tarafından chat kanallarında mutelendi. (**Ceza Numarası:** \`[${count}]\`)`})
               await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Kışkırtma** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından chat kanallarında mutelendi. [\`${count}\`]` })
               user.roles.add(settings.MuteRole)
               setTimeout(() => {
                   user.roles.remove(settings.MuteRole)
               }, ms("25m"))               
           } if(i.customId === "5") {
               await vectraDatabase.ymute(user, interaction.member, reason)
               await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Huzur Bozma** sebebi ile ${interaction.member} adlı yetkili tarafından chat kanallarında mutelendi. (**Ceza Numarası:** \`[${count}]\`)`})
               await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Huzur Bozma** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından chat kanallarında mutelendi. [\`${count}\`]` })
               user.roles.add(settings.MuteRole)
               setTimeout(() => {
                   user.roles.remove(settings.MuteRole)
               }, ms("20m"))  
           }
        })
    }
}