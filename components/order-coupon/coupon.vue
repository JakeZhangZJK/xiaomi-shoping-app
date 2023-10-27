<template>
	<view class="bg-white rounded border d-flex a-center border-light-secondary mb-3" @click="$emit('click')">
		<view class="flex-1 d-flex flex-column j-center px-3">
			<view class="font-md"
			:class="item.disabled || !item.status ? 'text-light-muted':''"
			>{{item.title}}</view>
			<view class="font text-light-muted">
				{{item.start_time|formatTime}}~{{item.end_time|formatTime}}
			</view>
		</view>
		<view class="text-white d-flex flex-column a-center j-center" style="width: 220rpx;height: 200rpx;"
		:class="item.disabled || !item.status ? 'bg-secondary':'main-bg-color'">
			<view style="font-size: 42rpx;line-height: 1.4;">
				{{item.price}}<text class="font">{{item.type == 0 ? '元' : '折'}}</text></view>
			<view class="font">{{item.desc}}</view>
			
			<view class="rounded bg-white w-50 text-center" hover-class="bg-light"
			:class="item.disabled || !item.status? 'text-secondary':'main-text-color'">
			<slot>{{ item.status ? '去使用' : '已失效'}}</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index:Number
		},
		filters: {
			formatTime(shorttime) {
				shorttime = shorttime.toString().length<13 ? shorttime*1000 : shorttime;
				let date = new Date(shorttime)
				let parseNumber = (num)=>{
					return num < 10 ? "0" + num : num;
				}
				return date.getFullYear() +'-'+ parseNumber(date.getMonth() + 1) +'-'+ parseNumber(date.getDate())+' '+parseNumber(date.getHours())+':'+parseNumber(date.getMinutes())
			}
		}
	}
</script>

<style>
</style>
