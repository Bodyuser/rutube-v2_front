export const formatSecondsToMMSS = (second: number) => {
  const dateObj = new Date(
		second * 1000
  )
  if (second * 1000 >= 3600000) {
    const hours = dateObj.getUTCHours()
		const minutes =
			dateObj.getUTCMinutes()
		const seconds = dateObj.getSeconds()

		return hours
				.toString()
				.padStart(2, "0") +
			":" +
			minutes
				.toString()
				.padStart(2, "0") +
			":" +
			seconds
				.toString()
				.padStart(2, "0")
  }

	const minutes =
		dateObj.getUTCMinutes()
	const seconds = dateObj.getSeconds()

	return (
		minutes
			.toString()
			.padStart(2, "0") +
		":" +
		seconds.toString().padStart(2, "0")
	)
}