import { writeFileSync, mkdirSync, rmSync, existsSync } from "fs"
import { glob } from "glob"
import { renderFile } from "ejs"
import { compile } from "sass-embedded"

console.log("Clearing build directory")

if (existsSync("./output")) {
	rmSync("./output", { recursive: true })
	mkdirSync("./output")
}

console.log("Rendering HTML")

const pages = glob.globSync("src/**/*.page.ejs")

pages.forEach((pagePath) => {
	renderFile(pagePath, (error, result) => {
		if (error) {
			console.error(`Failed to render page ${pagePath}`, error)
		}

		const newPath = pagePath
			.replace(/\.page\.ejs$/, ".html")
			.split("/")
			.slice(1)
			.join("/")
		const directory = pagePath.split("/").slice(1, -1).join("/")

		mkdirSync(`./output/${directory}`, { recursive: true })
		writeFileSync(`./output/${newPath}`, result)
		console.log(`Wrote ./output/${newPath} successfully`)
	})
})

console.log("Rendering SCSS")

const stylesheets = glob.globSync("src/**/*.page.scss")

stylesheets.forEach((stylesheetPath) => {
	try {
		const result = compile(stylesheetPath)

		const newPath = stylesheetPath
			.replace(/\.page\.scss$/, ".css")
			.split("/")
			.slice(1)
			.join("/")
		const directory = stylesheetPath.split("/").slice(1, -1).join("/")

		mkdirSync(`./output/${directory}`, { recursive: true })
		writeFileSync(`./output/${newPath}`, result.css)
		console.log(`Wrote ./output/${newPath} successfully`)
	} catch (error) {
		console.error(`Failed to render stylesheet ${stylesheetPath}`, error)
	}
})
