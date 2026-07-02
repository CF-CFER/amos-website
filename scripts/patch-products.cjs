const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\src\\pages';

// ============================================
// INDEX.ASTRO - Add WebSite schema
// ============================================
const indexPath = path.join(base, 'index.astro');
let index = fs.readFileSync(indexPath, 'utf8');
index = index.replace(
  /const schema = \{[\s\S]*?"sameAs": \[\]\s*\};\s*---/,
  `const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "碳烯技术有限公司 - 碳纤维材料厂家",
      "url": "https://amoscomposites.cn",
      "description": "ISO 9001认证碳纤维厂家，专业生产碳纤维丝、短切碳纤维、碳纤维粉、碳纤维布、镀镍碳纤维。支持PA/PP/PEEK/ABS等塑料改性定制。",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://amoscomposites.cn/products?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "碳烯技术（深圳）有限公司",
      "alternateName": "Carbene Technology (Shenzhen) Co., Ltd.",
      "url": "https://amoscomposites.cn",
      "logo": "https://amoscomposites.cn/logo.png",
      "description": "ISO 9001认证碳纤维材料厂家，专业生产碳纤维丝、短切碳纤维、碳纤维粉、碳纤维布、镀镍碳纤维。支持PA/PP/PEEK/ABS等塑料改性定制。",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "深圳",
        "addressRegion": "广东",
        "addressCountry": "CN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "289614365@qq.com",
        "availableLanguage": ["Chinese", "English"]
      },
      "sameAs": [],
      "foundingDate": "2015",
      "areaServed": "CN"
    }
  ]
};\n---`
);
fs.writeFileSync(indexPath, index, 'utf8');
console.log('Updated index.astro');

// ============================================
// CARBON-FIBER-FILAMENT.ASTRO - Insert sections
// ============================================
const filamentPath = path.join(base, 'carbon-fiber-filament.astro');
let filament = fs.readFileSync(filamentPath, 'utf8');

const filamentSections = `
  <!-- Section 1: 应用场景解决方案 -->
  <section style="background: var(--bg-alt); padding: 80px 24px;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 56px;">
        <h2 style="font-size: 2rem; font-weight: 800; color: var(--primary); margin-bottom: 12px;">碳纤维丝在5大行业的选型解决方案</h2>
        <p style="color: var(--text-light); max-width: 700px; margin: 0 auto;">根据行业特性匹配最佳型号，从T300到T1100，从1K到24K，精准选型不浪费</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <div style="padding: 28px; background: white; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;">🏭 塑料改性增强</h3>
          <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.7; margin-bottom: 12px;"><strong>方案：</strong>PA66+20%短切碳纤维丝（3mm-6mm），抗拉强度从80MPa提升至210MPa，提升162%</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>推荐型号：</strong>中复神鹰SYT45、东丽T300-12K</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>案例：</strong>某汽车零部件供应商用SYT45改性PA66，齿轮强度提升170%，重量减轻35%</p>
        </div>
        <div style="padding: 28px; background: white; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;">✈️ 航空航天结构件</h3>
          <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.7; margin-bottom: 12px;"><strong>方案：</strong>T800SC-12K预浸料+热压罐成型，拉伸强度5880MPa，孔隙率≤1%</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>推荐型号：</strong>东丽T800SC-12K、T1100G-12K</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>案例：</strong>某无人机厂商用T800SC-12K制造机臂，减重40%，刚度提升300%</p>
        </div>
        <div style="padding: 28px; background: white; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;">🚗 汽车轻量化</h3>
          <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.7; margin-bottom: 12px;"><strong>方案：</strong>T700SC-12K缠绕成型CNG气瓶/储氢瓶，爆破压力≥70MPa，循环寿命≥15000次</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>推荐型号：</strong>东丽T700SC-12K、T700GC-12K</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>案例：</strong>某新能源汽车电池壳体采用T700SC碳纤维，减重48%，耐腐蚀性提升10倍</p>
        </div>
        <div style="padding: 28px; background: white; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;">🏸 体育器材制造</h3>
          <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.7; margin-bottom: 12px;"><strong>方案：</strong>3K平纹编织+T300级环氧树脂，拍框模量≥35GPa，击球反馈提升25%</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>推荐型号：</strong>东丽T300-3K、光威GW-T300-3K</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>案例：</strong>某自行车品牌用T300-3K制造车架，整车重量降至6.8kg，刚性提升200%</p>
        </div>
        <div style="padding: 28px; background: white; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin-bottom: 10px;">🏗️ 建筑加固</h3>
          <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.7; margin-bottom: 12px;"><strong>方案：</strong>12K单向布+环氧树脂浸渍，抗拉强度≥3400MPa，弹性模量≥240GPa</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>推荐型号：</strong>东丽T300-12K、中复神鹰SYT19-12K</p>
          <p style="color: var(--text-light); font-size: 0.85rem; line-height: 1.6;"><strong>案例：</strong>某桥梁加固项目用T300-12K单向布，承载能力提升45%，使用寿命延长30年</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: 常见问题解答（FAQ） -->
  <section style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 56px;">
      <h2 style="font-size: 2rem; font-weight: 800; color: var(--primary); margin-bottom: 12px;">碳纤维丝常见问题解答</h2>
      <p style="color: var(--text-light); max-width: 700px; margin: 0 auto;">采购工程师和技术人员最常问的问题，基于10年+行业经验整理</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <div style="padding: 24px; background: white; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Q: PA66加碳纤维丝能提高多少强度？</h4>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">A: 添加20%短切碳纤维丝（3mm-6mm），PA66拉伸强度从80MPa提升至200MPa以上，提升约150%；弯曲模量从3000MPa提升至8000MPa，提升约167%。</p>
      </div>
      <div style="padding: 24px; background: white; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Q: 东丽T300和T700碳纤维丝有什么区别？</h4>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">A: T300拉伸强度3530MPa，T700SC为4900MPa（高39%），两者模量均为230GPa。T700密度1.80g/cm³略高，断裂伸长率2.1%优于T300的1.5%。</p>
      </div>
      <div style="padding: 24px; background: white; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Q: 1K和3K碳纤维丝哪个更适合无人机？</h4>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">A: 推荐3K。3K丝束3000根单丝，直径约0.3mm，编织布纹路美观、性价比高，是无人机机架主流选择。高端竞速机可选1K+3K混编。</p>
      </div>
      <div style="padding: 24px; background: white; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Q: 碳纤维丝多少钱一公斤？2026年最新价格</h4>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">A: 国产T300级12K约80-120元/kg，中复神鹰SYT45约150-200元/kg，东丽T300-12K约200-300元/kg，东丽T700SC-12K约350-500元/kg，东丽T1100G约1200-1800元/kg。</p>
      </div>
      <div style="padding: 24px; background: white; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Q: 如何判断碳纤维丝的真假？</h4>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">A: 1）看包装原厂标签和溯源码；2）查COA质检报告；3）测密度（真碳纤1.75-1.80g/cm³，玻纤染色假货2.5g/cm³+）；4）火烧测试（真碳纤无明火）；5）SEM检测直径约7μm。</p>
      </div>
      <div style="padding: 24px; background: white; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Q: PAN基和沥青基碳纤维丝怎么选？</h4>
        <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">A: 需要强度选PAN基（T300/T700/T800，强度3.5-7.0GPa）；需要高模量/导热选沥青基（M40J/M55J，模量300-900GPa）。大多数场景选PAN基即可。</p>
      </div>
    </div>
  </section>

  <!-- Section 3: 选型指南 -->
  <section style="background: var(--bg-alt); padding: 80px 24px;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 56px;">
        <h2 style="font-size: 2rem; font-weight: 800; color: var(--primary); margin-bottom: 12px;">如何快速选对碳纤维丝型号</h2>
        <p style="color: var(--text-light); max-width: 700px; margin: 0 auto;">4步决策法，从需求到选型，10分钟锁定最佳型号</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;">
        <div style="display: flex; gap: 16px;">
          <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">01</div>
          <div>
            <h4 style="font-weight: 700; margin-bottom: 6px;">确定应用领域</h4>
            <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">塑料改性→选短切/3K-12K；航空航天→选T700+；体育器材→选3K编织；建筑加固→选12K单向；汽车→选T700缠绕。</p>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">02</div>
          <div>
            <h4 style="font-weight: 700; margin-bottom: 6px;">选择丝束规格</h4>
            <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">1K/3K：外观细腻，成本高，适合高端产品；6K：平衡型；12K：成本最低，效率最高，适合工业大批量；24K：超大批量，风电/建筑。</p>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">03</div>
          <div>
            <h4 style="font-weight: 700; margin-bottom: 6px;">选择品牌等级</h4>
            <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">预算有限→国产T300（80-120元/kg）；性价比→中复神鹰SYT45/SYT55（150-250元/kg）；高端认证→东丽T700/T800（350-900元/kg）；极致性能→T1100/M55J（1200元+/kg）。</p>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">04</div>
          <div>
            <h4 style="font-weight: 700; margin-bottom: 6px;">确认上浆剂类型</h4>
            <p style="color: var(--text-light); font-size: 0.9rem; line-height: 1.6;">环氧树脂体系→环氧上浆剂（SC版）；乙烯基酯→专用偶联剂；酚醛树脂→酚醛适配上浆；塑料改性→无浆或特殊上浆。上浆剂不匹配会导致层间剪切强度下降30-50%。</p>
          </div>
        </div>
      </div>
    </div>
  </section>

`;

filament = filament.replace(
  '  <!-- 东丽详细型号 -->\n  <section style="background: var(--bg-alt); padding: 64px 24px;">',
  filamentSections + '  <!-- 东丽详细型号 -->\n  <section style="background: var(--bg-alt); padding: 64px 24px;">'
);
fs.writeFileSync(filamentPath, filament, 'utf8');
console.log('Updated carbon-fiber-filament.astro');

console.log('All product page inserts done!');
