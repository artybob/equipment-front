<template>
    <div>
        <v-card
            class="mx-auto d-none d-sm-block"
        >
          <h3 v-if="user">
            {{user.name}}
          </h3>

            <v-list flat>
                <v-rating
                    :value="4"
                    color="#FB8200"
                    background-color="#FB8200"
                    half-increments
                    size="24"
                    dense
                    class="mt-3 ml-3"
                ></v-rating>
                <v-subheader style="color: #FB8200">Ваш кредитный рейтинг: 4</v-subheader>
                <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
                >
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        style="display: block;border-top: 1px solid rgba(219, 219, 219, 0.5);"
                        :to="item.href"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text">
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>

import store from "../../store";

export default {
    data: () => ({
        selectedItem: 1,
        items: [
            {text: 'Мой профиль', href: '/profile/'},
            {text: 'Взять займ', href: '/getloan/'},
            {text: 'Оплатить', href: '/payment/'},
            {text: 'Добавить карту', href: '/addcard/'},
            {text: 'История займов', href: '/story/'},
        ],
    }),
    computed: {
      user() {
        return store.getters.user
      },
    },
}
</script>

<style scoped>
.v-tabs >>> .v-tabs-bar {
    background-color: transparent;
}

.v-tabs >>> .v-slide-group__prev--disabled {
    display: none !important;
}

.v-list-item__content:hover {
    color: #7f2fcb;
}

.btn-next-full {
    background: #45C643 !important;
    border-radius: 6px !important;
    color: white !important;
    width: 100% !important;
    height: 55px !important;
}
.pay-app-to-invalid {
    background: linear-gradient(360deg, #F44336 4.43%, #EF9A9A 100%)!important;
}

.approve-card {
    padding: 15px;
}

</style>
