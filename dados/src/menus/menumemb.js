async function menuMembros(prefix) {
  return `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 🌟 *MENU DE MEMBROS* 🌟
╰━━━━━━━━━━━━━━━━━━━━━╯
╭─────────────────────╮
│ 🆘 *Precisa de ajuda?*
│ 🤖 Digite *${prefix}ajuda*
╰─────────────────────╯

╭─────────────────────╮
│  📚 *Comandos Gerais* 
├─────────────────────┤
│ *${prefix}ajuda*
│ *${prefix}mention*
│ *${prefix}ping*
│ *${prefix}totalcmd*
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 🌟 *Divirta-se e Explore!* 🌟
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
}

module.exports = menuMembros;