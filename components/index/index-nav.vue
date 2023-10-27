<template>
	<view class="row j-center m-2">
		
		<block v-for="(item,index) in resdata" :key="index">
			<view class="d-flex flex-column j-center a-center py-1"
			@tap="event(item)" style="width: 142rpx;">
				<image :src="item.src" 
				style="width: 60upx;height: 60upx;"
				mode="widthFix"></image>
				<text class="font-sm mt-2">{{item.text}}</text>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		props:{
			resdata:[Array,Object]
		},
		methods:{
			event(item){
				uni.showToast({
					title: '自己在原有的基础上扩展',
					icon: 'none'
				});
				console.log("点击了图标")
			}
		}
	}
</script>

<style>
</style>
