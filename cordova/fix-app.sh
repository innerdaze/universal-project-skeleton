adb shell "pm uninstall ${1}; rm -rf /data/app/${1}-*; su -c 'rm -rf /data/app-lib/${1}-*'"
exit 0
