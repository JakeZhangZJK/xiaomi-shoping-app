<template>
	<view>
		<uni-status-bar />
		<view class="d-flex a-center j-sb py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<view class="font-md" @click="type = type == 'reg' ? 'login' : 'reg'">{{ type == 'reg' ? '去登录' : '去注册'}}</view>
		</view>
		
		<view class="p-5">
			<view class="font-big">{{ type == 'login' ? '密码登录' : '注册'}}</view>
			<view class="font text-light-muted mb-5">测试账号：user2，密码：zcmcss</view>
			<input type="text" class="border-bottom mb-4 uni-input px-0"
			placeholder="请输入手机号/邮箱/账号" v-model="username"
			placeholder-class="text-light-muted"
			@focus="focus('username')" @blur="blur('username')"
			:class="focusClass.username ? 'input-border-color' : ''"/>
			
			<input type="text" class="border-bottom mb-4 uni-input px-0"
			placeholder="请输入密码" v-model="password"
			placeholder-class="text-light-muted"
			@focus="focus('password')" @blur="blur('password')"
			:class="focusClass.password ? 'input-border-color' : ''"/>
			
			<input v-if="type == 'reg'" type="text" class="border-bottom mb-4 uni-input px-0"
			placeholder="请输入确认密码" v-model="repassword"
			placeholder-class="text-light-muted"
			@focus="focus('repassword')" @blur="blur('repassword')"
			:class="focusClass.repassword ? 'input-border-color' : ''"/>
			
			<view class="py-2 w-100 d-flex a-center j-center main-bg-color text-white rounded font-md mb-4" hover-class="main-bg-hover-color" @click="submit">
				{{ type == 'login' ? '登 录' : '注 册' }}
			</view>
			<label class="checkbox d-flex a-center" @click="check = !check">
				<checkbox :checked="check"/>
				<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
			</label>
		</view>
		
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue"
	import {mapMutations} from 'vuex';
	export default {
		components: {
			uniStatusBar
		}, 
		data() {
			return {
				type:"login",
				
				username:"",
				password:"",
				repassword:"",
				check:true,
				
				// 验证规则
				rules:{
					username:[
						// {
						// 	rule:/^[a-zA-Z]\w{5,17}$/,
						// 	msg:"账号必须字母开头，长度在6~18之间，只能包含字母、数字和下划线"
						// }
					],
					password:[
						// {
						// 	rule:/^.{5,20}$/,
						// 	msg:"密码长度必须为5-20个字符"
						// }
					],
					repassword:[]
				},
				
				focusClass:{
					username:false,
					password:false,
					repassword:false
				},
			}
		},
		methods: {
			...mapMutations(['login']),
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			// 表单验证
			validate(key){
				var check = true
				this.rules[key].forEach((v)=>{
					// 验证失败
					if (!(v.rule).test(this[key])) {
						uni.showToast({ title: v.msg, icon: 'none' });
						check = false
						return false
					}
				})
				return check
			},
			// 提交表单
			submit(){
				if (!this.check) {
					return uni.showToast({
						title: '请先同意XXXXX协议',
						icon: 'none'
					});
				}
				// 验证用户名
				if (!this.validate('username')) return;
				// 验证密码
				if (!this.validate('password')) return;
				
				let param = {
					username:this.username,
					password:this.password
				}
				let url = '/login'
				
				if(this.type == 'reg'){
					if (!this.validate('repassword')) return;
					if(this.password != this.repassword){
						return uni.showToast({
							title: '密码和确认密码不一致',
							icon: 'none'
						});
					}
					param.repassword = this.repassword
					url = '/reg'
				}
				
				uni.showLoading({ title: '提交中...'});
				
				this.$H.post(url,param).then(res=>{
					if(!res){
						return uni.showToast({
							title: (type == 'reg' ? '注册' : '登录') + '失败',
							icon: 'none'
						});
					}
					uni.hideLoading()
					if(this.type == 'reg'){
						uni.showToast({
							title: '注册成功',
							icon: 'none'
						});
						return this.type = 'login'
					}
					// 状态存储
					this.login(res)
					// 刷新购物车
					uni.$emit('updateCart')
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});
					uni.navigateBack({
						delta: 1
					});
				}).catch(err=>{
					if(err.msg){
						uni.showToast({
							title: err.msg,
							icon: 'none'
						});
					}
					uni.hideLoading()
				})
			},
			forget(){
				
			},
			focus(key){
				this.focusClass[key] = true
			},
			blur(key){
				this.focusClass[key] = false
			}
		}
	}
</script>

<style>

</style>
