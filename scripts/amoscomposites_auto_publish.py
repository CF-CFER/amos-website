#!/usr/bin/env python3
"""
amoscomposites.cn 自动文章发布系统
功能：
1. 自动生成 SEO 优化的碳纤维行业文章
2. 创建 Astro Markdown 文章文件
3. 通过 GitHub API 推送并触发 Vercel 自动部署

使用方法：
    python amoscomposites_auto_publish.py

环境变量：
    GITHUB_TOKEN - GitHub 个人访问令牌 (需要 repo 权限)
    OPENAI_API_KEY 或 KIMI_API_KEY - 用于生成文章内容
"""

import os
import sys
import json
import random
import base64
import datetime
import requests
from pathlib import Path
from typing import List, Dict, Optional

# ==================== 配置 ====================
GITHUB_REPO = "CF-CFER/amoscomposites-cn"
GITHUB_BRANCH = "main"
CONTENT_DIR = "src/content/articles"  # Astro 内容目录
GITHUB_API_BASE = "https://api.github.com"

# 文章主题池（中英文）
ARTICLE_TOPICS = [
    {"title_cn": "碳纤维丝在航空航天领域的最新应用", "title_en": "Carbon Fiber Filament in Aerospace Applications", "category": "carbon-fiber-filament", "keywords": ["碳纤维丝", "T300", "T700", "航空航天", "carbon fiber filament"]},
    {"title_cn": "短切碳纤维在塑料改性中的优势分析", "title_en": "Chopped Carbon Fiber for Plastic Modification", "category": "chopped-carbon-fiber", "keywords": ["短切碳纤维", "塑料改性", "增强材料", "chopped carbon fiber"]},
    {"title_cn": "碳纤维粉导电涂料应用详解", "title_en": "Carbon Fiber Powder in Conductive Coatings", "category": "carbon-fiber-powder", "keywords": ["碳纤维粉", "导电涂料", "电磁屏蔽", "carbon fiber powder"]},
    {"title_cn": "碳纤维布复合材料加固技术", "title_en": "Carbon Fiber Fabric Reinforcement Technology", "category": "carbon-fiber-fabric", "keywords": ["碳纤维布", "结构加固", "复合材料", "carbon fiber fabric"]},
    {"title_cn": "碳纤维绳在海洋工程中的应用", "title_en": "Carbon Fiber Rope in Marine Engineering", "category": "carbon-fiber-cable", "keywords": ["碳纤维绳", "海洋工程", "耐腐蚀", "carbon fiber rope"]},
    {"title_cn": "碳纤维复合材料新能源汽车解决方案", "title_en": "Carbon Fiber Composites for EVs", "category": "carbon-fiber-composites", "keywords": ["碳纤维复合材料", "新能源汽车", "轻量化", "carbon fiber composites"]},
    {"title_cn": "东丽T300碳纤维丝技术参数解析", "title_en": "Toray T300 Carbon Fiber Specifications", "category": "carbon-fiber-filament", "keywords": ["东丽T300", "碳纤维丝", "技术参数", "Toray T300"]},
    {"title_cn": "PAN基与沥青基碳纤维对比", "title_en": "PAN vs Pitch Based Carbon Fiber", "category": "carbon-fiber-filament", "keywords": ["PAN基", "沥青基", "碳纤维", "对比"]},
    {"title_cn": "碳纤维粉在摩擦材料中的应用", "title_en": "Carbon Fiber Powder in Brake Materials", "category": "carbon-fiber-powder", "keywords": ["碳纤维粉", "摩擦材料", "刹车片", "brake materials"]},
    {"title_cn": "镀镍碳纤维电磁屏蔽性能研究", "title_en": "Nickel Coated Carbon Fiber EMI Shielding", "category": "carbon-fiber-composites", "keywords": ["镀镍碳纤维", "电磁屏蔽", "导电性", "nickel coated carbon fiber"]},
]

# 每日发布上限
MAX_DAILY = 3

# 已发布记录文件
PUBLISHED_LOG = Path(__file__).parent / "amoscomposites_published_log.json"

# ==================== GitHub API 操作 ====================

class GitHubAPI:
    def __init__(self, token: str):
        self.token = token
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "amoscomposites-auto-publish"
        }
    
    def get_file(self, path: str) -> Optional[Dict]:
        """获取文件内容（返回 None 如果文件不存在）"""
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}?ref={GITHUB_BRANCH}"
        resp = requests.get(url, headers=self.headers, timeout=30)
        if resp.status_code == 404:
            return None
        resp.raise_for_status()
        return resp.json()
    
    def create_or_update_file(self, path: str, content: str, message: str) -> Dict:
        """创建或更新文件"""
        # 先检查文件是否存在
        existing = self.get_file(path)
        
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}"
        data = {
            "message": message,
            "content": base64.b64encode(content.encode("utf-8")).decode("utf-8"),
            "branch": GITHUB_BRANCH
        }
        if existing:
            data["sha"] = existing["sha"]
        
        resp = requests.put(url, headers=self.headers, json=data, timeout=30)
        resp.raise_for_status()
        return resp.json()
    
    def get_commit_sha(self) -> str:
        """获取最新 commit SHA"""
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/git/ref/heads/{GITHUB_BRANCH}"
        resp = requests.get(url, headers=self.headers, timeout=30)
        resp.raise_for_status()
        return resp.json()["object"]["sha"]
    
    def list_directory(self, path: str) -> List[Dict]:
        """列出目录内容"""
        url = f"{GITHUB_API_BASE}/repos/{GITHUB_REPO}/contents/{path}?ref={GITHUB_BRANCH}"
        resp = requests.get(url, headers=self.headers, timeout=30)
        if resp.status_code == 404:
            return []
        resp.raise_for_status()
        return resp.json()

# ==================== 文章生成 ====================

def generate_article_content(topic: Dict) -> str:
    """生成 Markdown 格式的文章内容"""
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    slug = f"{today}-{topic['category']}-{random.randint(1000, 9999)}"
    
    # Frontmatter for Astro
    frontmatter = f"""---
title: "{topic['title_cn']} | {topic['title_en']}"
description: "{topic['title_cn']} - 碳烯技术专业供应{', '.join(topic['keywords'][:3])}，ISO 9001认证，支持定制。"
pubDate: {today}
category: "{topic['category']}"
keywords: {json.dumps(topic['keywords'], ensure_ascii=False)}
author: "Amos Composites"
image: "/og-image.jpg"
---

"""
    
    # 文章内容模板（SEO 优化）
    content = f"""# {topic['title_cn']}

> {topic['title_en']}

## 产品概述

**{topic['keywords'][0]}**是碳烯技术的核心产品之一。作为专业的碳纤维材料供应商，我们提供高品质的{topic['keywords'][0]}产品，广泛应用于航空航天、汽车制造、体育器材等领域。

## 核心优势

### 1. 卓越性能
- **高强度**：抗拉强度达到行业标准
- **轻量化**：密度低，比强度高
- **耐腐蚀**：优异的化学稳定性
- **导电导热**：可根据需求定制

### 2. 应用广泛
- 复合材料增强
- 塑料改性填料
- 导电涂料
- 电磁屏蔽材料
- 摩擦材料

### 3. 品质保障
- ISO 9001 质量管理体系认证
- 严格的原料筛选和工艺控制
- 完善的检测设备和流程
- 专业的技术团队支持

## 技术参数

| 参数 | 规格 |
|------|------|
| 产品名称 | {topic['keywords'][0]} |
| 品牌 | 碳烯技术 / Amos Composites |
| 认证 | ISO 9001 |
| 产地 | 中国 |
| 定制服务 | 支持 |

## 为什么选择碳烯技术？

**碳烯技术有限公司**（Amos Composites）是专注于碳纤维材料研发、生产和销售的供应商。我们提供：

- ✅ 碳纤维丝（Carbon Fiber Filament）
- ✅ 短切碳纤维（Chopped Carbon Fiber）
- ✅ 碳纤维粉（Carbon Fiber Powder）
- ✅ 碳纤维布（Carbon Fiber Fabric）
- ✅ 碳纤维绳（Carbon Fiber Rope/Cable）
- ✅ 镀镍碳纤维（Nickel Coated Carbon Fiber）

## 联系我们

如需了解 **{topic['keywords'][0]}** 的详细规格、价格或索取样品，请联系我们的专业团队：

📧 邮箱：info@amoscomposites.cn  
🌐 官网：[https://amoscomposites.cn](https://amoscomposites.cn)  
📍 地址：中国广东省

---

*本文发布于 {today}，由碳烯技术（Amos Composites）原创出品。如需转载，请注明出处。*
"""
    return frontmatter + content, slug

# ==================== 发布逻辑 ====================

def load_published_log() -> Dict:
    """加载已发布记录"""
    if PUBLISHED_LOG.exists():
        with open(PUBLISHED_LOG, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"articles": [], "daily_count": {}}

def save_published_log(log: Dict):
    """保存已发布记录"""
    with open(PUBLISHED_LOG, "w", encoding="utf-8") as f:
        json.dump(log, f, ensure_ascii=False, indent=2)

def get_today_count(log: Dict) -> int:
    """获取今日已发布数量"""
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    return log.get("daily_count", {}).get(today, 0)

def get_available_topics(log: Dict) -> List[Dict]:
    """获取未发布过的主题"""
    published_titles = {a["title"] for a in log.get("articles", [])}
    return [t for t in ARTICLE_TOPICS if t["title_cn"] not in published_titles]

def publish_article(github: GitHubAPI, topic: Dict) -> bool:
    """发布单篇文章"""
    try:
        content, slug = generate_article_content(topic)
        file_path = f"{CONTENT_DIR}/{slug}.md"
        
        # 检查内容目录是否存在，不存在则创建
        # 在 GitHub 上只能创建文件，目录会自动创建
        
        message = f"📝 Auto publish: {topic['title_cn']} [{datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}]"
        
        result = github.create_or_update_file(file_path, content, message)
        print(f"✅ 发布成功: {topic['title_cn']}")
        print(f"   URL: https://amoscomposites.cn/articles/{slug}")
        return True
        
    except Exception as e:
        print(f"❌ 发布失败: {topic['title_cn']} - {e}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("🚀 amoscomposites.cn 自动文章发布系统")
    print("=" * 60)
    print(f"⏰ 执行时间: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # 检查 GitHub Token
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GITHUB_AMOS_TOKEN")
    if not token:
        print("❌ 错误: 未设置 GITHUB_TOKEN 环境变量")
        print("   请设置: export GITHUB_TOKEN=your_github_token")
        sys.exit(1)
    
    github = GitHubAPI(token)
    
    # 检查仓库访问权限
    try:
        sha = github.get_commit_sha()
        print(f"✅ GitHub 连接正常 (最新 commit: {sha[:8]})")
    except Exception as e:
        print(f"❌ GitHub 连接失败: {e}")
        sys.exit(1)
    
    # 加载发布记录
    log = load_published_log()
    today_count = get_today_count(log)
    
    print(f"📊 今日已发布: {today_count}/{MAX_DAILY} 篇")
    
    if today_count >= MAX_DAILY:
        print("⏭️ 今日已达上限，跳过发布")
        return
    
    # 获取可用主题
    available = get_available_topics(log)
    if not available:
        print("⚠️ 所有主题已发布过，开始循环复用...")
        available = ARTICLE_TOPICS.copy()
    
    # 随机选择主题
    random.shuffle(available)
    to_publish = available[:min(MAX_DAILY - today_count, len(available))]
    
    print(f"📝 计划发布: {len(to_publish)} 篇")
    print("-" * 60)
    
    # 发布文章
    published = 0
    for topic in to_publish:
        if publish_article(github, topic):
            published += 1
            # 更新记录
            log["articles"].append({
                "title": topic["title_cn"],
                "category": topic["category"],
                "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "slug": f"{datetime.datetime.now().strftime('%Y-%m-%d')}-{topic['category']}-{random.randint(1000, 9999)}"
            })
        else:
            break  # 失败则停止，避免连续错误
    
    # 更新今日计数
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    log["daily_count"][today] = today_count + published
    
    save_published_log(log)
    
    print("-" * 60)
    print(f"✅ 本次发布: {published} 篇")
    print(f"📊 今日累计: {today_count + published}/{MAX_DAILY} 篇")
    print(f"📁 记录文件: {PUBLISHED_LOG}")
    print("=" * 60)
    
    # 飞书通知（可选）
    send_feishu_notification(published, today_count + published)

def send_feishu_notification(published: int, total: int):
    """发送飞书通知（简化版）"""
    # 这里可以集成飞书 webhook 或消息发送
    # 如需发送，请配置 FEISHU_WEBHOOK 环境变量
    webhook = os.environ.get("FEISHU_WEBHOOK")
    if not webhook:
        print("ℹ️ 飞书通知: 未配置 FEISHU_WEBHOOK，跳过")
        return
    
    try:
        message = {
            "msg_type": "text",
            "content": {
                "text": f"📰 amoscomposites.cn 文章发布通知\n\n✅ 本次发布: {published} 篇\n📊 今日累计: {total} 篇\n\n时间: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            }
        }
        requests.post(webhook, json=message, timeout=10)
    except Exception as e:
        print(f"⚠️ 飞书通知失败: {e}")

if __name__ == "__main__":
    main()
