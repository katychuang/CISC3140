BEGIN { FS=";" }

NR < 10 { print $1, $3 }


