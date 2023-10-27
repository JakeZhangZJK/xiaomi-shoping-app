<template>
	<view class="position-absolute d-flex flex-column a-center j-center top-0 left-0 right-0 bottom-0" style="background-color: #F5F5F5;">
		<template v-if="!loading">
			<image :src="getIcon" mode="widthFix" style="width: 250rpx;"></image>
			<view style="color: #B2B2B2;">{{msg}}</view>
		</template>
		<text v-else class="text-muted">加载中...</text>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: "no_comment"
			},
			msg:{
				type:String,
				default:"您还没有待付款订单"
			},
			loading:{
				type: Boolean,
				default: false
			}
		},
		computed: {
			getIcon() {
				return `/static/images/nothing/${this.icon}.png`
			}
		},
	}
</script>

<style>
</style>
