@echo off
setlocal

:: PostgreSQL connection settings
set PGHOST=localhost
set PGPORT=5432
set PGDATABASE=suitup
set PGUSER=postgres
set PGPASSWORD=arsene01102000

@REM  the data input section for database type and the file path directory
echo.
echo Select SQL directory:
echo 1. mysql
echo 2. postgresql
set /p CHOICE=Enter 1 or 2: 
set /p FILE_PATH_DIR=Enter file name:

echo.
echo Executing SQL files from:
echo %FILE_PATH_DIR%
echo.

@REM  the loop to execute every file in the provided path
for %%F in ("%FILE_PATH_DIR%\*.sql") do (
    echo Running %%~nxF...

    if "%CHOICE%"=="1" (
        mysql -u %MYSQLUSER% -p %MYSQLPASSWORD% -D %MYSQLDATABASE% < "%%F"
    ) else if "%CHOICE%"=="2" (
        psql -U %PGUSER% -d %PGDATABASE% -f "%%F"
    )

    if errorlevel 1 (
        echo Error executing %%~nxF
        exit /b 1
    )
)

echo.
echo All SQL files executed successfully.
pause