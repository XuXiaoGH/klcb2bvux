export default {
  filterText: '',
  maxexpandId: 90,
  treelist: [
    {
    id: 1,
    name: "数据管理",
    children: [
        {
            id: 5,
            name: "用户商品清单",
            isEdit: false,
            children: [
              {
                id: 8,
                name: "商品添加",
                isEdit: false,
                children: []
              },
              {
                id: 9,
                name: "商品列表导出",
                isEdit: false,
                children: []
              },
              {
                id: 10,
                name: "商品查看",
                isEdit: false,
                children: []
              },
              {
                id: 11,
                name: "商品编辑",
                isEdit: false,
                children: []
              }
            ]
          },
          {
            id: 6,
            name: "系统商品分类",
            pid: '1',
            isEdit: false,
            children: []
          },
          {
            id: 7,
            name: "系统商品清单",
            pid: '1',
            isEdit: false,
            children: []
          }
      ]
    },
    {
      id: 2,
      name: "授权管理",
      isEdit: false,
      children: []
    },
    {
      id: 3,
      name: "平台报表",
      isEdit: false,
      children: []
    },
    {
      id: 4,
      name: "系统管理",
      isEdit: false,
      children: []
    }
  ]
}
