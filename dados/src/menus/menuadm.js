async function menuadm(prefix) {
  return `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃     🛠️ *MENU DE ADM* 🛠️     
╰━━━━━━━━━━━━━━━━━━━━━╯
╭─────────────────────╮
│ 🆘 *Precisa de ajuda?*
│ 🤖 Digite *${prefix}ajuda*
╰─────────────────────╯

╭─────────────────────╮
│ 🔧 *Comandos de Administração*
├─────────────────────┤
│ *${prefix}hidetag*
│ *${prefix}marcar*
│ *${prefix}ban* ou *${prefix}b*
│ *${prefix}promover*
│ *${prefix}rebaixar*
│ *${prefix}mute*
│ *${prefix}desmute*
│ *${prefix}blockcmd*
│ *${prefix}unblockcmd*
│ *${prefix}setname*
│ *${prefix}setdesc*
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃  🌟 *Ativações disponíveis*
├─────────────────────┤
│ *${prefix}modobn*
│ *${prefix}modonsfw*
│ *${prefix}bemvindo* ou *${prefix}bv
│ *${prefix}soadm*
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
}

module.exports = menuadm;