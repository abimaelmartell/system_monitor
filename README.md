# System Monitor
A multi-platform system monitor, it shows memory usage, cpu usage, file systems, processes and network interfaces through a web interface.

## System Support
Tested on the following systems:
- Linux
- FreeBSD
- OSX

## Dependencies
System Monitor uses the following libraries to work.
- [sigar](https://github.com/hyperic/sigar), to collect the system's data.
- [mongoose](https://github.com/cesanta/mongoose), to serve the user interface.
- [json-c](https://github.com/json-c/json-c), to share the data between the client and the server.

## Installing
First install the dependencies, then run `make`, this will compile all the sources. To start the web server, run `./system_monitor`, that will start the server on port 3000.
