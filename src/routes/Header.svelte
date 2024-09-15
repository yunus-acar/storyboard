<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tabs from '$lib/components/ui/tabs';

	import { ChevronDown, Redo2, Share2, Undo2, BadgeCheck } from 'lucide-svelte';
	import logo from '$lib/images/logo.svg';
	import gmLogo from '$lib/images/gm-logo.svg';
	import * as Avatar from '$lib/components/ui/avatar';

	let version = 'V1';
	let activeTab = 'Storyboard';
	const versionList = ['V1', 'V2'];
</script>

<div class="flex items-center justify-between px-4 py-2 border-b">
	<div class="flex items-center space-x-4">
		<div class="border-r border-gray-200 pr-4">
			<img src={logo} alt="Logo" class="h-6 w-6" />
		</div>
		<div class="flex items-center space-x-2">
			<span class="font-semibold">Welcome</span>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="bg-[#F4F4F5] rounded-md">
					<Button variant="ghost" size="sm" class="h-8 text-gray-600">
						{version}
						<ChevronDown class="ml-1 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each versionList as version}
						<DropdownMenu.Item on:click={() => (version = version)}>{version}</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<Button variant="secondary" disabled>
			{activeTab}
		</Button>

		<BadgeCheck color={'#71717A'} size={16} />
	</div>
	<Tabs.Root value={activeTab}>
		<Tabs.List>
			<Tabs.Trigger value="Storyboard">Storyboard</Tabs.Trigger>
			<Tabs.Trigger value="Draft">Draft</Tabs.Trigger>
			<Tabs.Trigger value="gmReview" class="flex items-center gap-2">
				<img src={gmLogo} alt="GM Logo" class="h-4 w-4" />
				Review
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	<div class="flex items-center space-x-2">
		<Button variant="ghost" size="icon">
			<Undo2 class="h-4 w-4" />
		</Button>
		<Button variant="ghost" size="icon"><Redo2 class="h-4 w-4" /></Button>
		<Avatar.Root>
			<Avatar.Image src="https://avatars.githubusercontent.com/u/61521272?v=4" alt="@yunus-acar" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Button variant="outline" size="icon"><Share2 class="h-4 w-4" /></Button>
		<Button class="bg-green-500 hover:bg-green-600 text-white">Submit</Button>
	</div>
</div>
