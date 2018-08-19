<template>
  <v-data-table
    :items="entries"
    :headers="[{name: 'Rank'}, {name: 'Name'}, {name:'Score'}]"
    class="elevation-1"
    hide-actions>
    <template slot-scope="props" slot="headers">
      <th
        v-for="header in props.headers"
        :key="header.name">
        {{ header.name }}
      </th>
    </template>
    <template slot-scope="props" slot="items">
      <td>{{ props.index + 1 }}.</td>
      <td>{{ props.item['user.name'] }}</td>
      <td>{{ props.item.score }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { userApi } from '../api';
export default {
  name: 'leaderboard',
  data() {
    return {
      entries: []
    };
  },
  created: function () {
    userApi.getLeaderboard()
      .then(({data}) => (this.entries = data));
  }
};
</script>
