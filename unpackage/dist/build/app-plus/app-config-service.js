
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/class/class","pages/cart/cart","pages/my/my","pages/ceshi/ceshi","pages/search/search","pages/search-list/search-list","pages/detail/detail","pages/detail-comment/detail-comment","pages/user-set/user-set","pages/user-userinfo/user-userinfo","pages/user-path-list/user-path-list","pages/user-path-edit/user-path-edit","pages/order/order","pages/order-confirm/order-confirm","pages/order-invoice/order-invoice","pages/login/login","pages/msg-list/msg-list","pages/msg-detail/msg-detail","pages/pay-methods/pay-methods","pages/pay-result/pay-result","pages/order-coupon/order-coupon","pages/order-detail/order-detail","pages/logistics-detail/logistics-detail","pages/after-sale/after-sale","pages/about/about","pages/coupon/coupon","pages/order-refund/order-refund"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"仿小米商城","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#B5B5B5","selectedColor":"#FD6801","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/indexSelected.png"},{"pagePath":"pages/class/class","text":"分类","iconPath":"static/tabbar/class.png","selectedIconPath":"static/tabbar/classSelected.png"},{"pagePath":"pages/cart/cart","text":"购物车","iconPath":"static/tabbar/cart.png","selectedIconPath":"static/tabbar/cartSelected.png"},{"pagePath":"pages/my/my","text":"我的","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/mySelected.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"帝莎编程","compilerVersion":"3.1.18","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"scrollIndicator":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":true,"placeholder":"智能积木 越野四驱车","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"left","fontSize":"22px","fontSrc":"/static/font/iconfont.ttf","text":""},{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"22px","fontSrc":"/static/font/iconfont.ttf","text":""}]}}},{"path":"/pages/class/class","meta":{"isQuit":true,"isTabBar":true},"window":{"scrollIndicator":"none","bounce":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":true,"placeholder":"智能积木 越野四驱车","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"22px","fontSrc":"/static/font/iconfont.ttf","text":""}]}}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"titleNView":false,"scrollIndicator":"none","bounce":"none"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":false,"bounce":"none"}},{"path":"/pages/ceshi/ceshi","meta":{},"window":{}},{"path":"/pages/search/search","meta":{},"window":{"scrollIndicator":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":false,"placeholder":"智能积木 越野四驱车","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"16px","text":"搜索"}]}}},{"path":"/pages/search-list/search-list","meta":{},"window":{"enablePullDownRefresh":true,"scrollIndicator":"none","titleNView":{"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","disabled":false,"placeholder":"智能积木 越野四驱车","placeholderColor":"#CCCCCC"},"buttons":[{"color":"#989898","colorPressed":"#FD6801","float":"right","fontSize":"16px","text":"搜索"}]}}},{"path":"/pages/detail/detail","meta":{},"window":{"scrollIndicator":"none","bounce":"none"}},{"path":"/pages/detail-comment/detail-comment","meta":{},"window":{"navigationBarTitleText":"商品评价","enablePullDownRefresh":true,"scrollIndicator":"none","bounce":"none"}},{"path":"/pages/user-set/user-set","meta":{},"window":{"navigationBarTitleText":"用户设置"}},{"path":"/pages/user-userinfo/user-userinfo","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/user-path-list/user-path-list","meta":{},"window":{"navigationBarTitleText":"收货地址","enablePullDownRefresh":true,"scrollIndicator":"none","bounce":"none","titleNView":{"buttons":[{"float":"right","color":"#999999","colorPressed":"#BBBBBB","fontSrc":"/static/font/iconfont.ttf","text":"","fontSize":"15px"}]}}},{"path":"/pages/user-path-edit/user-path-edit","meta":{},"window":{"navigationBarTitleText":"增加收货地址","scrollIndicator":"none","bounce":"none"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"我的订单","scrollIndicator":"none","titleNView":{"buttons":[{"float":"right","color":"#999999","colorPressed":"#BBBBBB","fontSrc":"/static/font/iconfont.ttf","text":"","fontSize":"15px"},{"float":"right","color":"#999999","colorPressed":"#BBBBBB","fontSrc":"/static/font/iconfont.ttf","text":"","fontSize":"15px"}]}}},{"path":"/pages/order-confirm/order-confirm","meta":{},"window":{"navigationBarTitleText":"订单配送至","navigationBarBackgroundColor":"#FD6801","navigationBarTextStyle":"white"}},{"path":"/pages/order-invoice/order-invoice","meta":{},"window":{"navigationBarTitleText":"发票"}},{"path":"/pages/login/login","meta":{},"window":{"bounce":"none","scrollIndicator":"none","titleNView":false}},{"path":"/pages/msg-list/msg-list","meta":{},"window":{"navigationBarTitleText":"消息列表"}},{"path":"/pages/msg-detail/msg-detail","meta":{},"window":{"navigationBarTitleText":"消息详情页"}},{"path":"/pages/pay-methods/pay-methods","meta":{},"window":{"navigationBarTitleText":"选择支付方式"}},{"path":"/pages/pay-result/pay-result","meta":{},"window":{"navigationBarTitleText":"支付成功"}},{"path":"/pages/order-coupon/order-coupon","meta":{},"window":{"navigationBarTitleText":"优惠券"}},{"path":"/pages/order-detail/order-detail","meta":{},"window":{"bounce":"none","titleNView":{"type":"transparent"}}},{"path":"/pages/logistics-detail/logistics-detail","meta":{},"window":{"navigationBarTitleText":"物流信息"}},{"path":"/pages/after-sale/after-sale","meta":{},"window":{"navigationBarTitleText":"申请售后"}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于xxx商城"}},{"path":"/pages/coupon/coupon","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"领取优惠券"}},{"path":"/pages/order-refund/order-refund","meta":{},"window":{"navigationBarTitleText":"申请退款"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
