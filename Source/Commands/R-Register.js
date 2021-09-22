const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const settings = require('../Settings/settings.json');
const {vectraDatabase} = require('../Functions/vectraDatabase')
const db = require('quick.db')


module.exports = {
    name: "k",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
        { type: 4, name: 'name', description: 'name' },
        { type: 5, name: 'age', description: 'age'}
    ],
    run: async (client, interaction) => {
        
        const ages = interaction.options.getInteger('age');
        const usera = interaction.options.getUser('user');
        const names = interaction.options.getString('name');
        /*
            interaction.options.get<optionType>('<optionName>');
        */
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('man')
					.setLabel('Erkek')
					.setStyle('PRIMARY'),

                new MessageButton()
                .setCustomId('woman')
                .setLabel('Kadın')
                .setStyle('PRIMARY')
			);

        if(!interaction.member.roles.cache.some(x => settings.RegisterHammer.includes(x.id)) && !interaction.member.permissions.has("MANAGE_ROLES")) return;
        if(!usera) return interaction.reply({content: "Bir kişi etiketleyiniz."});
        if(!names) return interaction.reply({content: "Bir isim giriniz."});
        if(!ages) return interaction.reply({content: "Bir yaş giriniz."});

        const tagger = member.user.username.includes(settings.Tag)
        if(tagger) await member.setNickname(`${settings.Tag} ${names} | ${ages}`)
        else await member.setNickname(`${settings.Untag} ${names} | ${ages}`)

        
		const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Vectra v13 Register')
        .setDescription(`Kişinin ismi başarıyla \`${names} | ${ages}\` olarak değiştirildi. \n\n Kişiyi kaydetmeden önce önceki isimlerine bakmanız önerilir. \` /isimler <user> \` \n \`30 saniye\` içinde aşağıdaki cinsiyet butonlarından birine basmalısınız.`);
        
        
		const yep = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Vectra v13 Register')
        .setDescription(`Kişi başarıyla \`${names} | ${ages}\` [Kadın] şeklinde kayıt edildi. `);

        
		const ow = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Vectra v13 Register')
        .setDescription(`Kişi başarıyla \`${names} | ${ages}\` [Erkek] şeklinde kayıt edildi. `);

        
        
		const erkeklog = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Vectra v13 Register')
        .setDescription(`**Bir Kişi Kaydedildi** \n\n Kaydedilen Kişi: ${usera} \n Kaydedilen İsim ve Yaş: \`${names} | ${ages}\` \n Cinsiyet: [Erkek] \n Kaydeden Yetkili: ${interaction.member}`);

        
		const kadinlog = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Vectra v13 Register')
        .setDescription(`**Bir Kişi Kaydedildi** \n\n Kaydedilen Kişi: ${usera} \n Kaydedilen İsim ve Yaş: \`${names} | ${ages}\` \n Cinsiyet: [Kadın] \n Kaydeden Yetkili: ${interaction.member}`);




        const vectramsg = await interaction.channel.send({ content: 'Pong!', embeds: [embed], components: [row] });
        
        const vecfilter = v => v.user.id === interaction.member.id;

        const collector = m.createMessageComponentCollector({ filter: vecfilter, time: 30000, max: 1})

        
        collector.on("collect", async (i) => {
            if(i.customId === "man"){
                vectraDatabase.man(usera, interaction.member)
                usera.roles.add(settings.ManRole);
                usera.roles.remove(settings.Unregister);
                db.add(`p_${interaction.member.id}`, 25);
                await vectramsg.editReply({content: "Pong!", embeds: [ow], components: []});
                client.channels.cache.get(settings.RegLog).send({content: "Pong!", embeds: [erkeklog]})
            }
            if(i.customId === "woman"){
                vectraDatabase.woman(usera, interaction.member);
                usera.roles.add(settings.ManRole);
                usera.roles.remove(settings.Unregister);
                db.add(`p_${interaction.member.id}`, 25);
                await vectramsg.editReply({content: "Pong!", embeds: [yep], components: []})
                client.channels.cache.get(settings.RegLog).send({content: "Pong!", embeds: [kadinlog]})
            }
        });
    }
}