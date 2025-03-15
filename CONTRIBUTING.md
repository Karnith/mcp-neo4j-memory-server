# 贡献指南

感谢您考虑为MCP Neo4j Knowledge Graph Memory Server做出贡献！以下是一些指导原则，帮助您开始。

## 开发环境设置

1. Fork并克隆仓库
   ```bash
   git clone https://github.com/YOUR_USERNAME/mcp-neo4j-memory-server.git
   cd mcp-neo4j-memory-server
   ```

2. 安装依赖
   ```bash
   pnpm install
   ```

3. 启动Neo4j数据库
   可以使用Docker Compose启动Neo4j：
   ```bash
   docker-compose up -d
   ```

4. 构建项目
   ```bash
   pnpm build
   ```

5. 运行测试
   ```bash
   pnpm test
   ```

## 开发流程

1. 创建一个新分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 进行更改并确保代码符合项目风格
   ```bash
   pnpm lint
   ```

3. 运行测试确保一切正常
   ```bash
   pnpm test
   ```

4. 提交您的更改
   ```bash
   git commit -m "feat: add some feature"
   ```
   请遵循[Conventional Commits](https://www.conventionalcommits.org/)规范。

5. 推送到您的分支
   ```bash
   git push origin feature/your-feature-name
   ```

6. 创建Pull Request

## 代码风格

- 使用TypeScript编写所有代码
- 遵循项目的代码风格（使用Prettier格式化）
- 为所有公共API添加JSDoc注释
- 编写测试覆盖新功能

## 发布流程

项目使用[Changesets](https://github.com/changesets/changesets)管理版本和发布。

1. 添加changeset
   ```bash
   npx changeset add
   ```

2. 选择版本类型并添加更改说明

3. 提交changeset文件

项目维护者将在合并PR后处理版本发布。

## 问题和讨论

如果您有任何问题或想法，请创建一个Issue或在现有Issue上参与讨论。

感谢您的贡献！