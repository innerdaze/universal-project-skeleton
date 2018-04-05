
call cross-env NODE_TARGET=device cross-env CORDOVA=true npm run build:cordova:dev
call yarn cordova:link
call cd cordova && cordova build android --device && ^
adb uninstall uk.co.orbistech.mstock && adb install platforms/android/build/outputs/apk/android-debug.apk
