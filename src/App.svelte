<script lang="ts">
	import AddNote from './lib/components/AddNote.svelte';
	import { fade } from 'svelte/transition';
	import Footer from './lib/components/Footer.svelte';
	import Logos from './lib/components/Logos.svelte';
	import type { Note } from './lib/types';
	import NoteComponent from './lib/components/Note.svelte';
	import { notesList } from './lib/stores/db';
	import UpdateModal from './lib/components/Update.svelte';

	let noteToUpdate = {} as Note;
	const selectNoteToUpdate = (noteId: string) => (noteToUpdate = $notesList.get(noteId));
</script>

<main class="relative min-h-screen w-full bg-[#f0f0f0] px-[100px] md:py-[50px]">
	<Logos />

	<AddNote />

	<div class="relative mx-auto my-[50px] grid grid-cols-fill gap-5">
		{#each [...$notesList.values()] as note (note.id)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="group relative break-words rounded-lg border border-solid border-[#dadce0] bg-white p-5 transition-all duration-[250ms] ease-in-out hover:[box-shadow:_0_1px_2px_0_rgba(60,_64,_67,_0.3),_0_2px_6px_2px_rgba(60,_64,_67,_0.15)]"
				in:fade
				on:click={() => selectNoteToUpdate(note.id)}
			>
				<NoteComponent {note} />
			</div>
		{/each}
	</div>

	{#if Object.entries(noteToUpdate).length > 0}
		<UpdateModal bind:noteToUpdate />
	{/if}
	<Footer />
</main>

<style>
	@media screen and (max-width: 850px) {
		main {
			padding: 100px 50px 50px;
		}
	}
	@media screen and (max-width: 480px) {
		main {
			padding: 100px 30px 30px;
		}
	}
	@media screen and (max-width: 330px) {
		main {
			padding: 100px 20px 20px;
		}
	}
</style>
