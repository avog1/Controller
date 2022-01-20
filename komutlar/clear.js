const Discord = require('discord.js')

    exports.run = (client, message, args) => {

        if(!message.member.roles.cache.has("929762068956070005")){
            const arty = new Discord.MessageEmbed()
            .setDescription(`Bu komudu kullanmak için gerekli yetkilere sahip değilsin.`)
            .setColor('BLACK')
            .setFooter('Controller')
            return message.channel.send(arty)
        }


        let miktar = args[0]
   

        if(miktar > 100){
            const arty = new Discord.MessageEmbed()
            .setDescription(`${message.author} - I can delete a maximum of \`100\` Messages.`)
            .setColor('BLACK')
            .setFooter('Controller')
            return message.channel.send(arty)
        }
        if(!miktar){
            const arty = new Discord.MessageEmbed()
            .setDescription(`${message.author} - Please enter the number of messages to be deleted.`)
            .setColor('BLACK')
            .setFooter('Controller')
            return message.channel.send(arty)
        }
        if(isNaN(miktar)){
            const arty = new Discord.MessageEmbed()
            .setDescription(`${message.author} - You will enter numbers, not letters.`)
            .setColor('BLACK')
            .setFooter('Controller')
            return message.channel.send(arty)
        }


        if(miktar){
            message.channel.bulkDelete(miktar)
       
            const arty = new Discord.MessageEmbed()
            .setDescription(`${message.author} - I've successfully deleted ${miktar} messages.`)
            .setColor('BLACK')
            .setFooter('Controller')
            return message.channel.send(arty).then(cmf => {
                cmf .delete({timeout: 5000})
            })
        }
    }

    exports.conf = {
    aliases: ['temizle']
}

exports.help = {
  name: 'sil',
  description: 'nobles api',
  usage: 'sil'
};