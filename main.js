import Vue from 'vue'
import App from './App'
import store from "./store"

Vue.prototype.$store = store

Vue.config.productionTip = false


// 引入全局组件
import divider from "@/components/common/divider.vue"
Vue.component('divider',divider)
// 引入全局加载动画
import loading from "@/components/common/loading.vue"
Vue.component('loading',loading)

import loadingPlus from "@/common/mixin/loading-plus.vue"
Vue.component('loading-plus',loadingPlus)

// 引入request库
import $H from '@/common/lib/request.js';
Vue.prototype.$H = $H

// 权限跳转
Vue.prototype.navigateTo = (options)=>{
	// 判断用户是否登录
	if (!store.state.user.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	uni.navigateTo(options);
}
// 助手函数
import $U from './common/lib/util.js';
Vue.prototype.$U = $U

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
