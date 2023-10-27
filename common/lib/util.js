export default {
	// 更新tabbar角标
	updateCartBadge(count){
		if(count > 0){
			return uni.setTabBarBadge({
				index:2,
				text:count.toString()
			})
		}
		uni.removeTabBarBadge({
			index:2
		})
	},
	// 判断订单状态
	formatStatus(order){
		if(!order){
			return ''
		}
		// 未支付
		if(!order.paid_time){
			return "待支付"
		}
		// 退款情况
		if(order.refund_status !== 'pending'){
			switch (order.refund_status){
				case 'applied':
				return '退款中'
					break;
				case 'success':
				return '退款成功'
					break;
				case 'failed':
				return '退款失败'
					break;
			} 
		}
		switch (order.ship_status){
			case 'pending':
			return '待发货'
				break;
			case 'delivered':
			return '待收货'
				break;
			case 'received':
			return '已签收'
				break;
		}
	},
}