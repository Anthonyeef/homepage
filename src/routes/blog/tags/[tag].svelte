<script context="module">
	export const load = async ({ params, fetch }) => {
		const currentTag = params.tag;
		const response = await fetch('/api/posts.json');
		const posts = await response.json();

		const matchingPosts = posts.filter(
			(post) => post.meta.tags && post.meta.tags.includes(currentTag)
		);

		return {
			props: {
				posts: matchingPosts
			}
		};
	};
</script>

<script>
	export let posts;
</script>

<ul>
	{#each posts as post}
		<li>
            <h2>{post.meta.title}</h2>
		</li>
	{/each}
</ul>
