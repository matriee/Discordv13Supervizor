const { MessageActionRow, MessageEmbed  } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')
const CezaData = require('../Database/CezaData')


module.exports = {
    name: "sicil",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
    ],
    run: async (client, interaction) => {
        
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */

        
        if(!interaction.member.roles.cache.some(x => settings.JailHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;

        if(user){
            CezaData.find({ Kisi: user.id }), async (err, bip) => {
                let cezalars = bip.reverse();
                let Metin = cezalars.map(x => ` \`${user} adlı kişinin sicili ektedir:\` \n\n \`Ban Sayısı:\` ${x.Ban ? x.Ban : "0"} \n \`Jail Sayısı:\` ${x.Jail ? x.Jail : "0"} \n \`Mute Sayısı:\` ${x.Mute ? x.Mute : "0"} \n \` (Yapım Aşamasında) Ceza Puanı:\` ${x.Puan ? x.Puan : "0"}`)
                const vectra = new MessageEmbed()
                .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${Metin}`)
                interaction.reply({embeds: [vectra]})
            }
        } else {
            CezaData.find({ Kisi: interaction.member.id }), async (err, bip) => {
                let cezalars = bip.reverse();
                let Metin = cezalars.map(x => ` \`Siciliniz Ektedir:\` \n\n \`Ban Sayısı:\` ${x.Ban ? x.Ban : "0"} \n \`Jail Sayısı:\` ${x.Jail ? x.Jail : "0"} \n \`Mute Sayısı:\` ${x.Mute ? x.Mute : "0"} \n \` (Yapım Aşamasında) Ceza Puanı:\` ${x.Puan ? x.Puan : "0"}`)
                const vectra = new MessageEmbed()
                .setAuthor(interaction.user.tag, interaction.user.avatarURL({dynamic: true}))
                .setColor("RANDOM")
                .setDescription(`${Metin}`)
                interaction.reply({embeds: [vectra]})
            }
        }
    }
}