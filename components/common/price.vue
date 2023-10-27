<template>
	<view class="d-flex line-h">
		<text class="a-self-start" :class="unitSize+' '+color">￥</text>
		<text :class="priceSize+' '+color"><slot />{{text}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:[String,Number],
				default:""
			},
			priceSize:{
				type:String,
				default:"font-md"
			},
			unitSize:{
				type:String,
				default:"font-sm"
			},
			color:{
				type:String,
				default:"main-text-color"
			}
		}
	}
</script>

<style>
</style>
