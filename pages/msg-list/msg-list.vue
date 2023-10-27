<template>
	<view class="p-2">
		<view class="mb-2 p-2 bg-white rounded" hover-class="bg-light"
		v-for="(item,index) in list" :key="index"
		@click="open(item)">
			<view class="text-dark font-md">{{item.title}}</view>
			<view class="font text-light-muted">
				{{item.content}}
			</view>
			<view class="font text-light-muted">{{item.create_time}}</view>
		</view>
		
		<view class="d-flex a-center j-center text-light-muted font-md py-3">{{loadtext}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				loadtext:"上拉加载更多",
				list:[]
			}
		},
		onLoad() {
			this.getData()
		},
		onReachBottom() {
			if(this.loadtext !== '上拉加载更多') return
			this.page++
			this.getData()
		},
		methods: {
			// 加载数据
			getData(){
				this.loadtext = '加载中...'
				this.$H.get(`/notice/${this.page}`).then(res=>{
					this.list = this.page == 1 ? res : [...this.list,...res]
					this.loadtext = res.length < 10 ? '没有更多数据了' : '上拉加载更多'
				}).catch(err=>{
					if(this.page > 1){
						this.page--
					}
					this.loadtext = '上拉加载更多'
				})
			},
			open(item){
				uni.navigateTo({
					url: '../msg-detail/msg-detail?detail='+JSON.stringify(item),
				});
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
