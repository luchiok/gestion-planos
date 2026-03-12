@echo off

cd backend

start /B node server.js

timeout /t 1 >nul

start http://localhost:3000