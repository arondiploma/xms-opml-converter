//PM2 config
module.exports = {
    apps: [
        {
            name: "myapp",
            script: "./dist/bin/www.js",
            watch: true,
            env: {
                "NODE_ENV": "production",
                "PORT": 300,
            }
        }
    ]
}