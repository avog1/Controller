const Discord = require("discord.js");
const db = require("croxydb");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Insufficient authorization, required => ADMINISTRATOR")

    if (!args[0] || !["on", "off"].includes(args[0])){
      const ce = new Discord.MessageEmbed()
      .setTitle("LÜTFEN KOMUTU DOĞRU KULLAN")
      .setColor("#FF00B2")
      .addField("To open only on a specific channel", "`'swear-guard on #channel`")
      .addField("To Open On All Server", "`'swear-guard on`")
      .addField("To Shut Down the System on a Specific Channel", "`'swear-guard off #channel`")
      .addField("To turn it off on the entire server", "`'swear-guard off`")
      message.channel.send(ce)
      }
 
  if(args[0] === "on"){
    const cc = message.mentions.channels.first()
    if(cc){
      db.set("cd2."+cc.id+message.guild.id, "Kanal")
      message.channel.send("**The curse guard system was opened for <#"+cc.id+">**")
    } else {
      db.set("cd1."+message.guild.id, "Sunucu")
      message.channel.send("**Swear Guard on for all server!**")
    }
  }
 
   if(args[0] === "off"){
    const cc = message.mentions.channels.first()
    if(cc){
      db.delete("cd2."+cc.id+message.guild.id)
      message.channel.send("**The curse guard system was closed for <#"+cc.id+">**")
    } else {
      db.delete("cd1."+message.guild.id)
      message.channel.send("**Swear Guard off for all server!**")
    }
  }
};
exports.conf = {
  aliases: ['küfür-engel']
};

exports.help = {
  name: "swear-guard"
};