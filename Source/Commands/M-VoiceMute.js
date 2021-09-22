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
        
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */
       
        if(interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.reply({content: "Kendinden büyük veya aynı roldeki kişileri muteliyemezsin."})
        if(user.id == interaction.member.id) return interaction.reply({content: "Kendini muteleyemezsin."})
        if(!user.voice.channel) return interaction.reply({content: "**Kullanıcı ses kanallarında değil.**"})

        
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


        const m = await interaction.channel.send({content: `**1)** Küfür - 10DK.\n**2)** Ailevi Küfür - 15DK.\n**3)** Troll - 20DK.\n**4)** Kışkırtma 25DK.\n**5)** Huzur Bozma - 25DK.`, components: [row] })

         const iFilter = i => i.user.id === interaction.member.id;

         const collector = m.createMessageComponentCollector({ filter: iFilter, time: 60000, max: 1})

         collector.on("collect", async (i) => {
             if(i.customId === "1") {
              await vectraDatabase.ymute(user, interaction.member, "Küfür")
              await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Küfür** sebebi ile ${interaction.member} adlı yetkili tarafından ses kanallarında mutelendi.`})
              await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Küfür** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından ses kanallarında mutelendi.` })
              await client.delete(m)
              user.voice.setMute(true)
            setTimeout(() => {
                user.voice.setMute(false)
            }, ms("10m"))
            } if(i.customId === "2") {
              await vectraDatabase.ymute(user, interaction.member, "Ailevi Küfür")
              await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Ailevi Küfür** sebebi ile ${interaction.member} adlı yetkili tarafından ses kanallarında mutelendi.`})
              await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Ailevi Küfür** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından ses kanallarında mutelendi.` })
              await client.delete(m)
              user.voice.setMute(true)
              setTimeout(() => {
                  user.voice.setMute(false)
              }, ms("15m"))
             } if(i.customId === "3") {
                await vectraDatabase.ymute(user, interaction.member, "Troll")
                await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Troll** sebebi ile ${interaction.member} adlı yetkili tarafından ses kanallarında mutelendi.`})
                await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Troll** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından ses kanallarında mutelendi.` })
                await client.delete(m)
                user.voice.setMute(true)
                setTimeout(() => {
                    user.voice.setMute(false)
                }, ms("20m"))
            } if(i.customId === "4") {
                await vectraDatabase.ymute(user, interaction.member, "Kışkırtma")
                await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Kışkırtma** sebebi ile ${interaction.member} adlı yetkili tarafından ses kanallarında mutelendi.`})
                await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Kışkırtma** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından ses kanallarında mutelendi.` })
                await client.delete(m)
                user.voice.setMute(true)
                setTimeout(() => {
                    user.voice.setMute(false)
                }, ms("25m"))               
            } if(i.customId === "5") {
                await vectraDatabase.ymute(user, interaction.member, "Huzur Bozma")
                await interaction.reply({content: `${settings.Yes} ${user} adlı kullanıcı **Huzur Bozma** sebebi ile ${interaction.member} adlı yetkili tarafından ses kanallarında mutelendi.`})
                await client.channels.cache.get(settings.MuteLog).send({content: `${settings.Yes} ${user} (**${user.user.tag}**) adlı üye **Huzur Bozma** ile \`${client.toDate(new Date())}\` tarihinde ${interaction.member} tarafından ses kanallarında mutelendi.` })
                await client.delete(m)
                user.voice.setMute(true)
                setTimeout(() => {
                    user.voice.setMute(false)
                }, ms("20m"))
                 
            }
         })

    }
}

