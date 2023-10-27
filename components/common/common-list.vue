<template>
	<view style="width: 372.5rpx;" @click="openDetail">
		<image :src="item.cover" mode="widthFix" style="height: 400rpx;" lazy-load></image>
		<view class="p-2 pt-1">
			<view><text class="font-md">{{item.title}}</text></view>
			<text class="d-block font text-light-muted">{{item.desc}}</text>
			<view class="d-flex py-1">
				<price :text="item.pprice"></price>
				<view class="ml-1 a-self-end line-h" ><text class="font-sm text-light-muted line-through">￥{{item.oprice}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue";
	export default {
		components:{
			price
		},
		props:{
			item:Object,
			index:[Number,String],
			type:{
				type:String,
				default:"navigateTo"
			}
		},
		methods: {
			openDetail() {
				uni[this.type]({
					url:"/pages/detail/detail?detail="+JSON.stringify(this.item)
				})
			}
		},
	}
</script>

<style>
</style>
