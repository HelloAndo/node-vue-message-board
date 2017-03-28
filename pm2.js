var pm2 = require('pm2')

pm2.connect(function(err) {
    if (err) {
        console.log(err)
        process.exit(2)
    }

    pm2.start({
        script: 'bin/www.js',
        exec_mode: 'cluster',
        instances: 4,
        max_memory_restart: '100M'
    }, function(err, apps) {
        pm2.disconnect()
        if (err) throw err
    })
})