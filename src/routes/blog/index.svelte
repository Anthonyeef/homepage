<script context="module">
	export const load = async ({ fetch }) => {
		const posts = await fetch('/api/posts.json');
		const allPosts = await posts.json();

		return {
			props: {
				posts: allPosts
			}
		};
	};
</script>

<script>
	export let posts;
	import PostList from '$lib/components/PostList.svelte';
	import AvatarHeader from '../../lib/components/AvatarHeader.svelte';
</script>

<AvatarHeader />

<ul>
	{#each posts as postData}
		<PostList post={postData} />
	{/each}
</ul>

<style>
	ul {
		list-style: none;
	}	
</style>
