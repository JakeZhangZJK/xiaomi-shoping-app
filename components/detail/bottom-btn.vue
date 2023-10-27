<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="d-flex a-stretch bg-white position-fixed left-0 bottom-0 right-0"
		style="height: 100rpx; z-index: 100;">
			<view class="flex-1 d-flex flex-column a-center j-center line-h-md" hover-class="bg-light-secondary" @click="test">
				<view class="iconfont icon-xihuan text-muted line-h-md"></view>
				收藏
			</view>
			<view class="flex-1 d-flex flex-column a-center j-center line-h-md position-relative" hover-class="bg-light-secondary" @tap="ToCart">
				<view class="iconfont icon-gouwuche text-muted line-h-md"></view>
				<view class="position-absolute" style="left: 100rpx;top: 0;"
				v-if="cartCount === '99+' || cartCount > 0">
					<uni-badge :text="cartCount" type="error" size="small"></uni-badge>
				</view>
				购物车
			</view>
			<view class="d-flex j-center a-center font-md main-bg-color text-white" hover-class="main-bg-hover-color" style="flex: 2.5;"
			@tap="$emit('show')">
				加入购物车
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniBadge from '../uni-ui/uni-badge/uni-badge.vue';
	import { mapGetters } from 'vuex'
	export default {
		components: {
			uniBadge
		},
		computed: {
			...mapGetters(['cartCount'])
		},
		methods: {
			test(){
				uni.showToast({
					title: '自己扩展',
					icon: 'none'
				});
			},
			ToCart() {
				uni.switchTab({
					url:"../../pages/cart/cart"
				})
			}
		},
	}
</script>

<style>
</style>
