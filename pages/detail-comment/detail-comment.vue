<template>
	<view>
		
		<view class="p-2">
			<view class="d-flex a-center py-2 border-bottom border-light-secondary">
				<text class="text-muted">用户评价({{total}})</text>
				<text class="main-text-color ml-auto mr-1">{{ (good_rate * 100) + '%' }}</text>
				<text class="text-muted">满意</text>
			</view>
			<view class="d-flex flex-wrap pt-3" style="margin-right: -20rpx;">
				<view class="px-2 py border rounded mr-2 mb-2 cate-item"
				v-for="(item,index) in cateList" :key="index"
				:class="cateIndex === index ? 'active' : ''"
				@tap="cateChange(index)">
					{{item.name}}
				</view>
			</view>
		</view>
		<divider />
		
		<view class="p-2 d-flex a-start border-bottom border-light-secondary"
		v-for="(item,index) in list" :key="index">
			<image :src="item.user.avatar" mode="widthFix"
			style="width: 90rpx;height: 90rpx;" class="rounded flex-shrink"></image>
			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-md text-primary font-weight">{{item.user.nickname}}</text>
					<view class="iconfont icon-service main-text-color ml-auto">
						<text class="pl-1 font">{{item.rating | rating}}</text>
					</view>
				</view>
				<view class="line-h-md font-md">
					{{item.review.data}}
				</view>
				<view class="row" v-if="item.review.image.length > 0">
					<view class="span24-8 px pb" v-for="(img,imgIndex) in item.review.image"
					:key="imgIndex">
						<image :src="img" mode="widthFix"
						style="height: 100rpx;"></image>
					</view>
				</view>
				<view class="d-flex a-center">
					<text class="text-light-muted">{{item.review_time|formatTime}}</text>
					<!-- <view class="d-flex text-light-muted ml-auto a-center mr-2">
						{{item.goods_num}} <text class="iconfont icon-dianzan text-muted ml"></text>
					</view> -->
					<!-- <view class="d-flex text-light-muted a-center">
						<text class="iconfont icon-pinglun text-muted ml"></text>
					</view> -->
				</view>
				<!-- 客服回复 -->
				<view class="bg-light-secondary rounded p-2 d-flex flex-wrap a-center mt-1" v-for="(item2,index2) in item.extra" :key="index2">
					<template v-if="!item2.isuser">
						<text class="main-text-color">官方回复：</text>
						{{item2.data}}
						<!-- <view class="iconfont icon-dianzan text-light-muted line-h-md font ml-2">
							<text class="text-muted pl-1">赞客服 {{item2.good_num}}</text>
						</view> -->
					</template>
				</view>
			</view>
		</view>
		<divider />
		<!-- 上拉加载 -->
		<view 
		class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadtext}}
		</view>
	</view>
</template>

<script>
	import $T from '@/common/lib/time.js';
	export default {
		data() {
			return {
				id:0,
				cateIndex:0,
				cateList:[
					{ name:"全部",value:"" },
					{ name:"好评",value:"/good" },
					{ name:"中评",value:"/middle" },
					{ name:"差评",value:"/bad" },
				],
				total:0,
				good_rate:0,
				list:[],
				page:1,
				// 1.上拉加载更多 2.加载中... 3.没有更多了
				loadtext:"上拉加载更多"
			}
		},
		onLoad(e) {
			this.id = e.id
			this.__init()
		},
		onReachBottom() {
			if(this.loadtext !== '上拉加载更多') return;
			
			this.page++
			this.loadtext = '加载中...'
			this.getData()
		},
		// 监听下拉刷新
		onPullDownRefresh(){
			this.getData((res)=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh();
			},true)
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			},
			rating(value){
				if (value === 3) {
					return '中评'
				}else if(value > 3){
					return '好评'
				}else{
					return '差评'
				}
			}
		},
		methods: {
			// 初始化
			__init(){
				this.getData()
			},
			// 加载数据
			getData(callback = false, refresh = false){
				let value = this.cateList[this.cateIndex].value
				this.$H.get(`/goods/${this.id}/comments${value}?page=${this.page}`).then(res=>{
					this.total = res.total
					this.good_rate = res.good_rate
					this.list = !refresh ? [...this.list,...res.list] : [...res.list]
					
					this.loadtext = res.list.length < 10 ? '没有更多数据了' : '上拉加载更多'
					if (typeof callback === 'function') {
						callback(true)
					}
				})
			},
			cateChange(index){
				this.cateIndex = index
				uni.showLoading({
					title:"加载中..."
				})
				this.getData((res)=>{
					uni.hideLoading()
					uni.showToast({
						title: '加载成功',
						icon:"none"
					});
				},true)
			}
		}
	}
</script>

<style>
.cate-item{
	background: #FFEBEC;
	color: #7B6D6C;
	border-color:#F4E0E1;
}
.cate-item.active{
	background: #FF6B01!important;
	color: #FFFFFF!important;
	border-color: #DE7232!important;
}
</style>
