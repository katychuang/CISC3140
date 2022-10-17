# Reads from data.csv
# Example from class on 2/14/2022

BEGIN {
  # Splitting fields https://www.gnu.org/software/gawk/manual/html_node/Splitting-By-Content.html
  FPAT = "([^,]+)|(\"[^\"]+\")"
}

# Pattern match on fields with Column3 = Fruit
# https://www.gnu.org/software/gawk/manual/html_node/Patterns-and-Actions.html
# FNR is a Built-In Variable https://www.gnu.org/software/gawk/manual/html_node/Auto_002dset.html
$3 ~ /fruit/ {
  arr[FNR] = $2;
  print FNR, $2;
}

# Pattern match on vegetables
$3 ~ /veg/ {
  arr2[FNR] = $2; 
  print FNR, $2;
}

# skip header, match other lines
FNR > 1 { arr3[$3][FNR] = $2;}

END {
    print "\nDone reading file."
    print "\nPrinting contents of the fruit array";

    # familiar style of iteration 
    print "id string";
    for (x = 1; x <= length(arr); x++) {
        print x, arr[x]
    }
    
    print "\nPrinting contents of the vegetable array";
    print "id string";
    #another syle of iteration
    for (i in arr2)
        print i, arr2[i]
    
    # printing nested arrays
    # https://www.gnu.org/software/gawk/manual/html_node/Arrays-of-Arrays.html
    print "\nPrinting contents of array3";    
    for (i in arr3)
        print "i:" i
        for (j in arr3[i])
            print "\t"j"\t"arr3[i][j]
            
}
