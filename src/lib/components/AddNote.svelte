<script lang="ts">
	import { notesList } from '../stores/db';

	let inputVisible = false;
	let title = '';
	let content = '';

	const showTitle = () => (inputVisible = true);
	const hideTitle = () => (inputVisible = false);

	async function handleAdd() {
		// there must be either a note title or a note content
		if (!title.trim() && !content.trim()) return;

		const data = {
			title,
			content,
			pos: new Date().getTime()
		};

		await notesList.addNote(data);

		title = '';
		content = '';
		inputVisible = false;
	}

	function resizeTextArea(this: HTMLTextAreaElement) {
		this.style.height = 'auto';
		this.style.height = `${this.scrollHeight}px`;
	}
</script>

<div class="create-form">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="backdrop" class:not-visible={!inputVisible} on:click={hideTitle} />

	<form class="create-note" on:submit|preventDefault={handleAdd}>
		<input
			class="title"
			type="text"
			placeholder="Title"
			name="title"
			bind:value={title}
			on:focus={showTitle}
			class:not-visible={!inputVisible}
		/>

		<textarea
			placeholder="Take a note..."
			bind:value={content}
			name="content"
			on:input={resizeTextArea}
			on:focus={showTitle}
		/>

		<button
			class="justify-center items-center inline-flex pb-1 hover:bg-[#ff4003] drop-shadow-lg transition duration-200"
			type="submit">+</button
		>
	</form>
</div>

<style>
	.create-note {
		box-shadow:
			0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 2px 6px 2px rgba(60, 64, 67, 0.15);
		@apply relative mx-auto w-full max-w-[600px] p-5 bg-white rounded-lg z-10;
	}

	input,
	textarea {
		width: 100%;
		display: block;
		border: 0;
		outline: 0;
		margin: 0;
		padding: 0;
		font-size: 16px;
		background-color: transparent;
		font-family: 'Roboto';
	}

	textarea::placeholder {
		font-weight: 400;
		color: rgb(126, 126, 126);
	}

	input::placeholder,
	textarea::placeholder {
		opacity: 0.9;
		color: rgb(126, 126, 126);
	}

	input {
		font-weight: 400;
		font-size: 18px;
		margin-bottom: 10px;
	}

	textarea {
		resize: none;
		line-height: 1.5;
		min-height: 5em;
		max-height: 50vh;
		width: 100%;
	}

	button {
		position: absolute;
		outline: none;
		display: inline-flex;
		right: 18px;
		bottom: -18px;
		background: #59c9a5;
		color: #fff;
		border: none;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		cursor: pointer;
		font-size: 24px;
		text-align: center;
	}

	.not-visible {
		display: none;
	}

	.backdrop {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}
</style>
