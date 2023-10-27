<template>
	<view>
		<view class="p-3">
			<uni-rate title="评分" v-model="form.rating" />
		</view>
		<view class="p-3">
			<textarea v-model="form.review.data" placeholder="请填写评价内容" class="uni-textarea p-2 bg-light rounded" style="box-sizing: border-box;"/>
		</view>
		<view class="p-3">
			<button type="default" class="bg-white" @click="submit"
			:disabled="form.review.data.length === 0" :loading="loading">
				{{loading ? '加载中...' : '评 价'}}
			</button>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-ui/uni-rate/uni-rate.vue';
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				id:0,
				form:{
					rating:5,
					review:{
						data:"",
						image:[]
					}
},
				loading:false
			}
		},
		onLoad(e) {
			if(!e.id){
				return uni.showToast({
					title: '非法参数',
					icon: 'none'
				});
			}
			this.id = e.id
		},
		methods: {
			submit(){
				this.loading = true
				this.$H.post('/order_item/'+this.id+'/review',this.form,{
					token:true
				}).then(res=>{
					this.loading = false
					uni.navigateBack({ delta: 1 });
					uni.showToast({
						title: '评价成功',
						icon: 'none'
					});
				}).catch(err=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style>

</style>
