async function menudown(prefix) {
  return `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 📥 *MENU DE DOWNLOADS* 📥
╰━━━━━━━━━━━━━━━━━━━━━╯

╭─────────────────────╮
│  🛠️ *Comandos disponíveis* 
├─────────────────────┤
│🎥 *${prefix}tiktok*
│  ➥ _Baixa vídeos e fotos do TikTok._
│  ➥ Uso: ${prefix}tiktok <link ou nome>
├─────────────────────┤
│📌 *${prefix}pinterest* ou *${prefix}pin*
│  ➥ _Baixa fotos e vídeos do Pinterest._
│  ➥ Uso: ${prefix}pinterest <link ou nome>
├─────────────────────┤
│🎶 *${prefix}play*
│  ➥ _Baixa músicas pelo nome._
│  ➥ Uso: ${prefix}play <nome da música>
├─────────────────────┤
│💫 *${prefix}instagram* ou *${prefix}ig*
│  ➥ _Baixa fotos e vídeos do Instagram._
│  ➥ Uso: ${prefix}instagram <link>
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 📥 *Aproveite os downloads!* 📥
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
};

module.exports = menudown;