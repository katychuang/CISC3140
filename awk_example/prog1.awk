#! /usr/bin/awk -f

# print a string before reading input file
BEGIN { print "Starting to read" 
        OFS=";"
      }

# action for every line of input file
      { print $1, $2 }

# print a string at the end of reading input file
END   { print "Finished reading" }
