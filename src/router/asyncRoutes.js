
const asyncRoutes = [];
const context = require.context('./modules', true, /\.js$/);
context.keys().forEach((key) => {
  let fileName = key.replace(/(\.\/|\.js)/g, "");
  // files not exported by default
  // order start from 1 : 10 --> this is render in sidebar
  if(!(context(key)[fileName + "Routes"]?.order)) {
    asyncRoutes.push(context(key)[fileName + "Routes"]);
  }else{
    asyncRoutes[context(key)[fileName + "Routes"].order - 1] = context(key)[fileName + "Routes"];
  }
});

export {asyncRoutes}
