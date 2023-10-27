<template>
	<view
	class="ml-2 rounded border border-light-secondary py-1 px-2 text-secondary"
	hover-class="bg-light-secondary"
	@click.stop="$emit('click')">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style>
</style>
