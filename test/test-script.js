// 测试脚本
// 用于测试Neo4j知识图谱记忆服务器的功能

// 创建实体
const createEntitiesTest = {
  name: 'create_entities',
  params: {
    entities: [
      {
        name: 'John',
        entityType: '人物',
        observations: ['喜欢编程', '是一名软件工程师']
      },
      {
        name: 'Apple',
        entityType: '公司',
        observations: ['生产iPhone', '总部在加利福尼亚']
      }
    ]
  }
};

// 创建关系
const createRelationsTest = {
  name: 'create_relations',
  params: {
    relations: [
      {
        from: 'John',
        to: 'Apple',
        relationType: 'WORKS_FOR'
      }
    ]
  }
};

// 添加观察
const addObservationsTest = {
  name: 'add_observations',
  params: {
    observations: [
      {
        entityName: 'John',
        contents: ['喜欢苹果产品', '有5年工作经验']
      }
    ]
  }
};

// 搜索节点
const searchNodesTest = {
  name: 'search_nodes',
  params: {
    query: '软件'
  }
};

// 打开节点
const openNodesTest = {
  name: 'open_nodes',
  params: {
    names: ['John', 'Apple']
  }
};

// 删除观察
const deleteObservationsTest = {
  name: 'delete_observations',
  params: {
    deletions: [
      {
        entityName: 'John',
        contents: ['有5年工作经验']
      }
    ]
  }
};

// 删除关系
const deleteRelationsTest = {
  name: 'delete_relations',
  params: {
    relations: [
      {
        from: 'John',
        to: 'Apple',
        relationType: 'WORKS_FOR'
      }
    ]
  }
};

// 删除实体
const deleteEntitiesTest = {
  name: 'delete_entities',
  params: {
    entityNames: ['Apple']
  }
};

// 导出测试用例
module.exports = {
  createEntitiesTest,
  createRelationsTest,
  addObservationsTest,
  searchNodesTest,
  openNodesTest,
  deleteObservationsTest,
  deleteRelationsTest,
  deleteEntitiesTest
};