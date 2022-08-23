<template>
  <v-container>
      <v-text-field
          v-model="search"
          @keyup="getEquipment()"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    <v-data-table
        :headers="headers"
        :server-items-length="equipment.meta?.total"
        :items="equipment.data"
        :options.sync="options"
        :loading="loading"
        class="elevation-1"
        :page.sync="page"
        hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="addItem"
              >
                New Item
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.code"
                          label="Code"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.desc"
                          label="Desc"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.serial_num"
                          label="serial num"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          v-model="editedItem.type_id"
                          label="type_id"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <i class="fa-solid fa-pen-to-square mr-4"
           @click="editItem(item)">
        </i>
        <i class="fa-solid fa-square-minus"
           @click="deleteItem(item)"></i>
      </template>
    </v-data-table>
    <div v-if="equipment" class="text-center pt-2">
      <v-pagination
          :disabled="loading"
          v-model="page"
          :length="equipment.meta?.last_page"
      ></v-pagination>
    </div>

  </v-container>

</template>


<script>
import store from "../../store";

export default {
  data: () => ({
      page: 1,
      totalEquipment: 0,
      loading: true,
      options: {},
      equipment: [],
      search: '',
      payload: {},
      dialog: false,
      dialogDelete: false,
      editedItem: {
        code: '',
        desc: '',
        serial_num: '',
        type_id: '',
      },
      actionType: null,
      defaultItem: {
        code: '',
        desc: '',
        serial_num: '',
        type_id: '',
      },
      headers: [
        {
          text: 'code',
          align: 'start',
          sortable: false,
          value: 'code',
        },
        {text: 'desc', value: 'desc'},
        {text: 'serial_num', value: 'serial_num'},
        {text: 'type_id', value: 'type_id'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    options: {
      handler() {
        this.getEquipment();
      },
      deep: true
    },
  },
  mounted() {
      this.getEquipment();
  },
  methods: {
      async getEquipment() {
        this.payload = {
          'page' : this.page,
          'search': this.search,
        }
        await store.dispatch('getEquipment', this.payload)
        this.equipment = store.getters.equipment
        this.loading = false
      },
    async removeEquipment(id) {
      await store.dispatch('removeEquipment', id)
      await this.getEquipment()
    },
    deleteItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.removeEquipment(this.editedItem.id)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
    },
    addItem() {
      this.actionType = 1
      this.editedItem = this.defaultItem
    },
    editItem (item) {
      this.actionType = 0
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
      this.dialog = false
    },

    async save () {
      if (this.actionType) {
        //add
        await store.dispatch('addEquipment', this.editedItem)
      } else {
        //edit
        await store.dispatch('editEquipment', this.editedItem)
      }
      await this.getEquipment()
      this.close()
    },
  }
}
</script>

<style scoped>

</style>