import moment from 'moment';

const mapToEnterPress = (self, enterFunction, otherfunction) => {
	return e => {
		if ((e.keyCode || e.which) == 13){
			(enterFunction.bind(self))();
		} else if (otherfunction) {
			(otherfunction.bind(self))();
		}
	};
};

const roundToDecimalPlaces = (value, decimals) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);

const sortPunches = (a,b) => moment(b.punchDate).format('x') - moment(a.punchDate).format('x');

var ArrayIterator = function(arr) {
	var i=0;
	this.hasNext = () => (i<arr.length);
	this.currentIndex = () => i-1;
	this.next = () => {
		if (i < arr.length) return arr[i++];
		else return null;
	};
};

export {
	mapToEnterPress,
	roundToDecimalPlaces,
	sortPunches,
	ArrayIterator
};
