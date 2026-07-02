const fs = require('fs');
const path = require('path');
const base = 'C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\src\\pages';

function insertAfter(file, marker, content) {
  let text = fs.readFileSync(file, 'utf8');
  if (text.includes('选型解决方案')) { console.log('Skip', path.basename(file)); return; }
  text = text.replace(marker, marker + '\n' + content);
  fs.writeFileSync(file, text, 'utf8');
  console.log('Updated', path.basename(file));
}

insertAfter(path.join(base, 'carbon-fiber-filament.astro'), '  <!-- 东丽详细型号 -->', fs.readFileSync('C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\scripts\\sections-filament.txt', 'utf8'));
insertAfter(path.join(base, 'carbon-fiber-powder.astro'), '  <section style="background: var(--bg-alt); padding: 64px 24px;">\n    <div style="max-width: 1200px; margin: 0 auto;">\n      <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 16px; text-align: center;">\n        碳纤维粉规格参数表', fs.readFileSync('C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\scripts\\sections-powder.txt', 'utf8'));
insertAfter(path.join(base, 'chopped-carbon-fiber.astro'), '  <section style="background: var(--bg-alt); padding: 64px 24px;">\n    <div style="max-width: 1200px; margin: 0 auto;">\n      <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 16px; text-align: center;">\n        短切碳纤维规格参数表', fs.readFileSync('C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\scripts\\sections-chopped.txt', 'utf8'));
insertAfter(path.join(base, 'carbon-fiber-fabric.astro'), '  <section style="background: var(--bg-alt); padding: 64px 24px;">\n    <div style="max-width: 1200px; margin: 0 auto;">\n      <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 16px; text-align: center;">碳纤维布规格参数表', fs.readFileSync('C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\scripts\\sections-fabric.txt', 'utf8'));
insertAfter(path.join(base, 'nickel-plated-carbon.astro'), '  <section style="background: var(--bg-alt); padding: 64px 24px;">\n    <div style="max-width: 1200px; margin: 0 auto;">\n      <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 16px; text-align: center;">应用领域', fs.readFileSync('C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\scripts\\sections-nickel.txt', 'utf8'));
insertAfter(path.join(base, 'plastic-modified-carbon.astro'), '  <section style="background: var(--bg-alt); padding: 64px 24px;">\n    <div style="max-width: 1200px; margin: 0 auto;">\n      <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 16px; text-align: center;">\n        改性效果数据', fs.readFileSync('C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\scripts\\sections-plastic.txt', 'utf8'));

console.log('Done');
