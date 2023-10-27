<template>
	<view>
		<view class="border-bottom d-flex a-center py-2 border-light-secondary" @click.stop="open">
			<image :src="item.cover" mode="widthFix"
			style="width: 150rpx;height: 150rpx;" class="rounded mx-2 flex-shrink"
			></image>
			<view class="flex-1">
				<view class="d-flex a-center">
					<text class="font-md text-dark">{{item.title}}</text>
					<text class="font-md text-light-muted ml-auto"
					>￥{{item.pprice}}</text>
				</view>
				<view class="d-flex a-center">
					<text class="font text-light-muted">{{item.attrs}}</text>
					<text class="font text-light-muted ml-auto"
					>x{{item.num}}</text>
				</view>
			</view>
		</view>
		<view class="d-flex j-end mt-1" v-if="!item.reviewed && item.ship_status == 'received' && item.refund_status == 'pending'">
			<common-button @click="openComment">评价</common-button>
		</view>
	</view>
</template>

<script>
	import commonButton from '../common/common-button.vue';
	export default {
		components: {
			commonButton
		},
		props: {
			item: Object,
			index:Number
		},
		methods: {
			openComment(){
				uni.navigateTo({
					url: '/pages/order-comment/order-comment?id='+this.item.order_item_id,
				});
			},
			open() {
				uni.navigateTo({
					url: '/pages/detail/detail?detail='+JSON.stringify({
						id:this.item.id
					}),
				});
			}
		},
	}
</script>

<style>
</style>
