# MCP Neo4j Knowledge Graph Memory Server

[![npm version](https://img.shields.io/npm/v/@izumisy/mcp-neo4j-memory-server.svg)](https://www.npmjs.com/package/@izumisy/mcp-neo4j-memory-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.x-brightgreen)](https://neo4j.com/)

## Introduction

MCP Neo4j Knowledge Graph Memory Server is a knowledge graph memory server based on the Neo4j graph database, which is used to store and retrieve information during the interaction between AI assistants and users. This project is an enhanced version of the official [Knowledge Graph Memory Server](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) using Neo4j as the backend storage engine.

By using Neo4j as the storage backend, this project provides more powerful graph query capabilities, better performance and scalability, and is particularly suitable for building complex knowledge graph applications.

## Features

- 🚀 High-performance graph database storage based on Neo4j
- 🔍 Powerful fuzzy search and exact matching capabilities
- 🔄 Complete CRUD operations for entities, relationships, and observations
- 🌐 Fully compatible with the MCP protocol
- 📊 Supports complex graph queries and traversals
- 🐳 Docker support for easy deployment

## Installation

### Prerequisites

- Node.js >= 22.0.0
- Neo4j database (local or remote)

### Install via npm

```bash
# Install globally
npm install -g @jovanhsu/mcp-neo4j-memory-server

# Or install as a project dependency
npm install @jovanhsu/mcp-neo4j-memory-server
```

### Using Docker

```bash
# Start Neo4j and Memory Server using docker-compose
git clone https://github.com/JovanHsu/mcp-neo4j-memory-server.git
cd mcp-neo4j-memory-server
docker-compose up -d
```

### Environment Variable Configuration

The server is configured using the following environment variables:

| Environment Variable | Description               | Default Value          |
|-----------------------|---------------------------|------------------------|
| NEO4J_URI             | Neo4j database URI       | bolt://localhost:7687  |
| NEO4J_USER            | Neo4j username           | neo4j                  |
| NEO4J_PASSWORD        | Neo4j password           | password               |
| NEO4J_DATABASE        | Neo4j database name      | neo4j                  |

## Integration with Claude

### Configuration in Claude Desktop

Add the following configuration to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "graph-memory": {
      "command": "npx",
      "args": [
        "-y",
        "@izumisy/mcp-neo4j-memory-server"
      ],
      "env": {
        "NEO4J_URI": "neo4j://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "password",
        "NEO4J_DATABASE": "memory"
      }
    }
  }
}
```

### Using MCP Inspector in Claude Web

1. Install [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
2. Start the Neo4j Memory Server:
   ```bash
   npx @jovanhsu/mcp-neo4j-memory-server
   ```
3. Start MCP Inspector in another terminal:
   ```bash
   npx @modelcontextprotocol/inspector npx @jovanhsu/mcp-neo4j-memory-server
   ```
4. Access the MCP Inspector interface in your browser.

## Usage

### Custom Instructions for Claude

Add the following content to Claude's custom instructions:

```
Follow these steps for each interaction:

1. User Identification:
   - You should assume that you are interacting with default_user.
   - If you have not identified default_user, proactively try to do so.

2. Memory Retrieval:
   - Always begin your chat by saying only "Remembering..." and search relevant information from your knowledge graph.
   - Create a search query from user words, and search things from "memory". If nothing matches, try to break down words in the query at first ("A B" to "A" and "B" for example).
   - Always refer to your knowledge graph as your "memory".

3. Memory:
   - While conversing with the user, be attentive to any new information that falls into these categories:
     a) Basic Identity (age, gender, location, job title, education level, etc.)
     b) Behaviors (interests, habits, etc.)
     c) Preferences (communication style, preferred language, etc.)
     d) Goals (goals, targets, aspirations, etc.)
     e) Relationships (personal and professional relationships up to 3 degrees of separation).

4. Memory Update:
   - If any new information was gathered during the interaction, update your memory as follows:
     a) Create entities for recurring organizations, people, and significant events.
     b) Connect them to the current entities using relations.
     c) Store facts about them as observations.
```

### API Example

If you want to use this server in your own application, you can communicate with it via the MCP protocol:

```typescript
import { McpClient } from '@modelcontextprotocol/sdk/client/mcp.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// Create a client
const transport = new StdioClientTransport({
  command: 'npx',
  args: ['-y', '@izumisy/mcp-neo4j-memory-server'],
  env: {
    NEO4J_URI: 'bolt://localhost:7687',
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: 'password',
    NEO4J_DATABASE: 'neo4j'
  }
});

const client = new McpClient();
await client.connect(transport);

// Create entities
const result = await client.callTool('create_entities', {
  entities: [
    {
      name: 'User',
      entityType: 'Person',
      observations: ['Likes programming', 'Uses TypeScript']
    }
  ]
});

console.log(result);
```

## Why Choose Neo4j?

Compared to the original version using JSON file storage and the DuckDB version, Neo4j offers the following advantages:

1. **Native Graph Database**: Neo4j is specifically designed for graph data, making it ideal for storing and querying knowledge graphs.
2. **High-Performance Queries**: The Cypher query language enables efficient complex graph traversals and pattern matching.
3. **Relationship-First**: Neo4j treats relationships as first-class citizens, making relationship queries more efficient.
4. **Visualization Capabilities**: Neo4j provides built-in visualization tools, making it easier to debug and understand knowledge graphs.
5. **Scalability**: Supports cluster deployment and can handle large-scale knowledge graphs.

## Implementation Details

### Data Model

The storage model for the knowledge graph in Neo4j is as follows:

```
(Entity:EntityType {name: "Entity Name"})
(Entity)-[:HAS_OBSERVATION]->(Observation {content: "Observation Content"})
(Entity1)-[:RELATION_TYPE]->(Entity2)
```

### Fuzzy Search Implementation

This implementation combines Neo4j's full-text search functionality with Fuse.js for flexible entity search:

- Use Neo4j's full-text index for initial searches.
- Fuse.js provides additional fuzzy matching capabilities.
- Search results include exact and partial matches, sorted by relevance.

## Development

### Environment Setup

```bash
# Clone the repository
git clone https://github.com/JovanHsu/mcp-neo4j-memory-server.git
cd mcp-neo4j-memory-server

# Install dependencies
pnpm install

# Build the project
pnpm build

# Development mode (using MCP Inspector)
pnpm dev
```

### Testing

```bash
# Run tests
pnpm test
```

### Publishing

```bash
# Prepare for release
npm version [patch|minor|major]

# Publish to NPM
npm publish
```

## Contribution Guidelines

We welcome contributions, bug reports, and suggestions for improvement! Please follow these steps:

1. Fork this repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Create a Pull Request.

## Related Projects

- [Model Context Protocol](https://github.com/modelcontextprotocol/mcp)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Claude Desktop](https://github.com/anthropics/claude-desktop)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [https://github.com/JovanHsu/mcp-neo4j-memory-server](https://github.com/JovanHsu/mcp-neo4j-memory-server)
- NPM: [https://www.npmjs.com/package/@jovanhsu/mcp-neo4j-memory-server](https://www.npmjs.com/package/@jovanhsu/mcp-neo4j-memory-server)
- Author: JovanHsu