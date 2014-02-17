HEADERS = src/system_monitor.h src/web.h src/utils.h
OBJECTS = src/main.o src/web.o src/system_monitor.o src/utils.o src/resources.o
PROGRAM = system_monitor
BINDIR = /usr/local/bin

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
LIBS = -lpthread $(JSON_LIB) $(SIGAR_LIB)

UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Darwin)
	LIBS += -framework IOKit -framework CoreServices
endif

ifeq ($(UNAME_S),FreeBSD)
	LIBS += -lkvm
endif

.PHONY: default all clean

default: $(LIB_TARGETS) $(PROGRAM)

all: default

%.o: %.c $(HEADERS)
	gcc -c $< -o $@ $(INC)

$(PROGRAM): resources $(OBJECTS)
	gcc $(OBJECTS) $(MONGOOSE_SOURCE) -o $@ $(LIBS)

concat_css:
	cat public/css/vendor/bootstrap.css \
	    public/css/vendor/jquery.dynatable.css \
	    public/css/main.css \
	  > public/assets/app.css

concat_js:
	cat public/js/vendor/jquery.js \
	    public/js/vendor/bootstrap.js \
	    public/js/vendor/underscore.js \
	    public/js/vendor/jquery.dynatable.js \
	    public/js/utils.js \
	    public/js/stats.js \
	    public/js/app.js \
	  > public/assets/app.js

resources: concat_js concat_css
	perl scripts/mkdata.pl public/index.html public/assets/app.js public/assets/app.css > src/resources.c

$(JSON_LIB):
	cd $(JSON_HOME); ./autogen.sh; ./configure; make

$(SIGAR_LIB):
	cd $(SIGAR_HOME); ./autogen.sh; ./configure; make

clean-vendors:
	cd $(SIGAR_HOME); ./autoclean.sh
	cd $(JSON_HOME); make clean

clean:
	-rm -f $(OBJECTS)
	-rm -f $(PROGRAM)
	-rm -f public/assets/*

install: $(PROGRAM)
	install -C $(PROGRAM) $(BINDIR)/$(PROGRAM)

uninstall:
	rm $(BINDIR)/$(PROGRAM)
