@echo off
REM Save the current path to a variable
set currentPath=%cd%

REM Open the first terminal and run 'npm run dev'
start cmd /k "cd /d %currentPath% && npm run dev"

REM Open the second terminal, navigate to 'backend' and run 'php artisan serve'
cmd /k "cd /d %currentPath%\backend && php artisan serve"