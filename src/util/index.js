const mapToEnterPress = (self, enterFunction, otherfunction) => {
	return e => {
		if ((e.keyCode || e.which) == 13){
			(enterFunction.bind(self))();
		} else if (!!otherfunction) {
			(otherfunction.bind(self))();
		}
	}
}

const roundToDecimalPlaces = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);

export {
	mapToEnterPress,
	roundToDecimalPlaces
}
