const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	poweredByHeader: false,
	sassOptions: {
		includePaths: [
			path.join(
				__dirname,
				"src/assets/styles"
			),
		],
	},
	env: {
		API_URL: process.env.API_URL,
		CLIENT_ID: process.env.CLIENT_ID,
		APP_ID: process.env.APP_ID,
	},
	async rewrites() {
		return [
			{
				source: "/uploads/:path*",
				destination: `${process.env.API_URL}/uploads/:path*`,
			},
		]
	},
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"pic.rutubelist.ru",
		],
	},
}

module.exports = nextConfig
