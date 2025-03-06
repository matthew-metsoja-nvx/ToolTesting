@rem = '--*-Perl-*--
@echo off
if "%OS%" == "Windows_NT" goto WinNT
perl -x -S "%0" %1 %2 %3 %4 %5 %6 %7 %8 %9
goto endofperl
:WinNT
perl -x -S %0 %*
if NOT "%COMSPEC%" == "%SystemRoot%\system32\cmd.exe" goto endofperl
if %errorlevel% == 9009 echo You do not have Perl in your PATH.
if errorlevel 1 goto script_failed_so_exit_with_non_zero_val 2>nul
goto endofperl
@rem ';
#!perl -w
#line 15
use strict;
use warnings;

sub init{
	my $output = '';
	print('filename with locations: ');
	my $locs = <>;
	$locs = &trim($locs);

	open FILE,"<$locs" or die $!;
	while(my $line = <FILE>){
		$line =~ m/^(\d+)/m;
		if($1){
			my $num = $1;
			if(length($line) == 128){
				$line =~ s/^(\d+)/$1 /m;
				$output .= $line;
			}else{
				$output .= $line;
			}
		}else{
			$output .= $line;
		}
	}
	close FILE;

	open FILE,">$locs" or die $!;
	print FILE $output;
	close FILE;
}

sub trim{
	my $str = shift;
	$str =~ s/^\s+//g;
	$str =~ s/\s+$//g;
	$str;
}

&init;
__END__
:endofperl
