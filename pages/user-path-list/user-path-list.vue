<template>
	<view>
		<!-- #ifdef MP -->
		<view class="p-2 d-flex a-center j-center">
			<button type="warn" size="mini" @click="openEdit">添加收货地址</button>
		</view>
		<!-- #endif -->
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in list" :key="index" :right-options="options" @click="bindClick($event,index)">
			<uni-list-item @click="choose(item)">
				<view class="text-secondary" style="width: 750rpx;">
					<view class="d-flex a-center">
						<text class="main-text-color">{{item.name}}</text>
						{{item.phone}}
						<text class="main-text-color"
						v-if="index === 0 && item.last_used_time !== null">[默认]</text>
					</view>
					<view>{{item.province}} {{item.city}} {{item.district}}</view>
					<view>{{item.address}}</view>
				</view>
			</uni-list-item>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<!-- 没有数据 -->
		<!-- #ifndef MP -->
		<no-thing v-if="list.length === 0" msg="空空如也"></no-thing>
		<!-- #endif -->

		<!-- 上拉加载更多 -->
		<divider />
		<view class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadtext}}
		</view>
		
		
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue"
	import noThing from '@/components/common/no-thing.vue';
	import {mapState,mapMutations} from "vuex"
	export default {
		components: {
			uniListItem,
			uniSwipeAction,
			noThing,
			uniSwipeActionItem,
		},
		data() {
			return {
				// 1.上拉加载更多 2.加载中... 3.没有更多了
				loadtext:"上拉加载更多",
				isChoose:false,
				options: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				page:1
			}
		},
		computed: {
			...mapState({
				list:state=>state.path.list
			}),
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.openEdit()
			}
		},
		onLoad(e) {
			if (e.type === 'choose') {
				this.isChoose = true
			}
			this.getData()
			
			// 注册一个监听事件
			uni.$on('updateUserPathList',()=>{
				this.page = 1
				this.getData()
			})
		},
		onUnload() {
			uni.$off('updateUserPathList')
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData(()=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			// 是否已经处于加载状态
			if (this.loadtext !== '上拉加载更多') return;
			// 改变加载状态
			this.loadtext = '加载中...'
			this.page++
			// 请求数据
			this.getData()
		},
		methods: {
			...mapMutations(['delPath','updatePathList']),
			openEdit(){
				uni.navigateTo({
					url: '../user-path-edit/user-path-edit'
				});
			},
			// 获取数据
			getData(callback = false){
				this.$H.get('/useraddresses/'+this.page,{},{
					token:true
				}).then(res=>{
					let refresh = this.page === 1
					this.updatePathList({
						refresh:refresh,
						list:res
					})
					this.loadtext = res.length < 10 ? '没有更多了' : '上拉加载更多'
					// 下拉刷新
					if (typeof callback === 'function') {
						uni.showToast({
							title: '刷新成功',
							icon: 'none'
						});
						callback()
					}
				}).catch(err=>{
					if (typeof callback === 'function') {
						callback()
					}
					if (this.page > 1) {
						// 页码回归上一页
						this.page--
						this.loadtext = '上拉加载更多'
					}
				})
			},
			bindClick(value,i) {
				switch (value.index){
					case 0: // 修改
					let obj = {
						index:i,
						item:this.list[i]
					}
					
					// 加上是否默认
					obj.item.default = (i === 0 && obj.item.last_used_time !== null) ? 1 : 0;

					setTimeout(()=> {
						uni.navigateTo({
							url: '../user-path-edit/user-path-edit?data='+JSON.stringify(obj),
						});
					},50);
						break;
					case 1: // 删除
					uni.showModal({
						content: '要删除该收货地址吗？',
						success: (res)=> {
							if (res.confirm) {
								
								this.$H.del('/useraddresses/'+this.list[i].id,{},{
									token:true
								}).then(res=>{
									this.delPath(i)
									uni.showToast({
										title: '删除成功'
									});
								})
								
							} 
						}
					});
						break;
				}
			},
			// 选择收货地址
			choose(item){
				if (this.isChoose) {
					// 通知订单提交页修改收货地址
					uni.$emit('choosePath',item)
					// 关闭当前页面
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>

</style>
