<template>
  <v-app id="integer_sequence" dark>

    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      AAA
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 pl-4 pr-4 hidden-sm-and-down">
        <span >Integer sequence</span>
      </v-toolbar-title>
      <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search"/> -->
      <v-autocomplete v-model="select" :loading="loading" :items="items" :search-input.sync="search" cache-items
            hide-no-data flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search">
      </v-autocomplete>

      <v-spacer class="hidden-sm-and-down"/>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">

        </v-row>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    name: "App",
    components: { },
    data: () => ({
      drawer: null,
      loading: false,
      items: [],
      search: null,
      select: null
    }),
    watch: {
      search(val) {
        this.isLoading = true;

        fetch(`https://oeis.org/search?q=${val}&fmt=json`, { method: "HEAD", mode: "no-cors" })
        .then((res) => {
          console.log(res);
          this.items = res.json().data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false
        });
      }
    }
  };
</script>
