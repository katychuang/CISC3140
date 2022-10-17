# Examples


# sed

* Substition
`sed 's/word1/word2/g' input.file`

  * change ; to ,
    `sed 's/;/,/g' data.csv`
  * replace ; with , in file
    `sed -i 's/;/,/g' data.csv`

# awk

* Print column 1 \
  `awk '{print $1}' <(head -n 20 sample.csv)`  defaults to Field Separator of whitespace

  with setting delimiter to \  
  `awk -F , '{print $1}' <(head -n 20 sample.csv)`  change delimiter (or field separator) to ,
  the `<( command )` structure directs the input stream similar to piping the output, i.e.  `head -n 20 sample.csv | awk -F , '{print $1}'`
* Print column 1 and 3 where year (col1) is between 1935 and 1940
  `awk -F , '$1 < 1940 && $1 > 1935 {print $1, $3}' sample.csv`

* Print movies directed by Hitchcock
  `awk -F ';' '$7 ~ /^Hitchcock/ {print $1, $3}' film.csv`

* Run a program file
  `awk -f prog1.awk film.csv`
  because you have the shebang line in that file with -f flag, you can set it to executable `chmod +x prog1.awk` and run as an executable script, `./prog1.awk film.csv`

* An awk program file that contains functions (see prog3.awk)

# Data

Data sample is from https://perso.telecom-paristech.fr/eagan/class/igr204/datasets
