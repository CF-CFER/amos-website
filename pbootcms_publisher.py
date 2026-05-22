#!/usr/bin/env python3
"""
PbootCMS 文章自动发布脚本
从 /opt/amos/content/articles/ 读取 Markdown 文章
插入到 PbootCMS SQLite 数据库
"""

import sqlite3
import os
import re
import glob
from datetime import datetime
import hashlib

# 配置
DB_PATH = "/www/wwwroot/www.amoscomposites.cn/data/279c723e3414937bff75e001617f0e35.db"
ARTICLES_DIR = "/opt/amos/content/articles"
PUBLISHED_LOG = "/opt/amos/published_log.json"

# PbootCMS 内容分类 scode - 使用"科技期刊"
SCODE = "7"  # 科技期刊

def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def parse_markdown_file(filepath):
    """解析 Markdown 文件，提取标题和内容"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取标题 (假设第一行是标题，或包含 # 标题)
    title = ""
    lines = content.split('\n')
    
    # 查找 YAML frontmatter 中的 title
    if content.startswith('---'):
        # 有 frontmatter
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            # 提取 title
            title_match = re.search(r'title:\s*["\']?(.+?)["\']?\s*$', frontmatter, re.MULTILINE)
            if title_match:
                title = title_match.group(1).strip()
            # 去掉 frontmatter，获取正文
            body = parts[2].strip()
        else:
            body = content
    else:
        body = content
        # 尝试从第一行获取标题
        if lines and lines[0].startswith('# '):
            title = lines[0][2:].strip()
    
    # 如果没有提取到标题，使用文件名
    if not title:
        filename = os.path.basename(filepath)
        title = filename.replace('.md', '').replace('-', ' ')
    
    # 提取 keywords 和 description
    keywords = "碳纤维,碳烯技术,复合材料"
    description = body[:200].replace('\n', ' ').strip() if body else title
    
    return {
        'title': title,
        'content': body,
        'keywords': keywords,
        'description': description[:500]
    }

def get_next_id(conn):
    """获取下一个文章 ID"""
    cursor = conn.cursor()
    cursor.execute("SELECT MAX(id) FROM ay_content")
    result = cursor.fetchone()
    return (result[0] or 0) + 1

def get_next_sorting(conn, scode):
    """获取该分类下的最大排序值"""
    cursor = conn.cursor()
    cursor.execute("SELECT MAX(sorting) FROM ay_content WHERE scode=?", (scode,))
    result = cursor.fetchone()
    return (result[0] or 0) + 1

def generate_acode():
    """生成随机 acode"""
    return hashlib.md5(str(datetime.now().timestamp()).encode()).hexdigest()[:10]

def article_exists(conn, title):
    """检查文章是否已存在"""
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM ay_content WHERE title=?", (title,))
    return cursor.fetchone()[0] > 0

def insert_article(conn, article_data):
    """插入文章到数据库"""
    cursor = conn.cursor()
    
    article_id = get_next_id(conn)
    acode = generate_acode()
    sorting = get_next_sorting(conn, SCODE)
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    date_str = datetime.now().strftime('%Y-%m-%d')
    
    sql = """
    INSERT INTO ay_content (
        id, acode, scode, title, titlecolor, subtitle, filename,
        author, source, outlink, date, ico, pics,
        content, tags, enclosure, keywords, description,
        sorting, status, islink, istop, isrecommend, isheadline,
        visits, likes, oppose, create_user, update_user,
        create_time, update_time, gtype, gid, gnote, picstitle
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    
    values = (
        article_id,           # id
        acode,                # acode
        SCODE,                # scode - 科技期刊
        article_data['title'], # title
        '',                   # titlecolor
        '',                   # subtitle
        '',                   # filename
        'admin',              # author
        '碳烯技术',            # source
        '',                   # outlink
        date_str,             # date
        '',                   # ico
        '',                   # pics
        article_data['content'], # content
        '',                   # tags
        '',                   # enclosure
        article_data['keywords'],  # keywords
        article_data['description'], # description
        sorting,              # sorting
        '1',                  # status - 正常
        '0',                  # islink
        '0',                  # istop
        '0',                  # isrecommend
        '0',                  # isheadline
        0,                    # visits
        0,                    # likes
        0,                    # oppose
        'admin',              # create_user
        'admin',              # update_user
        now,                  # create_time
        now,                  # update_time
        '4',                  # gtype
        '',                   # gid
        '',                   # gnote
        ''                    # picstitle
    )
    
    try:
        cursor.execute(sql, values)
        conn.commit()
        return article_id
    except Exception as e:
        print(f"插入文章失败: {e}")
        conn.rollback()
        return None

def main():
    """主函数"""
    print("=" * 60)
    print("PbootCMS 文章自动发布脚本")
    print("=" * 60)
    
    # 检查数据库文件
    if not os.path.exists(DB_PATH):
        print(f"错误: 数据库文件不存在: {DB_PATH}")
        return
    
    # 检查文章目录
    if not os.path.exists(ARTICLES_DIR):
        print(f"错误: 文章目录不存在: {ARTICLES_DIR}")
        return
    
    # 获取所有 Markdown 文件
    md_files = glob.glob(os.path.join(ARTICLES_DIR, "*.md"))
    
    if not md_files:
        print("没有待发布的文章")
        return
    
    print(f"找到 {len(md_files)} 篇文章")
    print("-" * 60)
    
    # 连接数据库
    conn = get_db_connection()
    
    published_count = 0
    skipped_count = 0
    
    for filepath in md_files:
        filename = os.path.basename(filepath)
        
        # 解析文章
        article = parse_markdown_file(filepath)
        
        # 检查是否已存在
        if article_exists(conn, article['title']):
            print(f"跳过(已存在): {article['title']}")
            skipped_count += 1
            continue
        
        # 插入文章
        article_id = insert_article(conn, article)
        
        if article_id:
            print(f"✅ 发布成功[ID:{article_id}]: {article['title']}")
            published_count += 1
        else:
            print(f"❌ 发布失败: {article['title']}")
    
    conn.close()
    
    print("-" * 60)
    print(f"发布完成: 成功 {published_count} 篇, 跳过 {skipped_count} 篇")
    print("=" * 60)

if __name__ == "__main__":
    main()
