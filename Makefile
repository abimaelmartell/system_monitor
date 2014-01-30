HEADERS = src/system_monitor.h src/web.h src/utils.h
OBJECTS = src/main.o src/web.o src/system_monitor.o src/utils.o
PROGRAM = system_monitor

MONGOOSE_HOME = vendor/mongoose
MONGOOSE_INC = $(MONGOOSE_HOME)
MONGOOSE_SOURCE = $(MONGOOSE_HOME)/mongoose.c

JSON_HOME = vendor/json-c
JSON_INC = $(JSON_HOME)
JSON_LIB=$(JSON_HOME)/.libs/libjson-c.a

SIGAR_HOME = vendor/sigar
SIGAR_INC = $(SIGAR_HOME)/include
SIGAR_LIB=$(SIGAR_HOME)/src/.libs/libsigar.a

LIB_TARGETS = $(JSON_LIB) $(SIGAR_LIB)

CFLAGS  = -W -Wall -I.
INC = -I$(MONGOOSE_INC) -I$(JSON_INC) -I$(SIGAR_INC)
LIBS = -ldl -lpthread $(JSON_LIB) $(SIGAR_LIB)

UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Darwin)
  LIBS += -framework IOKit -framework CoreServices
endif

.PHONY: default all clean

default: $(LIB_TARGETS) $(PROGRAM)

all: default

%.o: %.c $(HEADERS)
	gcc -c $< -o $@ $(INC)

$(PROGRAM): $(OBJECTS)
	gcc $(OBJECTS) $(MONGOOSE_SOURCE) -o $@ $(LIBS)

$(JSON_LIB):
	cd $(JSON_HOME); ./autogen.sh; ./configure; make

$(SIGAR_LIB):
	cd $(SIGAR_HOME); ./autogen.sh; ./configure; make

clean:
	-rm -f $(OBJECTS)
	-rm -f $(PROGRAM)
	cd $(SIGAR_HOME); ./autoclean.sh
	cd $(JSON_HOME); make clean
