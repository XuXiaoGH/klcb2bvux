export const prive = () => { //解析权限
    let privilege=JSON.parse(sessionStorage.getItem("privilege"));
    let privilegeJson = {};
    privilege.map(item =>{
        privilegeJson[item.code] = true;
    })
    return privilegeJson;
}