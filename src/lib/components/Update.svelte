<script lang="ts">
	import { scale } from 'svelte/transition';
	import { notesList } from '../stores/db';
	import type { Note } from '../types';

	export let noteToUpdate = {} as Note;
	let { title, content, id, pos } = noteToUpdate;

	// Add removes item from database AND UI in realtime
	const handleDelete = async () => {
		if (!confirm('Do you really want to delete this note?')) return;

		await notesList.deleteNote(id);
		hideModal();
	};

	const handleUpdate = async () => {
		await notesList.updateNote(id, { title, content, pos });
		hideModal();
	};

	const hideModal = () => {
		noteToUpdate = {} as Note;
		document.body.classList.remove('freeze');
	};

	// Prevents scrolling when modal is open (.freeze{overflow: hidden;})
	if (noteToUpdate) {
		document.body.classList.add('freeze');
	}

	function resizeTextArea() {
		this.style.height = 'auto';
		this.style.height = `${this.scrollHeight}px`;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="backdrop" on:click|self={hideModal}>
	<div class="modal" transition:scale={{ duration: 250 }} on:click|self={hideModal}>
		<form class="edit-form mx-5 rounded-xl">
			<input type="text" class="modal-title" placeholder="Title" name="title" bind:value={title} />

			<textarea
				placeholder="Take a note..."
				name="content"
				rows="8"
				class="modal-content"
				bind:value={content}
				on:input={resizeTextArea}
			/>

			<footer class="modal-footer">
				<button
					class="delete flex bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-md"
					on:click|preventDefault={handleDelete}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-gray-600">
						<path
							fill-rule="evenodd"
							d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				<button
					class="done flex bg-gray-200 hover:bg-gray-300 transition duration-200"
					on:click|preventDefault={handleUpdate}
					><span>Done</span>
				</button>
			</footer>
		</form>
	</div>
</div>

<style>
	.modal,
	.backdrop {
		display: flex;
		align-items: center;
	}
	::placeholder {
		font-style: bold;
	}
	.backdrop {
		flex-direction: column;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: hsla(0, 0%, 89.8%, 0.75);
		z-index: 100;
	}

	.modal {
		justify-content: center;
		width: 100%;
		margin: 25px;
		padding-top: 20vh;
	}

	.edit-form {
		position: relative;
		width: 100%;
		max-width: 600px;
		background: #fff;
		padding: 20px 20px 8px;
		box-shadow:
			0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 2px 6px 2px rgba(60, 64, 67, 0.15);
		transition: all 0.2s ease-in-out;
	}

	.modal-title {
		margin-bottom: 20px;
	}

	.modal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button {
		border: 0;
		outline: 0;
		cursor: pointer;
	}

	.delete {
		width: 35px;
		padding: 8px;
	}

	.delete svg {
		width: 100%;
		height: 100%;
	}

	.done {
		height: 36px;
		padding: 8px 24px;
		border-radius: 4px;
		font-weight: 700;
		font-size: 14px;
	}
</style>
