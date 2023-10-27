<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="text-light-muted font-md">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md" :text="detail.price"></price>
		</view>
		<view class="px-5">
			<radio-group @change="change">
			<label v-for="(item,index) in options" :key="index">
				<uni-list-item :leftIcon="item.icon" 
				:title="item.title" showExtraIcon 
				leftIconStyle="font-size:60rpx;"
				:note="item.note">
					<radio slot="right" :value="item.value" color="#FD6801"
					:checked="payMethod === item.value"/>
				</uni-list-item>
			</label>
			</radio-group>
			<view class="rounded text-white font-md w-100 py-2 mt-3 text-center" :class="loading ? 'bg-secondary' : 'main-bg-color'" hover-class="main-bg-hover-color" @click="submit">
				{{loading ? '支付中...' : '确认支付'}}
			</view>
			
		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			price,
			uniListItem
		},
		data() {
			return {
				loading:false,
				detail:{
					id:0,
					price:0
				},
				payMethod:"alipay",
				options:[]
			}
		},
		onLoad(e) {
			if(!e.detail){
				return uni.showToast({
					title: '支付失败',
					icon: 'none'
				});
			}
			this.detail = JSON.parse(e.detail)
			
			// #ifdef APP-PLUS
			this.options = [{
				title:"支付宝支付",
				note:"推荐使用支付宝支付",
				icon:"icon-zhifubao text-primary",
				value:"alipay"
			},{
				title:"微信支付",
				note:"",
				icon:"icon-weixinzhifu text-success",
				value:"wxpay"
			}]
			// #endif
			
			// #ifdef MP-WEIXIN
			this.options = [{
				title:"微信支付",
				note:"推荐使用微信支付",
				icon:"icon-weixinzhifu text-success",
				value:"wxpay"
			}]
			this.payMethod = 'wxpay'
			// #endif
		},
		methods: {
			// 支付
			submit(){
				// 防止重复支付
				if(this.loading) return;
				this.loading = true
				// #ifdef APP-PLUS
				this.appPay()
				// #endif
				// #ifdef MP-WEIXIN
				this.weixinMpPay()
				// #endif
			},
			// 微信小程序支付
			weixinMpPay(){
				// 请求接口
				uni.login({
					success: (e) => {
						this.$H.get('/payment/'+this.detail.id+'/wxmppay/'+e.code,{},{
							token:true,
							native:true
						})
						.then(res=>{
							console.log(res.data);
							// 发起小程序支付
							/*
							{
								appId:"wxb1f305de99c0fe32",
								nonceStr:"ZM7mqDUe5wYVpz1h",
								package:"prepay_id=wx31215725257777f851bd31661280875100",
								paySign:"2114A262F841E9A8080972A0D5C6E7F7",
								signType:"MD5",
								timeStamp:"1577800644"
							}
							*/
						   let paymentData = res.data;
						   uni.requestPayment({
						       timeStamp: paymentData.timeStamp,
						       nonceStr: paymentData.nonceStr,
						       package: paymentData.package,
						       signType: 'MD5',
						       paySign: paymentData.paySign,
						       success: (res) => {
						           // 重定向/防止重复支付
						           uni.redirectTo({
						           	url: '../pay-result/pay-result'
						           });
						           console.log('success:' + JSON.stringify(res));
						       },
						       fail: (res) => {
						           uni.showModal({
						               content: "支付失败,原因为: " + res
						                   .errMsg,
						               showCancel: false
						           })
						       },
						       complete: () => {
						           this.loading = false;
						       }
						   })
						})
						.catch(err=>{
							this.loading = false
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							});
						})
					},
					fail: (e) => {
						console.log("fail", e);
						this.loading = false;
						uni.showModal({
						    content: "支付失败,原因为: " + e.errMsg,
						    showCancel: false
						})
					}
				})
			},
			// app支付
			appPay(){
				this.$H.get('/payment/'+this.detail.id+'/'+this.payMethod,{},{
					token:true,
					native:true
				}).then(res=>{
					console.log(res);
					uni.requestPayment({
					    provider: this.payMethod,
					    orderInfo: res.data, //微信、支付宝订单数据
					    success: (res2)=> {
							console.log('requestPayment',res2);
							// 重定向/防止重复支付
							uni.redirectTo({
								url: '../pay-result/pay-result'
							});
					        console.log('success:' + JSON.stringify(res2));
					    },
					    fail: (err)=> {
							uni.showModal({
								title: '提示',
								content: '支付失败',
								showCancel: false
							});
					        console.log('fail:' + JSON.stringify(err));
					    },
						complete: () => {
							this.loading = false
						}
					});
				}).catch(err=>{
					this.loading = false
					console.log(err);
					uni.showToast({
						title: '支付失败',
						icon: 'none'
					});
				})
			},
			// 切换支付方式
			change(e){
				this.payMethod = e.detail.value
			}
		}
	}
</script>

<style>

</style>
