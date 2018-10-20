<template>
    <div>
        <div> 
            <router-link 
            :to="{name: 'HelloWorld',params:{msg: '只有一个世界'}}">
            HELLO WORLD
            </router-link>
        </div>
        <br>
        <div> 
            <router-link 
            :to="{name: 'HelloEarth',params:{msg: '只有一个地球'}}">
            HELLO EARTH
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'list'
}
</script>
<style scoped>
    *{list-style: none;text-decoration: none;}
    
</style>
