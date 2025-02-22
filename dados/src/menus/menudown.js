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
│  🛠️ *Comandos disponíveis* 
├─────────────────────┤
│🎥 *${prefix}tiktok* ou *${prefix}ttk*
│📌 *${prefix}pinterest* ou *${prefix}pin*
│🎶 *${prefix}play*
│💫 *${prefix}instagram* ou *${prefix}ig*
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 📥 *Aproveite os downloads!* 📥
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
};

module.exports = menudown;