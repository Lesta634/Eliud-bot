async function menu(prefix) {
  return `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 🌸 *MENU PRINCIPAL* 🌸
╰━━━━━━━━━━━━━━━━━━━━━╯

╭─────────────────────╮
│  📂 *Submenus disponíveis* 
├─────────────────────┤
│📥 *${prefix}menudown*
│  ➥ _Baixe músicas, vídeos, fotos_
│      _e muito mais!_
├─────────────────────┤
│🛠️ *${prefix}menuadm*
│  ➥ _Comandos de administração_
│      _e ativações do grupo_
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 🌸 *Explore e Divirta-se!* 🌸
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
}

module.exports = menu;