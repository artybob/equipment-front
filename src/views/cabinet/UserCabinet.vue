<template>
    <div>
        <v-container>
            <v-row class="mb-10">
                <v-col
                    md="3"
                    style="padding: 0;"
                >
                    <Sidebar/>
                </v-col>
                <v-col
                    md="9"
                >
                    <router-view></router-view>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import Sidebar from "../../components/UserCabinet/Sidebar.vue";

export default {
    name: "UserCabinet",
  components: {Sidebar},
}
</script>

<style scoped>



</style>
