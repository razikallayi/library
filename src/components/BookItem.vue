<template>
	<tr>
		<td>{{book._id}}</td>
		<td>{{book.name}}</td>
		<td>{{book.category}}</td>
		<td>{{book.author}}</td>
		<td>{{book.published_date}}</td>
		<td><button class="btn btn-sm btn-danger" v-on:click="$emit('remove')">X</button></td>
	</tr>
</template>

<script>
export default {
	data () {
		return {book:
			{
				_id: 1,
				name: 'Do the dishes',
				category: 'science',
				author: 'habbeb',
				published_date: '12/12/2012',
			}
		}
	},
	methods: {
		addNewTodo: function () {
			this.todos.push({
				id: this.nextTodoId++,
				title: this.newTodoText
			})
			this.newTodoText = ''
		}
	}
}
</script>