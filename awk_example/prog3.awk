BEGIN { print "Show movies between 1935 and 1940"
    FS=";" }

$1 < 1940 && $1 > 1935 {
  myfunc($3,$1)
}

function myfunc(X, year){
  # print $3 "("$1")" 
  print $X
# $  print $X "("$year")" 
}
