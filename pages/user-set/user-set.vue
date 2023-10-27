<template>
	<view>
		<card v-if="loginStatus" headTitle="账号管理" bodyStyle="background:#ffffff;">
			<uni-list-item title="个人资料" @click="navigate('')"></uni-list-item>
			<uni-list-item title="收货地址" @click="navigate('user-path-list')"></uni-list-item>
		</card>
		
		
		<card headTitle="关于" bodyStyle="background:#ffffff;">
			<uni-list-item :title="item.title" 
			v-for="(item,index) in list"
			:key="index" @click="navigate(item.path)"></uni-list-item>
		</card>
		
		
		<view class="p-3" v-if="loginStatus">
			<button type="default" class="bg-white" @click="logoutEvent">退出登录</button>
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import { mapMutations,mapState } from 'vuex'
	export default {
		components: {
			card,
			uniListItem
		},
		data() {
			return {
				list:[
					{ title:"关于商城",path:"about" },
					{ title:"意见反馈",path:"" },
					{ title:"协议规则",path:"" },
					{ title:"资质证件",path:"" },
					{ title:"用户协议",path:"" },
					{ title:"隐私政策",path:"" },
				]
			}
		},
		computed: {
			...mapState({
				token:state=>state.user.token,
				loginStatus:state=>state.user.loginStatus
			})
		},
		methods: {
			...mapMutations(['logout','clearCart']),
			navigate(path){
				if (!path) return uni.showToast({
					title: '自己在原有的基础上扩展',
					icon: 'none'
				});;
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			},
			// 退出登录
			logoutEvent(){
				this.$H.post('/logout',{},{
					token:false,
					toast:false
				}).then(res=>{
					// 退出登录
					this.logout();
					// 清空购物车
					this.clearCart()
					uni.showToast({
						title: '退出成功',
						icon: 'none'
					});
					uni.navigateBack({
						delta: 1
					});
				}).catch(err=>{
					// 退出登录
					this.logout();
					// 清空购物车
					this.clearCart()
					uni.showToast({
						title: '退出成功',
						icon: 'none'
					});
					uni.navigateBack({
						delta: 1
					});
				})
			}
		}
	}
</script>

<style>
page{
	background: #EEEEEE;
}
</style>
