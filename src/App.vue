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
      <v-autocomplete
        v-model="select"
        :items="items"
        :loading="loading"
        :search-input.sync="search"
        item-text="label"
        item-value="number"
        label="Search"
        placeholder="Start typing to Search"
        prepend-inner-icon="mdi-magnify"
        return-object
        hide-details
        autofocus
        :filter="() => true"
        flat
        full-width
        solo
        clearables>
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
      select: null,
      timerId: null
    }),
    watch: {
      search(val) {
        // cancel pending call
        clearTimeout(this.timerId);

        if (val && val.trim().length > 1) {
          this.loading = true;

          // delay new call 300ms
          this.timerId = setTimeout(() => {
console.log(val);
            // CORS are not supported by the API at oeis.org, so we use cors-anywhere.herokuapp.com as a reverse proxy :
            const myRequest = new Request(`https://cors-anywhere.herokuapp.com/https://oeis.org/search?q=${val}&fmt=json`, {
              method: 'GET'
            });
            fetch(myRequest)
              .then(response => response.json())
              .then((response) => {
                if (response.results) {
                  this.items = response.results.map((item) => {
                    item.label = '#' + item.number;
                    return item;
                  });
                } else {
                  this.items = [];
                }
              }).catch((e) => {
                console.error(e);
              }).finally(() => {
                this.loading = false;
              });

          }, 500);
        }
      }
    }
  };
</script>
