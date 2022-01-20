const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

client.on("guildMemberAdd", async member => {
  let css = client.guilds.cache.get("929762068939305050");
  if (css) {
    let csm = css.members.cache.get(member.id);
    if (csm) {
      let csl = css.channels.cache.get("933474920065794130");
      if (csl) {
        const kurulus = Date.now() - csm.user.createdTimestamp;

        if (kurulus < 604800000) {
          csl.send(
            `${member} Adlı Kullanıcı Fake Olduğu İçin Kayıtsız Rolünü Alıp Fake Verdim `
          );
          csm.roles.cache.map(m => {
            if (m) {
              csm.roles.remove(m);
            }
          });

          setTimeout(() => {
            csm.roles.add("933478400574754826");
          }, 6000);
        }
      }
    }
  }
});



client.on('message', async message => {
const cdb = require("croxydb") //gerekli modül
if(message.guild){
  const data1 = cdb.get("cd1."+message.guild.id)
  const data2 = cdb.get("cd2."+message.channel.id+message.guild.id)
 
  if(data1){
  const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "Amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "fuck", "bitch", "Get the fuck outta here", "Motherfucker", "Bastard", "Shit", "Asshole", "Dickhead"];

  let content = message.content.split(' ');
 
  content.forEach(kelime => {
  if(blacklist.some(küfür => küfür === kelime))  {
  if(!message.member.permissions.has('BAN_MEMBERS')){
  message.delete({timeout: 1000});
  message.reply("**Please don't swear!!**")
  }
  }
  })
  }

    if(!data1 && data2){
  const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "Amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "fuck", "bitch", "Get the fuck outta here", "Motherfucker", "Bastard", "Shit", "Asshole", "Dickhead"];

  let content = message.content.split(' ');
 
  content.forEach(kelime => {
  if(blacklist.some(küfür => küfür === kelime))  {
  if(!message.member.permissions.has('BAN_MEMBERS')){
  message.delete({timeout: 1000});
  message.reply("**Please don't swear!!**")
  }
  }
  })
  }
 
}
  });


////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);
