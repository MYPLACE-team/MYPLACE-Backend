module.exports = {
  apps: [
    {
      name: 'myplace',
      script: 'server.register.js',
      instances: 1,
      exec_mode: 'fork',
      //merge_logs: true,
      autorestart: true,
      watch: true,
      // max_memory_restart: "512M",
    },
  ],
}
