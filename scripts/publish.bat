@echo off
chcp 65001
cls

echo ============================================
echo 🚀 amoscomposites.cn 一键发布脚本
echo ============================================
echo.

:: 检查 Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 Python
    echo    请安装 Python 3.8+ 并添加到 PATH
    pause
    exit /b 1
)

echo ✅ Python 已安装

:: 检查环境变量
if "%GITHUB_TOKEN%"=="" (
    echo ⚠️ 警告: GITHUB_TOKEN 环境变量未设置
    echo    请设置后再运行: set GITHUB_TOKEN=your_token
    pause
    exit /b 1
)

echo ✅ GITHUB_TOKEN 已配置

:: 执行发布
echo.
echo 📝 开始发布文章...
echo.
python "%~dp0amoscomposites_auto_publish.py"

if errorlevel 1 (
    echo.
    echo ❌ 发布失败
    pause
    exit /b 1
)

echo.
echo ✅ 发布完成
echo.

:: 发送通知（可选）
if not "%FEISHU_WEBHOOK%"=="" (
    echo 📧 飞书通知已配置
) else (
    echo ℹ️ 未配置飞书通知（设置 FEISHU_WEBHOOK 环境变量）
)

echo.
pause
