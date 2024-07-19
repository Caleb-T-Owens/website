const fontSizeSelectorInputs = document.querySelectorAll<HTMLInputElement>(
	'#font-size-selector input[name="font-size"]',
)

const html = document.querySelector("html")!

const initialFontSize =
	window.localStorage.getItem("selected-font-size") || "medium"

const sizeClasses = {
	small: "font-small",
	medium: "font-medium",
	large: "font-large",
}

for (const radioButton of fontSizeSelectorInputs) {
	if (radioButton.value === initialFontSize) {
		radioButton.checked = true

		html.classList.add(
			sizeClasses[radioButton.value as "small" | "medium" | "large"],
		)
	}

	radioButton.addEventListener("change", (event) => {
		if (radioButton.checked) {
			window.localStorage.setItem("selected-font-size", radioButton.value)

			for (const sizeClass of Object.values(sizeClasses)) {
				html.classList.remove(sizeClass)
			}

			html.classList.add(
				sizeClasses[radioButton.value as "small" | "medium" | "large"],
			)
		}
	})
}
