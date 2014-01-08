HEADERS = src/system_stats.h src/web.h
OBJECTS = src/main.o src/web.o
PROGRAM = system_stats
LIBS    = -lmicrohttpd

default: $(PROGRAM)

%.o: %.c $(HEADERS)
	gcc -c $< -o $@

$(PROGRAM): $(OBJECTS)
	gcc $(OBJECTS) -o $@ $(LIBS)

clean:
	-rm -f $(OBJECTS)
	-rm -f $(PROGRAM)
