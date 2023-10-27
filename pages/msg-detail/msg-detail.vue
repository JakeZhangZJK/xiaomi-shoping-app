<template>
	<view>
		<!-- 标题 -->
		<view class="font-lg text-dark my-3 px-2">{{detail.title}}</view>
		<!-- 内容 -->
		<u-parse className="uparse" :content="detail.content" @preview="preview" @navigate="navigate" ></u-parse>
	</view>
</template>

<script>
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue"
	export default {
		components:{
			uParse
		},
		data() {
			return {
				detail:{},
			}
		},
		onLoad(e) {
			if (!e.detail) {
				return uni.navigateBack({
					delta: 1
				});
			}
			// 初始化数据
			this.detail = JSON.parse(e.detail)
			// 设置页面标题
			uni.setNavigationBarTitle({
				title:this.detail.title
			})
		},
		methods: {
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
			}
		}
	}
</script>

<style>
page{
	overflow-x: hidden;
}
</style>
