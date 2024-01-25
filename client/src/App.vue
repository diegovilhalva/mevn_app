<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            HQMania
          </v-list-item-title>
          <v-list-item-subtitle>
            Font diária de nerdicies
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>
      
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i" :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
  <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
       items: [
        { title: 'Home', icon: 'mdi-home',link:"/" },
        { title: 'Novo Post', icon: 'mdi-note-plus',link:"/add-post" },
        { title: 'Sobre', icon: 'mdi-help-box',link:"/about" },
      ],
       }),
    
  }
</script>