const modules = [
	require('./newTask'),
	require('./existingTask'),
	require('./getPunches'),
	require('./updatePunch'),
	require('./deletePunch'),
	require('./enterTime'),
	require('./unenterTime'),
	require('./getUnenteredDays')
];

const actionCreatorModules = modules.reduce((actionCreators, mod) => {
	actionCreators[mod.name] = mod.actionCreator;
	return actionCreators;
}, {});

const reducerModules = modules.reduce((reducers, mod) => {
	return Object.assign(mod.reducer, reducers);
}, {});

export default {
	actionCreatorModules,
	reducerModules
};
