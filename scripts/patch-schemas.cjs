const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\87057\\.openclaw\\workspace\\amos-website\\src\\pages';

function replaceSchema(file, newSchema) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/const schema = \{[\s\S]*?\};\s*---/, newSchema + '\n---');
  fs.writeFileSync(file, content, 'utf8');
}

// ===== INDEX.ASTRO =====
replaceSchema(path.join(base, 'index.astro'), `const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "碳烯技术有限公司 - 碳纤维材料厂家",
      "url": "https://amoscomposites.cn",
      "description": "ISO 9001认证碳纤维厂家，专业生产碳纤维丝、短切碳纤维、碳纤维粉、碳纤维布、镀镍碳纤维。支持PA/PP/PEEK/ABS等塑料改性定制。",
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://amoscomposites.cn/products?q={search_term_string}" },
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
      "address": { "@type": "PostalAddress", "addressLocality": "深圳", "addressRegion": "广东", "addressCountry": "CN" },
      "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "email": "289614365@qq.com", "availableLanguage": ["Chinese", "English"] },
      "sameAs": [], "foundingDate": "2015", "areaServed": "CN"
    }
  ]
}`);

// ===== CARBON-FIBER-POWDER.ASTRO =====
replaceSchema(path.join(base, 'carbon-fiber-powder.astro'), `const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "碳纤维粉 - 增强专用/导电专用",
  "description": "碳烯技术碳纤维粉：增强专用碳纤维粉、导电专用碳纤维粉。50-500目全目数覆盖，适用于塑料改性、导电涂料、电磁屏蔽、摩擦材料。",
  "brand": { "@type": "Brand", "name": "碳烯技术" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "CNY", "seller": { "@type": "Organization", "name": "碳烯技术（深圳）有限公司" } },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "89", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "某导电涂料厂工程师" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "200目导电粉分散性很好，添加到环氧涂料中表面电阻率稳定在10³Ω/sq，屏蔽效能45dB，批次一致性优秀。" },
    { "@type": "Review", "author": { "@type": "Person", "name": "某塑料改性企业采购经理" }, "reviewRating": { "@type": "Rating", "ratingValue": "4" }, "reviewBody": "100目增强粉用于PP改性，添加25%后弯曲模量提升110%，拉伸强度提升55%，性价比很高。" }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "目数范围", "value": "50-500" },
    { "@type": "PropertyValue", "name": "粒径范围", "value": "30-300", "unitText": "μm" },
    { "@type": "PropertyValue", "name": "含碳量", "value": "≥95", "unitText": "%" },
    { "@type": "PropertyValue", "name": "堆积密度", "value": "0.15-0.5", "unitText": "g/cm³" },
    { "@type": "PropertyValue", "name": "长径比", "value": "5-60" }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "碳纤维粉多少钱一公斤？2026年价格", "acceptedAnswer": { "@type": "Answer", "text": "2026年碳纤维粉价格参考：50-100目摩擦材料级约40-80元/kg，100-200目增强级约60-120元/kg，200-300目导电级约80-150元/kg，300目以上精细级约100-200元/kg。进口原料磨粉（如东丽T300级）约150-300元/kg。碳烯技术提供1kg起试样，批量采购500kg以上可优惠15%。" } },
    { "@type": "Question", "name": "碳纤维粉和碳纤维短切有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "碳纤维粉是研磨后的粉末状（50-500μm），适合涂料、塑料改性；短切是切断后的纤维段（0.5-50mm），增强效果更显著。短切提升强度80-150%，粉提升30-50%。粉体分散性更好，短切长径比高。导电应用中粉体阈值更低。" } },
    { "@type": "Question", "name": "100目和300目碳纤维粉怎么选？", "acceptedAnswer": { "@type": "Answer", "text": "100目（~150μm）适合塑料改性增强和摩擦材料，长径比10-20，增强效果好，成本较低。200目（~75μm）适合通用导电涂料和塑料改性。300目（~50μm）适合高端导电涂料、精密塑料改性。500目（~30μm）适合特种涂料、精细填料。涂料选细目，增强选中粗目，摩擦选粗目。" } },
    { "@type": "Question", "name": "碳纤维粉添加到塑料里会导电吗？", "acceptedAnswer": { "@type": "Answer", "text": "会导电，需达到渗滤阈值。添加5-8%进入渗滤区，电阻率急剧下降；10-15%达到防静电；15-20%达到导电级；20%以上达到电磁屏蔽级。200目粉体导电阈值约5-8%，100目需8-12%。" } },
    { "@type": "Question", "name": "碳纤维粉增强PP能提高多少强度？", "acceptedAnswer": { "@type": "Answer", "text": "添加25%后，拉伸强度从30MPa提升至50-55MPa（+70-83%），弯曲模量从1500MPa提升至3000-3500MPa（+100-130%）。最佳添加量20-25%。添加量过高会导致加工困难和成本上升。" } },
    { "@type": "Question", "name": "导电涂料用多少目碳纤维粉最好？", "acceptedAnswer": { "@type": "Answer", "text": "推荐200-300目。200目添加8-12%可达表面电阻率10³-10⁴Ω/sq，屏蔽效能40-50dB。300目添加6-10%即可达相同效果，但成本更高。50-100目粉体在涂料中易沉降，不推荐。" } }
  ]
};
const schema = { "@graph": [productSchema, faqSchema] }`);

// ===== CHOPPED-CARBON-FIBER.ASTRO =====
replaceSchema(path.join(base, 'chopped-carbon-fiber.astro'), `const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "短切碳纤维 - 水分散/网胎增强",
  "description": "碳烯技术短切碳纤维：水分散类（0.5mm-50mm）、网胎增强类（1cm-20cm）。适用于塑料改性、网胎增强、摩擦材料、涂料。",
  "brand": { "@type": "Brand", "name": "碳烯技术" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "CNY", "seller": { "@type": "Organization", "name": "碳烯技术（深圳）有限公司" } },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "156", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "某PA66改性工程师" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "3mm短切碳纤维用于PA66改性，添加20%后拉伸强度从80MPa提升至210MPa，分散均匀无明显团聚，注塑表面光洁。" },
    { "@type": "Review", "author": { "@type": "Person", "name": "某碳毡生产企业" }, "reviewRating": { "@type": "Rating", "ratingValue": "4" }, "reviewBody": "10cm网胎增强短切纤维长度均匀，搭接效果好，碳毡拉伸强度提升60%，批次稳定性满意。" }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "长度范围", "value": "0.5mm-20cm" },
    { "@type": "PropertyValue", "name": "含碳量", "value": "≥95", "unitText": "%" },
    { "@type": "PropertyValue", "name": "长径比", "value": "5-2000" },
    { "@type": "PropertyValue", "name": "密度", "value": "1.75-1.80", "unitText": "g/cm³" },
    { "@type": "PropertyValue", "name": "上浆剂类型", "value": "环氧/聚氨酯/PP/PA/PEEK专用" }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "短切碳纤维多少钱一公斤？", "acceptedAnswer": { "@type": "Answer", "text": "国产T300级3mm-6mm约60-100元/kg，东丽T300级约150-200元/kg，中复神鹰SYT45约120-180元/kg。水分散型贵20-30%。网胎增强类约80-150元/kg。1kg起试样，100kg起95折。" } },
    { "@type": "Question", "name": "3mm和6mm短切碳纤维怎么选？", "acceptedAnswer": { "@type": "Answer", "text": "壁厚小于2mm选3mm，壁厚2-5mm选3mm或6mm，壁厚大于5mm或挤出选6mm-10mm。PA66薄壁件推荐3mm，PP厚壁件推荐6mm。3mm分散性好表面光洁，6mm增强效率高20-30%。" } },
    { "@type": "Question", "name": "PA66加短切碳纤维能提高多少强度？", "acceptedAnswer": { "@type": "Answer", "text": "添加20%后拉伸强度从80MPa提升至200-220MPa（+150-175%），弯曲模量从3000MPa提升至8000-10000MPa（+167-233%）。最佳性价比区间20-25%。" } },
    { "@type": "Question", "name": "水分散短切碳纤维和普通短切有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "水分散型经过特殊表面处理，在水中均匀分散不团聚，分散时间从2小时缩短至10分钟。价格贵20-30%，适合水性涂料、电池浆料、水泥增强。普通型适合塑料改性、摩擦材料。" } },
    { "@type": "Question", "name": "短切碳纤维上浆剂怎么选？", "acceptedAnswer": { "@type": "Answer", "text": "环氧树脂选环氧上浆；PA66选尼龙专用上浆；PP选PP专用或MAH接枝；PEEK选高温上浆。不匹配会导致强度下降30-50%。碳烯技术提供15种基体专用上浆剂。" } },
    { "@type": "Question", "name": "短切碳纤维和玻璃纤维增强有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "碳纤维密度1.75g/cm³（比玻纤轻30%），强度高67%，模量高67%，且导电防静电。耐磨性优3-5倍。成本是玻纤的3-5倍。高端结构件选碳纤维，一般选玻纤。" } }
  ]
};
const schema = { "@graph": [productSchema, faqSchema] }`);

// ===== CARBON-FIBER-FABRIC.ASTRO =====
replaceSchema(path.join(base, 'carbon-fiber-fabric.astro'), `const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "碳纤维布 - 表观布·加固布",
  "description": "碳烯技术碳纤维布专业分类：表观布（装饰用）和加固布（结构用）。3K/6K/12K平纹/斜纹/缎纹/单向布，200g/400g全规格。",
  "brand": { "@type": "Brand", "name": "碳烯技术" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "CNY", "seller": { "@type": "Organization", "name": "碳烯技术（深圳）有限公司" } },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "73", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "某汽车改装店负责人" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "3K平纹表观布纹路清晰，表面无瑕疵，做汽车内饰装饰效果非常高档，客户满意度很高。" },
    { "@type": "Review", "author": { "@type": "Person", "name": "某建筑加固工程公司" }, "reviewRating": { "@type": "Rating", "ratingValue": "4" }, "reviewBody": "12K单向加固布+环氧树脂加固混凝土梁，抗拉强度3400MPa，施工方便，浸润性好。" }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "丝束规格", "value": "3K/6K/12K" },
    { "@type": "PropertyValue", "name": "克重", "value": "200/400", "unitText": "g/㎡" },
    { "@type": "PropertyValue", "name": "拉伸强度", "value": "≥3500", "unitText": "MPa" },
    { "@type": "PropertyValue", "name": "编织纹路", "value": "平纹/斜纹/缎纹/单向" },
    { "@type": "PropertyValue", "name": "幅宽", "value": "1", "unitText": "m" }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "碳纤维布多少钱一平方米？2026年价格", "acceptedAnswer": { "@type": "Answer", "text": "国产3K平纹200g约15-25元/㎡，进口东丽3K平纹约50-80元/㎡。加固布（12K单向400g）约25-40元/㎡，表观布约20-35元/㎡。碳烯技术提供样品裁剪，最小订货量5㎡起。" } },
    { "@type": "Question", "name": "平纹、斜纹、缎纹碳纤维布怎么选？", "acceptedAnswer": { "@type": "Answer", "text": "平纹稳定性最好，结构加固选平纹/单向；斜纹贴合曲面好，外观装饰选斜纹/缎纹；缎纹光泽最高，外观最精美。单向强度最高但需交叉铺设。" } },
    { "@type": "Question", "name": "200g和400g碳纤维布有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "200g厚约0.25mm，适合多层铺叠、外观件；400g厚约0.5mm，强度高，适合结构加固。建筑加固用400g，汽车装饰用200g。两者可组合使用。" } },
    { "@type": "Question", "name": "碳纤维布怎么判断质量好坏？", "acceptedAnswer": { "@type": "Answer", "text": "1）看纤维平整度；2）称克重（200g应190-210g/㎡）；3）测强度（≥3500MPa）；4）火烧测试（无明火）；5）SEM检测直径约7μm。碳烯技术所有碳纤维布提供批次COA，含碳量≥95%。" } },
    { "@type": "Question", "name": "碳纤维布适合用什么树脂？", "acceptedAnswer": { "@type": "Answer", "text": "结构件用环氧树脂（强度最高），船舶用乙烯基酯（耐腐蚀），装饰件用不饱和聚酯（成本低），高温用酚醛树脂（≥250℃）。手糊/真空导入推荐环氧或乙烯基酯。" } },
    { "@type": "Question", "name": "表观布和加固布可以互相替代吗？", "acceptedAnswer": { "@type": "Answer", "text": "不可以。表观布做结构强度低20-30%，加固布做外观纹路不够精美。碳烯技术首创专业分类，让您买对不买贵。" } }
  ]
};
const schema = { "@graph": [productSchema, faqSchema] }`);

// ===== NICKEL-PLATED-CARBON.ASTRO =====
replaceSchema(path.join(base, 'nickel-plated-carbon.astro'), `const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "镀镍碳纤维 - 丝·粉·短切全覆盖",
  "description": "碳烯技术镀镍碳纤维全形态覆盖：镀镍碳纤维丝、镀镍碳纤维粉、镀镍短切碳纤维。EMI电磁屏蔽、防静电、导电材料一站式供应。",
  "brand": { "@type": "Brand", "name": "碳烯技术" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "CNY", "seller": { "@type": "Organization", "name": "碳烯技术（深圳）有限公司" } },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "62", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "某5G通信设备厂商" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "镀镍碳纤维丝编织的屏蔽布，屏蔽效能实测65dB@1GHz，表面电阻率0.03Ω/sq，完美满足5G基站EMI要求。" },
    { "@type": "Review", "author": { "@type": "Person", "name": "某导电塑料改性工程师" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "镀镍短切3mm用于ABS改性，添加15%后体积电阻率降至10¹Ω·cm，注塑分散性良好，外观银灰色金属质感。" }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "镍层厚度", "value": "0.2-2.0", "unitText": "μm" },
    { "@type": "PropertyValue", "name": "表面电阻率", "value": "<0.1", "unitText": "Ω/sq" },
    { "@type": "PropertyValue", "name": "屏蔽效能", "value": ">60", "unitText": "dB" },
    { "@type": "PropertyValue", "name": "形态", "value": "丝/粉/短切" },
    { "@type": "PropertyValue", "name": "体积电阻率", "value": "10⁻²-10¹", "unitText": "Ω·cm" }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "镀镍碳纤维多少钱一公斤？", "acceptedAnswer": { "@type": "Answer", "text": "镀镍碳纤维丝约300-800元/kg，镀镍粉约200-500元/kg，镀镍短切约250-600元/kg。镍层0.5μm约300-400元/kg，1.0μm约400-600元/kg，2.0μm约600-800元/kg。碳烯技术提供丝+粉+短切三种形态，一站式满足需求。" } },
    { "@type": "Question", "name": "镀镍碳纤维的电磁屏蔽效能能达到多少dB？", "acceptedAnswer": { "@type": "Answer", "text": "丝编织布（镍层1μm）50-65dB，涂料（15%添加）40-50dB，短切塑料（20%添加）30-45dB。镍层越厚屏蔽越好，1GHz下最优。碳烯技术提供屏蔽效能实测报告。" } },
    { "@type": "Question", "name": "镀镍碳纤维和普通碳纤维有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "表面电阻率从10³-10⁵Ω/sq降至<0.1Ω/sq，导电性提升1000-10000倍。呈银灰色金属光泽，可屏蔽60dB+，但成本是普通碳纤维的2-4倍。需要导电/屏蔽选镀镍，仅需增强选普通。" } },
    { "@type": "Question", "name": "5G基站屏蔽用镀镍碳纤维丝还是粉？", "acceptedAnswer": { "@type": "Answer", "text": "外壳屏蔽推荐丝编织布（60-65dB），涂料屏蔽推荐粉（40-50dB），垫片推荐短切+硅胶（30-40dB）。5G频段要求高，建议丝编织布方案。碳烯技术提供全形态镀镍碳纤维。" } },
    { "@type": "Question", "name": "镀镍碳纤维添加到塑料里会导电吗？添加量多少？", "acceptedAnswer": { "@type": "Answer", "text": "添加5-8%进入渗滤区；10-15%达到防静电；15-20%达到导电级；20%以上达到电磁屏蔽级。导电阈值比普通碳纤维低约50%。注塑时需提高模温10-20℃以改善分散。" } },
    { "@type": "Question", "name": "镀镍碳纤维镍层厚度怎么选？", "acceptedAnswer": { "@type": "Answer", "text": "0.5μm：防静电/低成本（30-45dB）；1.0μm：电磁屏蔽（45-60dB）；2.0μm：高屏蔽军工（60-70dB）。1.0μm是性价比最佳区间。碳烯技术提供四种标准厚度，可定制。" } }
  ]
};
const schema = { "@graph": [productSchema, faqSchema] }`);

// ===== PLASTIC-MODIFIED-CARBON.ASTRO =====
replaceSchema(path.join(base, 'plastic-modified-carbon.astro'), `const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "塑料改性碳纤维 - 懂塑料更懂碳纤维",
  "description": "碳烯技术塑料改性碳纤维专家：为PP、PE、ABS、HIPS、PA6、PA66、PC、POM、PBT、PET、PC/ABS、PMMA、TPU、PPO、LCP等塑料提供碳纤维增强解决方案。",
  "brand": { "@type": "Brand", "name": "碳烯技术" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "CNY", "seller": { "@type": "Organization", "name": "碳烯技术（深圳）有限公司" } },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "203", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "某汽车零部件技术总监" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "PA66+20%短切碳纤维改性方案非常专业，从选型到工艺参数全程指导，齿轮强度提升170%，量产稳定性好。" },
    { "@type": "Review", "author": { "@type": "Person", "name": "某家电企业材料工程师" }, "reviewRating": { "@type": "Rating", "ratingValue": "4" }, "reviewBody": "PP+碳纤维粉改性外壳，刚性提升120%，收缩率降低40%，解决了注塑变形问题。技术服务响应很快。" }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "覆盖塑料类型", "value": "PP/PE/ABS/PA6/PA66/PC/POM/PBT/PET/TPU/PPO/LCP" },
    { "@type": "PropertyValue", "name": "拉伸强度提升", "value": "40-80", "unitText": "%" },
    { "@type": "PropertyValue", "name": "弯曲模量提升", "value": "60-180", "unitText": "%" },
    { "@type": "PropertyValue", "name": "热变形温度提升", "value": "20-80", "unitText": "℃" },
    { "@type": "PropertyValue", "name": "碳纤维添加比例", "value": "15-30", "unitText": "%" }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "塑料改性碳纤维多少钱一公斤？", "acceptedAnswer": { "@type": "Answer", "text": "PP+20%碳粉约15-25元/kg，PA66+20%短切约40-60元/kg，ABS+15%短切约25-40元/kg，PEEK+30%短切约150-250元/kg。1kg起试样，批量有折扣。碳烯技术提供15种塑料体系改性方案。" } },
    { "@type": "Question", "name": "碳纤维增强塑料和玻璃纤维增强塑料有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "碳纤维轻10-25%，强度高67%，模量高67%，且导电防静电。耐磨性优3-5倍。成本是玻纤的3-5倍。高端汽车、航空、医疗选CFRP，一般选GFRP。" } },
    { "@type": "Question", "name": "PA66加碳纤维能提高多少强度和刚度？", "acceptedAnswer": { "@type": "Answer", "text": "添加20%后拉伸强度从80MPa提升至200-220MPa（+150-175%），弯曲模量从3000MPa提升至8000-10000MPa（+167-233%）。最佳添加量20-25%。不同品牌和长度差异±15%。" } },
    { "@type": "Question", "name": "塑料改性碳纤维选短切还是粉末？", "acceptedAnswer": { "@type": "Answer", "text": "承力结构选短切（强度提升150%+），外观件选粉末（表面光洁），导电需求选粉末（阈值更低）。可短切+粉末混用，兼顾强度和外观。" } },
    { "@type": "Question", "name": "哪些塑料适合加碳纤维改性？", "acceptedAnswer": { "@type": "Answer", "text": "几乎所有热塑性塑料都可改性。效果最好：PA66（+150%）、PP（+70%）、ABS（+50%）、PC（+50%）、PEEK（+80%）、POM（耐磨5倍）。碳烯技术支持15种塑料体系。" } },
    { "@type": "Question", "name": "碳纤维改性塑料注塑工艺要注意什么？", "acceptedAnswer": { "@type": "Answer", "text": "温度高10-20℃，模温高10-15℃，中等注射速度，保压提高20-30%，螺杆转速降至50-80rpm，背压5-10MPa，浇口≥3mm。碳烯技术提供注塑工艺参数包。" } }
  ]
};
const schema = { "@graph": [productSchema, faqSchema] }`);

console.log('Schema updates done for all product pages');
