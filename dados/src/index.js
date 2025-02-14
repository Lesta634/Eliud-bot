//Criador: hiudy
//Versão: 0.0.1
//Esse arquivo contem direitos autorais, caso meus creditos sejam tirados poderei tomar medidas jurídicas.

const { downloadContentFromMessage } = require('baileys');
const { reportError, youtube, tiktok, pinterest, igdl }  = require(__dirname+'/.funcs/.exports.js');
const { menu, menudown, menuadm } = require(__dirname+'/menus/index.js');
const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp'); 

async function NazuninhaBotExec(nazu, info) {
const { numerodono, nomedono, nomebot, prefixo, prefixo: prefix, debug } = JSON.parse(fs.readFileSync(__dirname+'/config.json'));
try {
 const from = info.key.remoteJid;
 const isGroup = from.endsWith('@g.us');
 const sender = isGroup ? info.key.participant.includes(':') ? info.key.participant.split(':')[0] +'@s.whatsapp.net': info.key.participant : info.key.remoteJid;
 const isStatus = from.endsWith('@broadcast');
 
 const baileys = require('baileys');
 const type = baileys.getContentType(info.message);
 
 const pushname = info.pushName ? info.pushName : '';
 
 var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info?.text || '';
 
 const args = body.trim().split(/ +/).slice(1);
 const q = args.join(' ');
 const budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
 
 var isCmd = body.trim().startsWith(prefix);
 const command = isCmd ? budy2.trim().slice(1).split(/ +/).shift().toLocaleLowerCase().trim().replaceAll(' ', '') : null;
 
 //INFOS DE GRUPO
  const groupMetadata = !isGroup ? {} : await nazu.groupMetadata(from);
  const AllgroupMembers = !isGroup ? [] : groupMetadata.participants.map(p => p.id);
  const groupAdmins = !isGroup ? [] : groupMetadata.participants.filter(p => p.admin).map(p => p.id);
  const botNumber = nazu.user.id.split(':')[0] + '@s.whatsapp.net';
  const isGroupAdmin = !isGroup ? null : groupAdmins.includes(sender);
  const isBotAdmin = !isGroup ? null : groupAdmins.includes(botNumber);
 
 //FUNÇÕES BASICAS
 async function reply(text) { return nazu.sendMessage(from, {text: text.trim()}, {sendEphemeral: true, contextInfo: { forwardingScore: 50, isForwarded: true, externalAdReply: { showAdAttribution: true }}, quoted: info})};nazu.reply=reply;
 
 const reagir = async (emj) => { if (typeof emj === 'string') { await nazu.sendMessage(from, { react: { text: emj, key: info.key } }); } else if (Array.isArray(emj)) { for (const emjzin of emj) { await nazu.sendMessage(from, { react: { text: emjzin, key: info.key } }); await new Promise(res => setTimeout(res, 500)); } } }; nazu.react = reagir;
 
 const getFileBuffer = async (mediakey, MediaType) => {const stream = await downloadContentFromMessage(mediakey, MediaType);let buffer = Buffer.from([]);for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk]) };return buffer}
 //FIM FUNÇÕES BASICAS
 
 //DEFINIÇÕES DE ISQUOTED
 const content = JSON.stringify(info.message);
 const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')
 const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')
 const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
 const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')
 const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
 const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
 const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
 const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')
 const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
 const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
 const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
 const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
 const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

 switch(command) {

  case 'play':
  case 'ytmp3':
  try {
    if (!q) return reply(`Digite o nome da música.\n> Ex: ${prefix + command} Back to Black`);
    nazu.react(['❤️','💖']);
    datinha = await youtube.search(q);
    if(!datinha.ok) return reply(datinha.msg);
    await nazu.sendMessage(from, { image: { url: datinha.data.thumbnail }, caption: `🎵 *Música Encontrada* 🎵\n\n📌 *Nome:* ${datinha.data.title}\n👤 *Canal:* ${datinha.data.author.name}\n👀 *Visualizações:* ${datinha.data.views}\n🔗 *Link:* ${datinha.data.url}`, footer: `By: ${nomebot}` }, { quoted: info });
    dlRes = await youtube.mp3(datinha.data.url);
    if(!dlRes.ok) return reply(dlRes.msg);
    console.log(dlRes);
    await nazu.sendMessage(from, {audio: {url: dlRes.url}, fileName: datinha.data.title, mimetype: 'audio/mp4'}, {quoted: info});
  } catch (e) {
    console.error(e);
    reply('Ocorreu um erro durante a requisição.');
  }
  break;
  
  case 'tiktok': case 'tiktokaudio': case 'tiktokvideo': case 'tiktoks': case 'tiktoksearch': case 'ttk':
   try {
    if (!q) return reply(`Digite um nome ou o link de um vídeo.\n> Ex: ${prefix}${command} Gato`);
    nazu.react(['❤️','💖']);
    let isTikTokUrl = /^https?:\/\/(?:www\.|m\.|vm\.|t\.)?tiktok\.com\//.test(q);
    let datinha = await (isTikTokUrl ? tiktok.dl(q) : tiktok.search(q));
    if (!datinha.ok) return reply(datinha.msg);
    for (const urlz of datinha.urls) {
        await nazu.sendMessage(from, { [datinha.type]: { url: urlz }, mimetype: datinha.mime }, { quoted: info });
    }
    if (datinha.audio) await nazu.sendMessage(from, { audio: { url: datinha.audio }, mimetype: 'audio/mp4' }, { quoted: info });
   } catch (e) {
    console.error(e);
    reply('Ocorreu um erro durante a requisição.');
   }
   break;
   
   case 'instagram': case 'igdl': case 'ig': case 'instavideo':
  try {
    if (!q) return reply(`Digite um link do Instagram.\n> Ex: ${prefix}${command} https://www.instagram.com/reel/DFaq_X7uoiT/?igsh=M3Q3N2ZyMWU1M3Bo`);
    nazu.react(['❤️', '📌']);
    const datinha = await igdl.dl(q);
    if (!datinha.ok) return reply(datinha.msg);
    await Promise.all(datinha.data.map(urlz => nazu.sendMessage(from, { [urlz.type]: urlz.buff }, { quoted: info })));
  } catch (e) {
    console.error(e);
    reply('Ocorreu um erro na requisição.');
  }
  break;
    
  case 'pinterest': case 'pin': case 'pinterestdl': case 'pinterestsearch':
   try {
    if (!q) return reply(`Digite um nome ou envie um link do Pinterest.\n> Ex: ${prefix}${command} Gatos\n> Ex: ${prefix}${command} https://www.pinterest.com/pin/123456789/`);  
    nazu.react(['❤️','📌']); 
    let datinha = await (/^https?:\/\/(?:[a-zA-Z0-9-]+\.)?pinterest\.\w{2,6}(?:\.\w{2})?\/pin\/\d+|https?:\/\/pin\.it\/[a-zA-Z0-9]+/.test(q) ? pinterest.dl(q) : pinterest.search(q));
    if (!datinha.ok) return reply(datinha.msg);
    for (const urlz of datinha.urls) {
        await nazu.sendMessage(from, { [datinha.type]: { url: urlz }, mimetype: datinha.mime }, { quoted: info });
    }
   } catch (e) {
    console.error(e);
    reply('Ocorreu um erro na requisição.');
   }
   break;
   
   
   //MENUS AQUI BB
   case 'menu':
   await reply(await menu(prefix));
   break
   case 'menudown':
   await reply(await menudown(prefix));
   break
   case 'menuadm':
   await reply(await menuadm(prefix));
   break
   
   
   //COMANDOS DE DONO BB
   case 'prefixo':
   case 'numerodono':
   case 'nomedono':
   case 'nomebot': try {
    if (!q) return reply(`Uso correto: ${prefix}${command} <valor>`);
     let config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
     config[command] = q;
     fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config, null, 2));
     reply(`✅ ${command} atualizado para: *${q}*`);
   } catch (e) {
   console.error(e);
   reply('❌ Ocorreu um erro ao atualizar a configuração.');
   };
  break;
  
  
  //COMANDOS GERAIS
  case 'ping':
  try {
    const timestamp = Date.now();
    const speedConverted = (Date.now() - (info.messageTimestamp * 1000)) / 1000;
    const config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
    function formatUptime(seconds) {let d = Math.floor(seconds / (24 * 3600));let h = Math.floor((seconds % (24 * 3600)) / 3600);let m = Math.floor((seconds % 3600) / 60);let s = Math.floor(seconds % 60);let uptimeStr = [];if (d > 0) uptimeStr.push(`${d}d`);if (h > 0) uptimeStr.push(`${h}h`);if (m > 0) uptimeStr.push(`${m}m`);if (s > 0) uptimeStr.push(`${s}s`);return uptimeStr.join(' ');};    
    const uptime = formatUptime(process.uptime());
    axios.get(`https://count.getloli.com/@nazuninha-ping?name=nazuninha-ping&theme=booru-lewd&padding=4&offset=0&align=top&scale=2&pixelated=1&darkmode=1&num=${String(speedConverted.toFixed(3)).replaceAll('.', '')}`, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://count.getloli.com' }, responseType: 'arraybuffer' }).then(async r => await nazu.sendMessage(from, { image: await sharp(r.data).png().toBuffer(), caption: `\n📡 *Status do Bot*\n-----------------------------------\n🤖 *Nome:* ${config.nomebot}\n👤 *Dono:* ${config.nomedono}\n\n📌 *Prefixo:* ${config.prefixo}\n🚀 *Latência:* ${speedConverted.toFixed(3)}s\n⏳ *Uptime:* ${uptime}` }, { quoted: info })).catch(e => (console.error('Erro ao obter a imagem:', e), nazu.sendMessage(from, { text: '❌ Erro ao obter o status do bot. Tente novamente mais tarde.' }, { quoted: info })));
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao obter as informações.');
  }
  break;
  
  case 'mention':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    
    let dir = __dirname + `/../database/grupos/`;
    let file = dir + `${from}.json`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ mark: {} }, null, 2));

    let groupData = JSON.parse(fs.readFileSync(file));
    if (!groupData.mark) groupData.mark = {};

    if (!q) return reply(`📢 *Configuração de Marcações*\n\n🔧 Escolha como deseja ser mencionado:\n\n✅ *${prefix}mention all* → Marcado em tudo (marcações e jogos).\n📢 *${prefix}mention marca* → Apenas em marcações de administradores.\n🎮 *${prefix}mention games* → Somente em jogos do bot.\n🚫 *${prefix}mention 0* → Não será mencionado em nenhuma ocasião.`);

    let options = {  all: '✨ Você agora será mencionado em todas as interações do bot, incluindo marcações de administradores e os jogos!', marca: '📢 A partir de agora, você será mencionado apenas quando um administrador marcar.',games: '🎮 Você optou por ser mencionado somente em jogos do bot.', 0: '🔕 Silêncio ativado! Você não será mais mencionado pelo bot, nem em marcações nem em jogos.'};
    if (options[q.toLowerCase()] !== undefined) {
      groupData.mark[sender] = q.toLowerCase();
      fs.writeFileSync(file, JSON.stringify(groupData, null, 2));
      return reply(`*${options[q.toLowerCase()]}*`);
    }

    reply(`❌ Opção inválida! Use *${prefix}mention* para ver as opções.`);
  } catch (e) {
    console.error(e);
    reply('❌ Erro ao atualizar configuração.');
  }
  break;
  
  
  //COMANDOS DE ADM
  case 'banir':
  case 'ban':
  case 'kick':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    if (!isGroupAdmin) return reply('❌ Apenas administradores podem usar este comando.');
    if (!isBotAdmin) return reply('❌ O bot precisa ser administrador para remover membros.');
    const mentioned = info.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return reply('❌ Marque o usuário que deseja banir.');   
    await nazu.groupParticipantsUpdate(from, mentioned, 'remove');
    reply(`✅ Usuário banido com sucesso!`);
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao tentar banir o usuário.');
  }
  break;

case 'promover':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    if (!isGroupAdmin) return reply('❌ Apenas administradores podem usar este comando.');
    if (!isBotAdmin) return reply('❌ O bot precisa ser administrador para promover membros.');
    const mentioned = info.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return reply('❌ Marque o usuário que deseja promover.');
    await nazu.groupParticipantsUpdate(from, mentioned, 'promote');
    reply(`✅ Usuário promovido a administrador!`);
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao tentar promover o usuário.');
  }
  break;

case 'rebaixar':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    if (!isGroupAdmin) return reply('❌ Apenas administradores podem usar este comando.');
    if (!isBotAdmin) return reply('❌ O bot precisa ser administrador para rebaixar membros.');
    const mentioned = info.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return reply('❌ Marque o usuário que deseja rebaixar.');
    await nazu.groupParticipantsUpdate(from, mentioned, 'demote');
    reply(`✅ Usuário rebaixado com sucesso!`);
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao tentar rebaixar o usuário.');
  }
  break;

case 'setname':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    if (!isGroupAdmin) return reply('❌ Apenas administradores podem usar este comando.');
    if (!isBotAdmin) return reply('❌ O bot precisa ser administrador para mudar o nome do grupo.');
    const newName = q.trim();
    if (!newName) return reply('❌ Digite um novo nome para o grupo.');
    await nazu.groupUpdateSubject(from, newName);
    reply(`✅ Nome do grupo alterado para: *${newName}*`);
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao tentar mudar o nome do grupo.');
  }
  break;

case 'setdesc':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    if (!isGroupAdmin) return reply('❌ Apenas administradores podem usar este comando.');
    if (!isBotAdmin) return reply('❌ O bot precisa ser administrador para mudar a descrição do grupo.');
    const newDesc = q.trim();
    if (!newDesc) return reply('❌ Digite uma nova descrição para o grupo.');
    await nazu.groupUpdateDescription(from, newDesc);
    reply(`✅ Descrição do grupo alterada!`);
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao tentar mudar a descrição do grupo.');
  }
  break;

case 'setpp':
case 'fotogp':
  try {
    if (!isGroup) return reply('❌ Este comando só pode ser usado em grupos.');
    if (!isGroupAdmin) return reply('❌ Apenas administradores podem usar este comando.');
    if (!isBotAdmin) return reply('❌ O bot precisa ser administrador para mudar a foto do grupo.');
    if (!info.message.imageMessage) return reply('❌ Envie uma imagem com o comando para definir como foto do grupo.');
    const imageBuffer = await getFileBuffer(info.message.imageMessage, 'image');
    await nazu.updateProfilePicture(from, imageBuffer);    
    reply('✅ Foto do grupo alterada com sucesso!');
  } catch (e) {
    console.error(e);
    reply('❌ Ocorreu um erro ao tentar mudar a foto do grupo.');
  }
  break;
  
  case 'marcar':
  if (!isGroup) return reply('❌ Apenas para grupos.');
  if (!isGroupAdmin) return reply('🚫 Apenas admins.');
  if (!isBotAdmin) return reply('🤖 O bot precisa ser admin.');
  try {
    let path = __dirname + '/../database/grupos/' + from + '.json';
    let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : { mark: {} };
    let membros = AllgroupMembers.filter(m => !['0', 'games'].includes(data.mark[m]));
    if (!membros.length) return reply('❌ Nenhum membro para mencionar.');
    let msg = `📢 *Membros mencionados:* ${q ? `\n💬 *Mensagem:* ${q}` : ''}\n\n`;
    await nazu.sendMessage(from, {text: msg + membros.map(m => `➤ @${m.split('@')[0]}`).join('\n'), mentions: membros});
  } catch (e) {
    console.error(e);
    reply('⚠️ Erro ao marcar.');
  }
  break;
  
  case 'totag':
  case 'cita':
  case 'hidetag':
  if (!isGroup) return reply('❌ Apenas para grupos.');
  if (!isGroupAdmin) return reply('🚫 Apenas admins.');
  if (!isBotAdmin) return reply('🤖 O bot precisa ser admin.');
    const rsm4 = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const messageTypes = {image: isQuotedImage ? rsm4?.imageMessage : info.message?.imageMessage, video: isQuotedVideo ? rsm4?.videoMessage : info.message?.videoMessage, document: isQuotedDocument ? rsm4?.documentMessage : info.message?.documentMessage, documentWithCaption: isQuotedDocW ? rsm4?.documentWithCaptionMessage?.message?.documentMessage : info.message?.documentWithCaptionMessage?.message?.documentMessage, audio: isQuotedAudio ? rsm4.audioMessage : "", sticker: isQuotedSticker ? rsm4.stickerMessage : "", conversation: isQuotedMsg && !rsm4.audioMessage && !rsm4.stickerMessage && !rsm4.imageMessage && !rsm4.videoMessage && !rsm4.documentMessage && !rsm4.documentWithCaptionMessage ? rsm4.conversation : info.message?.conversation, extendedText: rsm4?.extendedTextMessage?.text || info?.message?.extendedTextMessage?.text
    };
    let path = __dirname + '/../database/grupos/' + from + '.json';
    let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : { mark: {} };
    const MRC_TD4 = AllgroupMembers.filter(m => !['0', 'games'].includes(data.mark[m]));
    let DFC4;
    const createMessage = (type, message, caption) => {message.caption = caption;message.mentions = MRC_TD4;message[type] = {url: message.url};return message;};
    if (messageTypes.image && !messageTypes.audio && !messageTypes.document) {
        DFC4 = createMessage('image', messageTypes.image, q.length > 1 ? `\n${q}` : messageTypes.image.caption.replace(new RegExp(prefix + command, "gi"), `❪ *Marcação do(a) Adm:* ${pushname}\n\n`));
    } else if (messageTypes.video && !messageTypes.audio && !messageTypes.document) {
        DFC4 = createMessage('video', messageTypes.video, q.length > 1 ? `\n${q.trim()}` : messageTypes.video.caption.replace(new RegExp(prefix + command, "gi"), `❪ *Marcação do(a) Adm:* ${pushname}\n\n`).trim());
    } else if (messageTypes.conversation) {
        DFC4 = {text: messageTypes.conversation.replace(new RegExp(prefix + command, "gi"), `❪ *Marcação do(a) Adm:* ${pushname}\n\n`).trim(), mentions: MRC_TD4};
    } else if (messageTypes.extendedText) {
        DFC4 = {text: messageTypes.extendedText.replace(new RegExp(prefix + command, "gi"), `❪ *Marcação do(a) Adm:* ${pushname}\n\n`).trim(), mentions: MRC_TD4};
    } else if (messageTypes.document) {
        DFC4 = createMessage('document', messageTypes.document, q.length > 1 ? `\n${q.trim()}` : messageTypes.document.caption.replace(new RegExp(prefix + command, "gi"), `❪ *Marcação do(a) Adm:* ${pushname}\n\n`).trim());
    } else if (messageTypes.sticker && !messageTypes.audio) {
        DFC4 = createMessage('sticker', messageTypes.sticker);
    } else if (messageTypes.audio) {
        DFC4 = {audio: { url: messageTypes.audio.url },mentions: MRC_TD4,ptt: true};
    };
    await nazu.sendMessage(from, DFC4).catch((error) => {});
    break;
    
    case 'modobrincadeira': case 'modobrincadeiras': case 'modobn': {
    if (!isGroup) return reply('❌ Apenas para grupos.');
    if (!isGroupAdmin) return reply('🚫 Apenas admins.'); 
     const groupFilePath = __dirname + `/../database/grupos/${from}.json`;    
     let groupData = {};
     try {groupData = JSON.parse(fs.readFileSync(groupFilePath));} catch (error) {}

    if (!groupData.modobrincadeira || groupData.modobrincadeira === undefined) {
        groupData.modobrincadeira = true;
    } else {
        groupData.modobrincadeira = !groupData.modobrincadeira;
    };
    fs.writeFileSync(groupFilePath, JSON.stringify(groupData));
    if (groupData.modobrincadeira) {
        await reply('🎉 *Modo de Brincadeiras ativado!* Agora o grupo está no modo de brincadeiras. Divirta-se!');
    } else {
        await reply('⚠️ *Modo de Brincadeiras desativado!* O grupo não está mais no modo de brincadeiras.');
    }};
    break;
    
 default:
 if(isCmd) await nazu.react('❌');
 };
 
 
} catch(e) {
console.error(e);
var {version} = JSON.parse(fs.readFileSync(__dirname+'/../../package.json'));
if (debug) reportError(e, version);
};
};

module.exports = NazuninhaBotExec;