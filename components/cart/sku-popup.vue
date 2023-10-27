<template>
	<common-popup :popupClass="popupShow" @hide="doHidePopup">
		<view class="d-flex a-center" style="height: 275rpx;">
			<image :src="popupData.cover" mode="widthFix"
			style="height: 180rpx;width: 180rpx;" 
			class="border rounded"></image>
			<view class="pl-2">
				<price priceSize="font-lg" 
				unitSize="font" :text="showPrice"></price>
				<view class="d-block">
					{{checkedSkus}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="w-100" style="height: 660rpx;">
			<card :headTitle="item.title" :headTitleWeight="false" 
			:headBorderBottom="false" :key="index"
			v-for="(item,index) in popupData.selects">
				<zcm-radio-group :label="item" 
				:selected.sync='item.selected'></zcm-radio-group>
			</card>
			<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
				<text>购买数量</text>
				<uni-number-box v-if="popupData.item" :min="1" :value="popupData.item.num" @change="popupData.item.num = $event"></uni-number-box>
			</view>
		</scroll-view>
		 <view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="confirm">
		 	确定
		 </view>
	</common-popup>
</template>

<script>
	import commonPopup from "@/components/common/common-popup.vue"
	import price from "@/components/common/price.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import card from "@/components/common/card.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
	export default {
		components: {
			commonPopup,
			price,
			zcmRadioGroup,
			card,
			uniNumberBox
		},
		computed: {
			...mapState({
				popupShow:state=>state.cart.popupShow,
				popupData:state=>state.cart.popupData
			}),
			// 选中的sku
			checkedSkus(){
				if(!this.popupData.selects && !Array.isArray(this.popupData.selects)){
					return ''
				}
				// 拿到选中skus组成字符串
				let checkedSkus = this.popupData.selects.map(v=>{
					return v.list[v.selected].name
				})
				return checkedSkus.join(',')
			},
			// 选中skus的索引
			checkedSkusIndex(){
				if(!this.popupData.goods_skus && !Array.isArray(this.popupData.goods_skus)){
					return -1
				}
				let index = this.popupData.goods_skus.findIndex((item)=>{
					return item.skusText === this.checkedSkus
				})
				return index
			},
			// 显示价格
			showPrice(){
				if (this.checkedSkusIndex < 0) {
					return this.popupData.item ? this.popupData.item.pprice : 0.00
				}
				return this.popupData.goods_skus[this.checkedSkusIndex].pprice
			},
			// 选中skuId
			shopId(){
				if (this.checkedSkusIndex < 0) {
					return this.popupData.item ? this.popupData.item.shop_id : 0
				}
				return this.popupData.goods_skus[this.checkedSkusIndex].id
			}
		},
		methods: {
			...mapActions([
				'doHidePopup',
				'updateCartList'
			]),
			confirm(){
				uni.showLoading({
					title: 'Loading...',
					mask: true
				});
				let goods = this.popupData.item
				this.$H.post('/cart/'+goods.id,{
					shop_id:this.shopId,
					num:goods.num
				},{
					token:true
				}).then(async (res)=>{
					await this.updateCartList()
					uni.hideLoading()
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					});
					this.doHidePopup()
				}).catch(err=>{
					uni.showToast({
						title: '修改失败',
						icon: 'none'
					});
					uni.hideLoading()
				})
			}
		},
	}
</script>

<style>
</style>
