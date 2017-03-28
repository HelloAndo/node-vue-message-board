<template>
  <div class="item">
    <label>
      <span class="name">{{dept.name}}</span>
      <input type="checkbox" v-model="checked">
    </label>
    <ul>
      <li>
        <div class="member-list" v-if="dept.children && dept.children.length">
          <dept v-for="dept in dept.children" :dept="dept" :checked="dept.checked"></dept>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {

	name: 'dept',

	props: ['dept', 'checked'],

	data () {
		return {

		}
	},


}

</script>