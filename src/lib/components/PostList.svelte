<script>
	export let post;
</script>

<li>
	<h2 id="title">
		<a href={post.path}>{post.meta.title}</a>
	</h2>
	<p id="excerpt">{post.meta.excerpt}</p>
	<p id="date">{post.meta.date}</p>
</li>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}	

	#excerpt {
		border-left: 2px solid #eee;
		display: block;
		padding-left: 1em;
		margin-bottom: 1em;
		line-height: 1.7;
	}

	#date {
		text-align: right;
		color: #888888;
	}

	li {
		margin-bottom: 4rem;
	}
</style>
