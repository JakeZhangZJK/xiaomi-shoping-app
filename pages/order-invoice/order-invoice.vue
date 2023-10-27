<template>
	<view>
		<divider></divider>
		<card headTitle="发票类型" bodyPadding cardStyle="background:#ffffff;">
			<zcm-radio-group :label="label1" 
			:selected.sync='label1.selected'
			></zcm-radio-group>
			<view class="text-light-muted line-h-md">
				电子发票与纸质发票具有相同的法律效力，可作为报销、售后、维权凭证，推荐使用电子发票，不怕丢失，更方便，环保。
			</view>
		</card>
		<divider></divider>
		<card headTitle="发票抬头" bodyPadding cardStyle="background:#ffffff;">
			<zcm-radio-group :label="label2" :selected.sync="label2.selected" @change="form.type = $event"></zcm-radio-group>
		</card>
		<divider></divider>
		
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<text class="font-md">{{ form.type ? '单位名称' : '个人姓名' }}：</text>
			<input type="text" class="font-md text-right flex-1" v-model="form.name" :placeholder="form.type ? '请填写单位名称' : '姓名'"/>
		</view>
		<view v-if="form.type">
			<view class="p-2 border-bottom d-flex a-center bg-white">
				<text class="font-md">单位税号：</text>
				<input type="text" class="font-md text-right flex-1" v-model="form.code" placeholder="统一社会信用代码"/>
			</view>
			<view class="p-2 border-bottom d-flex a-center bg-white">
				<text class="font-md">单位地址：</text>
				<input type="text" class="font-md text-right flex-1" v-model="form.path" placeholder="选填"/>
			</view>
			<view class="p-2 border-bottom d-flex a-center bg-white">
				<text class="font-md">开户银行：</text>
				<input type="text" class="font-md text-right flex-1" v-model="form.bankname" placeholder="选填"/>
			</view>
			<view class="p-2 border-bottom d-flex a-center bg-white">
				<text class="font-md">开户银行：</text>
				<input type="text" class="font-md text-right flex-1" v-model="form.bankno" placeholder="选填"/>
			</view>
		</view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<text class="font-md">发票内容：</text>
			<text class="font-md ml-2">商品明细</text>
		</view>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<text class="font-md">收票人手机：</text>
			<input type="text" class="font-md text-right flex-1" v-model="form.phone" placeholder="手机号码"/>
		</view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<text class="font-md">收票人邮箱：</text>
			<input type="text" class="font-md text-right flex-1" v-model="form.email" placeholder="用于接收电子发票"/>
		</view>
		
		<view class="p-3">
			<view class="text-center w-100 main-bg-color text-white font-md rounded py-2" hover-class="main-bg-hover-color" @click="submit">
				保 存
			</view>
		</view>
		
		<view class="p-2 text-light-muted d-flex flex-column">
			<text>发票须知：</text>
			<text>1.发票为实际支付金额，不包括优惠券等；</text>
			<text>2.电子发票可在订单完成后，在订单详情中查看；</text>
		</view>
		
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	export default {
		components: {
			card,
			zcmRadioGroup
		},
		data() {
			return {
				label1:{
					selected:0,
					list:[
						{name:"电子发票"},
					]
				},
				label2:{
					selected:0,
					list:[
						{name:"个人"},
						{name:"企业"},
					]
				},
				form:{
					name:"",
					phone:"",
					email:"",
					code:"",
					path:"",
					bankname:"",
					bankno:"",
					type:0
				}
			}
		},
		methods: {
			submit(){
				let nameMsg = this.form.type == 1 ?'单位名称' : '姓名'
				if(!this.form.name){
					return uni.showToast({
						title: nameMsg + '不能为空',
						icon: 'none'
					});
				}
				if(this.form.type && !this.form.code){
					return uni.showToast({
						title: '单位不能为空',
						icon: 'none'
					});
				}
				if(!this.form.phone || !this.form.email){
					return uni.showToast({
						title: '手机和邮箱不能为空',
						icon: 'none'
					});
				}
				uni.$emit('addInvoice',this.form)
				uni.navigateBack({ delta: 1 })
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
