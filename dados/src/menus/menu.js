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
╰─────────────────────╯

╭━━━━━━━━━━━━━━━━━━━━━╮
┃ 🌸 *Explore e Divirta-se!* 🌸
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
};

module.exports = menu;