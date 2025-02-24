async function menudown(prefix) {
  return `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃📥 *MENU DE DOWNLOADS* 📥
╰━━━━━━━━━━━━━━━━━━━━━╯
╭─────────────────────╮
│ 🆘 *Precisa de ajuda?*
│ 🤖 Digite *${prefix}ajuda*
╰─────────────────────╯

╭─────────────────────╮
│  🔍 *Comandos de Pesquisas* 
├─────────────────────┤
│ *${prefix}play*
│ *${prefix}assistir*
╰─────────────────────╯

╭─────────────────────╮
│  📲 *Comandos de Downloads* 
├─────────────────────┤
│ *${prefix}tiktok* ou *${prefix}ttk*
│ *${prefix}pinterest* ou *${prefix}pin*
│ *${prefix}instagram* ou *${prefix}ig*
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 📥 *Aproveite os downloads!* 📥
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
};

module.exports = menudown;