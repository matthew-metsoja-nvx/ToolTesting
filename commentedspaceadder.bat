# Windows batch portion (lines 1-12)
# This section allows the script to run on both old and new Windows versions
# It checks if Perl is installed and available in the PATH

# Perl script portion starts here
use strict;      # Enforces strict variable declarations
use warnings;    # Enables warning messages

sub init{
    my $output = '';  # Initialize empty string to store modified content
    
    print('filename with locations: '); # Prompt user for input file
    my $locs = <>;                      # Read filename from standard input
    $locs = &trim($locs);               # Remove leading/trailing whitespace
    
    # Open input file for reading
    open FILE,"<$locs" or die $!;
    
    while(my $line = <FILE>){           # Read file line by line
        $line =~ m/^(\d+)/m;            # Check if line starts with numbers
        if($1){                         # If numbers found at start
            my $num = $1;
            if(length($line) == 128){   # If line is exactly 128 characters
                $line =~ s/^(\d+)/$1 /m;  # Add space after the number
                $output .= $line;
            }else{
                $output .= $line;       # Keep line unchanged if not 128 chars
            }
        }else{
            $output .= $line;           # Keep line unchanged if no leading numbers
        }
    }
    close FILE;

    # Write modified content back to the same file
    open FILE,">$locs" or die $!;
    print FILE $output;
    close FILE;
}

# Helper function to remove whitespace
sub trim{
    my $str = shift;                    # Get input string
    $str =~ s/^\s+//g;                 # Remove leading whitespace
    $str =~ s/\s+$//g;                 # Remove trailing whitespace
    $str;                              # Return trimmed string
}

&init;                                 # Call the main function
__END__                               # End of Perl code
:endofperl                            # End of batch file