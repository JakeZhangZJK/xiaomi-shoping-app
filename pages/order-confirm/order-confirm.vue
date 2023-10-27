<template>
	<view style="background: #F5F5F5;min-height: 100%;height: auto;">
		<!-- 地址选择 -->
		<view class="main-bg-color text-white d-flex a-center px-3" 
		style="height: 250rpx;" hover-class="main-bg-hover-color"
		 @click="openPathList">
			<view>
				<template v-if="path">
					<view class="font-weight font-md d-flex a-center font-lg">
						{{path.name}} {{path.phone}}
						<view class="border border-white rounded px-1 font ml-2"
						v-if="path.isdefault">默认</view>
					</view>
					<view class="font">
						{{path.province}} {{path.city}} {{path.district}} {{path.address}}
					</view>
				</template>
				<template v-else>
					<view
					class="font-weight font-md d-flex a-center font-lg">
						请选择收货地址
					</view>
				</template>
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		
		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx;margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<view class="d-flex a-center">
						<image
						style="width: 100rpx;height: 100rpx;" 
						class="rounded mr-2"
						v-for="(item,index) in goodsList"
						:key="index" :src="item ? item.cover : ''"
						></image>
					</view>
					<view slot="rightContent">共{{goodsList.length}}件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent">
						<price color="text-dark" :text="totalPrice"></price>
					</view>
				</uni-list-item>
				<uni-list-item title="运费" :showArrowIcon="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
				<uni-list-item title="优惠券" @click="openCoupon">
					<view slot="rightContent" :class="couponCount > 0 ? 'main-text-color' : 'text-light-muted'">
						<text v-if="coupon.id > 0">{{coupon.type === 0 ? '-'+coupon.value+'元' : coupon.value+'折'}}</text>
						<text v-else>{{couponCount === 0 ? '无可用' : couponCount + '张可用'}}</text>
					</view>
				</uni-list-item>
				<uni-list-item :showArrowIcon="false">
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price :text="price"></price>
					</view>
				</uni-list-item>
				<divider></divider>
				<uni-list-item title="发票" extraWidth="40%"
				@click="openOrderInvoice">
					<view slot="rightContent">{{ invoice ? (invoice.type ? '电子发票-企业' : '电子发票-个人') : '选填' }}</view>
				</uni-list-item>
				
			</view>
		</view>
		
		<view class="position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p-2 font-md">
			合计:
			<view class="ml-2">
				<price :text="price"></price>
			</view>
			<view class="ml-2 px-2 py-1 text-white font-md"
			:class="loading ? 'bg-secondary' : 'main-bg-color'"
			hover-class="main-bg-hover-color" style="border-radius: 80rpx;"
			@click="openPayMethods">
				{{loading ? '加载中' : '去支付'}}
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import price from "@/components/common/price.vue"
	
	import {mapGetters,mapState} from "vuex"
	export default {
		components: {
			uniListItem,
			price
		},
		data() {
			return {
				loading:false,
				path:false,
				items:[],
				couponCount:0,
				coupon:{
					id:0,
					type:0,
					value:0
				},
				order_id:0,
				invoice:null
			}
		},
		computed: {
			...mapState({
				list:state=>state.cart.list
			}),
			...mapGetters([
				'defaultPath',
				'totalPrice'
			]),
			// 商品列表
			goodsList(){
				return this.items.map(id=>{
					return this.list.find(v=>v.id === id)
				})
			},
			// 最终价格
			price(){
				// 没有优惠券
				if(this.coupon.id === 0){
					return this.totalPrice
				}
				if(this.coupon.type === 0){
					return this.totalPrice - this.coupon.value
				}
				return (this.totalPrice * (this.coupon.value/10)).toFixed(2)
			}
		},
		onLoad(e) {
			if(!e.detail){ 
				uni.showToast({
					title: '请选择要下单的商品',
					icon: 'none'
				});
				return uni.navigateBack({
					delta: 1
				});
			}
			this.items = JSON.parse(e.detail)
			
			if (this.defaultPath.length) {
				this.path = this.defaultPath[0]
			}
			// 开启监听选择收货地址事件
			uni.$on('choosePath',this.choosePath)
			// 监听选择优惠券
			uni.$on('couponUser',this.couponUser)
			// 监听选择发票
			uni.$on('addInvoice',this.addInvoice)
			// 计算当前价格有多少张可用优惠券
			this.getCouponCount()
		},
		onUnload() {
			// 关闭监听选择收货地址事件
			uni.$off('choosePath',this.choosePath)
			uni.$off('couponUser',this.couponUser)
			uni.$on('addInvoice',this.addInvoice)
		},
		onShow() {
			// 如果已经提交过订单了，重定向到订单详情页
			if(this.order_id > 0){
				uni.redirectTo({
					url: '../order-detail/order-detail?id='+this.order_id,
				});
			}
		},
		methods: {
			choosePath(res){
				this.path = res
			},
			couponUser(res){
				this.coupon = res
			},
			addInvoice(res){
				this.invoice = res
			},
			openPathList(){
				uni.navigateTo({
					url: '../user-path-list/user-path-list?type=choose'
				});
			},
			openOrderInvoice(){
				uni.navigateTo({
					url: '../order-invoice/order-invoice'
				});
			},
			// 下单，支付
			openPayMethods(){
				// 防止重复下单
				if(this.loading) return;
				// 判断是否选择收货地址
				if(!this.path){
					return uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					});
				}
				let options = {
					user_addresses_id:this.path.id,
					items:this.items.join(',')
				}
				// 是否选择优惠券
				if(this.coupon.id > 0){
					options.coupon_user_id = this.coupon.id
				}
				// 是否有发票申请
				if(this.invoice){
					options.invoice = this.invoice
				}
				this.loading = true
				this.$H.post('/order',options,{
					token:true
				}).then(res=>{
					this.loading = false
					// 跳转到支付页面
					uni.navigateTo({
						url: '../pay-methods/pay-methods?detail='+JSON.stringify({
							id:res.id,
							price:res.total_price
						})
					});
					// 保存订单id
					this.order_id = res.id
					// 通知购物车更新数据
					uni.$emit('updateCart')
				}).catch(err=>{
					this.loading = false
					console.log(err);
					uni.showToast({
						title: '创建订单失败',
						icon: 'none'
					});
				})
			},
			// 选择优惠券
			openCoupon(){
				uni.navigateTo({
					url: '../order-coupon/order-coupon?detail='+JSON.stringify({
						price:this.totalPrice
					}),
				});
			},
			// 计算当前价格有多少张可用优惠券
			getCouponCount(){
				this.$H.post('/coupon_count',{
					price:this.totalPrice
				},{
					token:true
				}).then(res=>{
					this.couponCount = res
				}).catch(err=>{
					uni.showToast({
						title: '获取可用优惠券数量失败',
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style>

</style>
