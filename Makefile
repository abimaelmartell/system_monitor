HEADERS = src/system_stats.h src/web.h src/utils.h
OBJECTS = src/main.o src/web.o src/system_stats.o src/utils.o
PROGRAM = system_stats

MONGOOSE_HOME = vendor/mongoose
MONGOOSE_INC = $(MONGOOSE_HOME)
MONGOOSE_SOURCE = $(MONGOOSE_HOME)/mongoose.c

CFLAGS  = -W -Wall -I. -I$(MONGOOSE_INC)
INC = -I$(MONGOOSE_INC)
LIBS = -lsigar -ljson-c -ldl -lpthread

default: $(PROGRAM)

%.o: %.c $(HEADERS)
	gcc -c $< -o $@ $(INC)

$(PROGRAM): $(OBJECTS)
	gcc $(OBJECTS) $(MONGOOSE_SOURCE) -o $@ $(LIBS)

clean:
	-rm -f $(OBJECTS)
	-rm -f $(PROGRAM)
