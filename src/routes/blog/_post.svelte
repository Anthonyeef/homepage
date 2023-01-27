<script>
	export let title;
	export let date;

	import PostFooter from '../../lib/components/PostFooter.svelte';
</script>

<div class="parent">
	<h2>{title}</h2>
	<slot />
	<p id="date">{date}</p>
	<PostFooter />
</div>

<style>
	#date {
		text-align: right;
		color: #888888;
	}

	.parent :global(p) {
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	.parent :global(img) {
		max-width: 95%;
		margin: 1rem auto;
		display: block;
		background-color: hsl(0 0% 80%);
	}

	.parent :global(li) {
		margin-bottom: 0.5rem;
	}

	.parent :global(li p) {
		margin-bottom: 0.5rem;
	}

	.parent :global(a) {
		color: inherit;
		text-decoration: none;
		border-bottom: 3px solid rgba(350, 31, 100, 0.5);
		font-weight: bolder;
	}

	.parent :global(p code) {
		background-color: rgba(175,184,193,0.2);
		border-radius: 3px;
		padding: 0.2rem 0.4rem;
	}
</style>
