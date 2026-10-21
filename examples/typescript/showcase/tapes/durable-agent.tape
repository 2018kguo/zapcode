Output ../../../assets/demos/durable-agent.gif
Set Height 470
Source tapes/settings.tape
Hide
Type "cd ../durable-agent && rm -f run.json && clear" Enter
Show
Type "node agent.mjs start A-17"
Sleep 400ms
Enter
Sleep 2.5s
Type "CRASH_AT=notifyCustomer node agent.mjs approve alice"
Sleep 400ms
Enter
Sleep 2.5s
Type "node agent.mjs resume"
Sleep 400ms
Enter
Sleep 4s
