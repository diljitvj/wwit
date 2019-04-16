const wwit = require("./index.js");

test("Invalid date should throw an error", () => {
	const passStringValueFn = () => {
		wwit("");
	};

	const passNumberFn = () => {
		wwit(123);
	};

	const passStringValueForNowFn = () => {
		wwit(new Date(), {}, "");
	};

	const passNumberForNowFn = () => {
		wwit(new Date(), {}, 123);
	};

	// Any date value other than an instane of Date object should throw a type error

	expect(passStringValueFn).toThrowError(TypeError);
	expect(passNumberFn).toThrowError(TypeError);
	expect(passStringValueForNowFn).toThrowError(TypeError);
	expect(passNumberForNowFn).toThrowError(TypeError);
});

test("Incorrect config values should be resolved", () => {
	const invalidConfigKeys = {
		someKey: "someValue"
	};
	const incorrectConfigValues = {
		format: "Extra long"
	};

	const expectedOutput = "less than a sec ago";

	// In case of invalid config keys, invalid config values, undefined or null config the library should work as expected

	expect(wwit(new Date(), invalidConfigKeys)).toBe(expectedOutput);
	expect(wwit(new Date(), incorrectConfigValues)).toBe(expectedOutput);
	expect(wwit(new Date(), undefined)).toBe(expectedOutput);
	expect(wwit(new Date(), null)).toBe(expectedOutput);
});

test("Less than one durations", () => {
	const now = new Date(); // less than a minute

	expect(wwit(now, { format: "short", startUnit: "s" })).toBe(
		"less than a sec ago"
	);

	const nowMinus59Secs = new Date(new Date().getTime() - 59 * 1000); // less than a minute
	expect(wwit(nowMinus59Secs, { format: "short", startUnit: "min" })).toBe(
		"less than a min ago"
	);

	const nowMinus59Minutes = new Date(new Date().getTime() - 59 * 60 * 1000); // less than an hour
	expect(wwit(nowMinus59Minutes, { format: "short", startUnit: "h" })).toBe(
		"less than an hr ago"
	);

	const nowMinus23Hours = new Date(new Date().getTime() - 23 * 60 * 60 * 1000); // less than a day
	expect(wwit(nowMinus23Hours, { format: "short", startUnit: "d" })).toBe(
		"less than a dy ago"
	);
});

test("Format should change based on the config object passed", () => {
	const date = new Date(new Date().getTime() - 10 * 1000);

	expect(wwit(date, { format: "short" })).toBe("10 sec ago");
	expect(wwit(date, { format: "long" })).toBe("10 seconds ago");
});

test("Unit should change based on the time and start unit", () => {
	const nowMinus23Hours = new Date(new Date().getTime() - 23 * 60 * 60 * 1000); // less than a day

	expect(wwit(nowMinus23Hours, { format: "short", startUnit: "s" })).toBe(
		"23 hrs ago"
	);

	expect(wwit(nowMinus23Hours, { format: "short", startUnit: "min" })).toBe(
		"23 hrs ago"
	);

	expect(wwit(nowMinus23Hours, { format: "short", startUnit: "h" })).toBe(
		"23 hrs ago"
	);

	expect(wwit(nowMinus23Hours, { format: "short", startUnit: "d" })).toBe(
		"less than a dy ago"
	);
});
