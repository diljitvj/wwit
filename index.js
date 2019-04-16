"use strict";
const formatValues = ["short", "long"];
const startUnitValues = ["s", "min", "h", "d", "mon", "y"];
const maxDurations = {
	s: 60 * 1000 - 1,
	min: 60 * 60 * 1000 - 1,
	h: 60 * 60 * 24 * 1000 - 1,
	d: 60 * 60 * 24 * 30 * 1000 - 1,
	mon: 60 * 60 * 24 * 30 * 12 * 1000 - 1,
	y: 60 * 60 * 24 * 30 * 12 * 1000 * 1000 - 1
};

const durationConverstionFactor = {
	s: 1000,
	min: 1000 * 60,
	h: 1000 * 60 * 60,
	d: 1000 * 60 * 60 * 24,
	mon: 1000 * 60 * 60 * 24 * 30,
	y: 1000 * 60 * 60 * 24 * 30 * 120
};

const durationNames = {
	s: {
		long: {
			singular: "second",
			plural: "seconds"
		},
		short: {
			singular: "sec",
			plural: "sec"
		}
	},
	min: {
		long: {
			singular: "minute",
			plural: "minutes"
		},
		short: {
			singular: "min",
			plural: "mins"
		}
	},
	h: {
		long: {
			singular: "hour",
			plural: "hours"
		},
		short: {
			singular: "hr",
			plural: "hrs"
		}
	},
	d: {
		long: {
			singular: "day",
			plural: "days"
		},
		short: {
			singular: "dy",
			plural: "dys"
		}
	},
	mon: {
		long: {
			singular: "month",
			plural: "months"
		},
		short: {
			singular: "mon",
			plural: "months"
		}
	},
	y: {
		long: {
			singular: "year",
			plural: "years"
		},
		short: {
			singular: "yr",
			plural: "yrs"
		}
	}
};

/**
 * @param {Date} date Input date that needs to be humanized.
 * @param {Object} config Configuration for humanizing.
 * @param {string} [config.format=short] - Format of duration.
 * @param {string} [config.startUnit=s] - On what unit of time does the duration start.
 * @param {Date} now Reference Time against which input date is compared
 */

module.exports = function(
	date,
	config = { format: "short", startUnit: "s" },
	now = new Date()
) {
	if (!(date instanceof Date))
		throw new TypeError("Input date is not an instance of Date");

	if (!(now instanceof Date))
		throw new TypeError("Reference date is not an instance of Date");

	let { startUnit, format } = config;

	if (startUnitValues.indexOf(startUnit) === -1) {
		startUnit = "s";
	}

	if (formatValues.indexOf(format) === -1) {
		format = "short";
	}

	const nowInMs = now.getTime();
	const differenceInMs = nowInMs - date.getTime();

	let applicableDuration = null;

	Object.keys(maxDurations).every((durationKey, index, keysArr) => {
		if (differenceInMs < maxDurations[durationKey]) {
			applicableDuration =
				keysArr.indexOf(durationKey) > keysArr.indexOf(startUnit)
					? durationKey
					: startUnit;
			return false;
		}
		return true;
	});

	const durationInUnits =
		differenceInMs / durationConverstionFactor[applicableDuration];

	if (durationInUnits < 1) {
		return `less than ${applicableDuration === "h" ? "an " : "a "} ${
			durationNames[applicableDuration][format]["singular"]
		} ago`;
	}

	const durationInUnitsFloor = Math.floor(durationInUnits);

	return `${durationInUnitsFloor} ${
		durationNames[applicableDuration][format][
			durationInUnitsFloor > 1 ? "plural" : "singular"
		]
	} ago`;
};
