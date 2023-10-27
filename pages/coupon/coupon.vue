<template>
	<view class="p-3">
		<coupon v-for="(item,index) in list" :key="index" :item="item"
		:index="index" @click="getCoupon(item)">
			<text v-if="!item.status">已失效</text>
			<text v-else-if="item.disabled">已领取</text>
			<text v-else>马上领取</text>
		</coupon>
		<view v-if="list.length > 0"
		class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadtext}}
		</view>
		
		<no-thing v-else msg="没有优惠券"></no-thing>
		
	</view>
</template>

<script>
	import coupon from '@/components/order-coupon/coupon.vue';
	import noThing from '@/components/common/no-thing.vue';
	export default {
		components: {
			coupon,
			noThing
		},
		data() {
			return {
				page:1,
				list:[],
				// 1.上拉加载更多 2.加载中... 3.没有更多了
				loadtext:"上拉加载更多"
			}
		},
		onLoad() {
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData(true).finally(()=>{
				uni.stopPullDownRefresh()
			})
		},
		// 上拉加载
		onReachBottom() {
			if(this.loadtext !== '上拉加载更多'){
				return;
			}
			this.loadtext = '加载中...'
			this.page++;
			this.getData()
		},
		methods: {
			// 获取数据
			getData(refresh = false){
				return new Promise((res,rej)=>{
					this.$H.get('/coupon/'+this.page,{},{
						token:true
					}).then(result=>{
						// console.log(result);
						let list = result.map(item=>{
							let status = ((new Date(item.end_time)).getTime() > (new Date()).getTime()) && item.status
							return {
								id:item.id,
								title:item.name,
								start_time:item.start_time,
								end_time:item.end_time,
								price:item.value,
								desc:item.desc,
								status, // false已失效
								type:item.type,
								disabled:(item.coupon_user.length > 0) // true已领取
							}
						})
						
						this.list = !refresh ? [...this.list,...list] : [...list]
						
						this.loadtext = (result.length === 10) ? '上拉加载更多' : '没有更多了'
						res(res)
					}).catch(err=>{
						this.page--;
						rej(err)
					})
				})
			},
			// 领取优惠券
			getCoupon(item){
				this.$H.post('/getcoupon/'+item.id,{},{
					token:true
				}).then(res=>{
					// 设为已领取状态
					item.disabled = true
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style>

</style>
