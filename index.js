module.exports = function NoMoreDelayedBuffs(mod) {
	if(mod.patchVersion < 97) return

	let gameId = -1n,
		stacks = new Map()

	mod.hook('S_LOGIN', 14, event => { ({ gameId} = event) })

	mod.hook('S_ABNORMALITY_REFRESH', 2, event => {
		if(event.target !== gameId || stacks === stacks.get(event.id)) return

		stacks.set(event.id, event.stacks)
		event.source = event.target
		mod.send('S_ABNORMALITY_END', 1, event)
		mod.send('S_ABNORMALITY_BEGIN', 4, event)
		return false
	})
}