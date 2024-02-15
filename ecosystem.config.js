module.exports = {
  apps: [
    {
      name: 'myplace',
      script: 'server.register.js',
      instances: 1,
      exec_mode: 'fork',
      ignore_watch: ['node_modules', 'logs', '.git'],
      log_date_format: 'YYYY-MM-DD HH:mm',
      output: 'logs/pm2/myplace.ouput.log',
      error: 'logs/pm2/myplace.error.log',
      //merge_logs: true,
      autorestart: true,
      watch: true,
      // max_memory_restart: "512M",
    },
  ],
}
