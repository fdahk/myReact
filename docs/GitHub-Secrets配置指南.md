# GitHub Secrets配置指南

# 生成一对
ssh-keygen -f ~/.ssh/pettalk_deploy_new
  ↓
新的私钥：pettalk_deploy_new
新的公钥：pettalk_deploy_new.pub

为什么需要这3个Secrets？
核心目的：让GitHub能够SSH登录到你的服务器
1. 你push代码到GitHub
   ↓
2. GitHub Actions开始运行（在GitHub的服务器上）
   ↓
3. GitHub Actions需要SSH到你的服务器
   问题：怎么登录？
   ↓
4. 使用SSH密钥登录（就像你平时SSH登录）
   需要：
   - 服务器地址（SSH_HOST）
   - 登录用户名（SSH_USER）
   - 密钥（SSH_PRIVATE_KEY）
   ↓
5. 登录成功后执行命令：
   - cd /home/ubuntu/pettalk_bar
   - git pull
   - docker-compose up -d
   ↓
6. 服务器部署完成！



第1步：GitHub Actions发起连接
  "我想以ubuntu身份登录129.211.172.21"

第2步：服务器响应
  "好，请证明你是ubuntu"
  发送一个随机数据（挑战）

第3步：GitHub Actions用私钥签名
  用SSH_PRIVATE_KEY对数据签名
  "这是我用私钥签名的数据"

第4步：服务器验证
  用公钥（authorized_keys中的）验证签名
  "签名验证通过！✅ 你确实有私钥，请进！"

第5步：登录成功
  GitHub Actions可以在服务器执行命令了


## 仓库权限
从低到高：

1. Read（读取）
   - 只能查看代码
   - 不能修改

2. Triage（分类）  
   - 能管理Issue
   - 不能修改代码

3. Write（写入）
   - 能推送代码
   - 能创建分支
   - ❌ 不能配置Secrets

4. Maintain（维护）
   - 能管理仓库设置
   - ❌ 仍然不能配置Secrets

5. Admin（管理员）✅
   - 能配置Secrets
   - 能管理协作者
   - 几乎所有权限

6. Owner（所有者）✅
   - 完全控制
   - 能删除仓库



**仓库：** paaawow_backend  
**用途：** 配置CI/CD自动部署所需的密钥  
**配置次数：** 只需配置一次（除非换服务器或密钥泄露）

1. ✅ SSH密钥对已生成
   - 私钥：~/.ssh/pettalk_deploy
   - 公钥：~/.ssh/pettalk_deploy.pub
   
2. ✅ 公钥已添加到服务器
   - 服务器路径：~/.ssh/authorized_keys
   
3. ✅ 免密登录已验证成功

4. ✅ 私钥已复制到剪贴板
   - 可以直接粘贴到GitHub

---

## 📝 在GitHub配置Secrets（3个密钥）

### 步骤1：打开GitHub仓库Settings

```
1. 访问：https://github.com/Howard233366/paaawow_backend

2. 点击顶部导航栏的"Settings"

3. 左侧菜单找到"Secrets and variables"

4. 点击"Actions"

5. 看到"Repository secrets"页面
```

---

### 步骤2：添加SSH_PRIVATE_KEY（私钥）

```
1. 点击"New repository secret"按钮

2. 填写表单：

   Name（名称）:
   SSH_PRIVATE_KEY

   Secret（内容）:
   粘贴私钥（已在剪贴板，直接Cmd+V粘贴）
   
   应该是这样的格式：
   -----BEGIN OPENSSH PRIVATE KEY-----
   b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz
   c2gtZWQyNTUxOQAAACBdv009imJzx7noPuco0XvnF2KXxWYT8Sqe66Rqj9f5qgAA
   ... (多行内容)
   -----END OPENSSH PRIVATE KEY-----

3. 点击"Add secret"保存
```

---

### 步骤3：添加SSH_USER（用户名）

```
1. 再次点击"New repository secret"

2. 填写：

   Name:
   SSH_USER

   Secret:
   ubuntu

3. 点击"Add secret"
```

---

### 步骤4：添加SSH_HOST（服务器IP）

```
1. 再次点击"New repository secret"

2. 填写：

   Name:
   SSH_HOST

   Secret:
   129.211.172.21

3. 点击"Add secret"
```

---

## ✅ 配置完成验证

### 检查是否配置成功：

```
在GitHub仓库的 Settings → Secrets → Actions 页面

应该看到3个Secrets：
✅ SSH_PRIVATE_KEY   (Updated X seconds ago)
✅ SSH_USER          (Updated X seconds ago)  
✅ SSH_HOST          (Updated X seconds ago)
```

**注意：Secret的值会被隐藏，无法查看（安全设计）**

---

## 🧪 测试CI/CD

### 配置完成后测试：

```bash
# 1. 随便修改一个文件（触发部署）
cd /Users/mac/Desktop/paaawow_backend
echo "# Test CI/CD" >> README.md

# 2. 提交并推送
git add README.md
git commit -m "test: 测试CI/CD自动部署"
git push origin main

# 3. 查看GitHub Actions
打开：https://github.com/Howard233366/paaawow_backend/actions

# 4. 点击最新的workflow run

# 5. 查看进度：
   ✅ Pre-deployment Checks
   ⏳ Deploy Services (正在执行)
   ⏳ Post-deployment
   
# 6. 如果全部绿色勾 → 部署成功！
```

---

## 🔧 如果配置后仍然失败

### 可能的原因和解决：

**1. 私钥格式错误**
```
检查：私钥开头和结尾必须是
-----BEGIN OPENSSH PRIVATE KEY-----
-----END OPENSSH PRIVATE KEY-----

不能有多余的空格或换行
```

**2. 服务器Git仓库问题**
```
你的服务器连接的是Gitee，不是GitHub
需要手动git pull或配置镜像同步
```

**3. 服务器没有docker-compose.yml**
```
需要先手动同步一次代码
```

---

## 🎯 重要提醒

### Secrets配置的安全规则：

```
✅ 一定要做：
1. 不要在代码中硬编码密钥
2. 不要提交.env到Git
3. 不要截图或分享Secrets内容
4. 定期轮换密钥（建议每3-6个月）

✅ 可以做：
1. 同一个密钥用于多个Action
2. 在不同环境使用不同密钥
3. 删除后重新创建

❌ 不能做：
1. 看不到Secret的值（添加后无法查看）
2. 不能导出Secret
3. 只能删除后重新添加
```

---

## 📋 完整配置清单

### 在GitHub仓库配置（https://github.com/Howard233366/paaawow_backend/settings/secrets/actions）:

```
☐ SSH_PRIVATE_KEY
  - 值：私钥内容（已在剪贴板）
  - 用途：CI/CD SSH登录服务器
  
☐ SSH_USER
  - 值：ubuntu
  - 用途：SSH登录用户名
  
☐ SSH_HOST
  - 值：129.211.172.21
  - 用途：服务器IP地址
```

---

## 🚀 配置后的自动化流程

```
你的工作：
├── 写代码
├── git commit
└── git push

GitHub自动完成：
├── 运行测试
├── 代码检查
├── SSH到服务器
├── 拉取代码
├── 构建镜像
├── 部署服务
└── 通知结果

你什么都不用管！全自动！
```

---

**现在请按照以下步骤操作：**

1. **打开浏览器访问：**
   ```
   https://github.com/Howard233366/paaawow_backend/settings/secrets/actions
   ```

2. **点击"New repository secret"**

3. **添加第1个Secret：**
   - Name: `SSH_PRIVATE_KEY`
   - Value: **Cmd+V粘贴**（私钥已在剪贴板）

4. **重复添加第2个和第3个Secret**

5. **完成后告诉我，我帮你测试！**
