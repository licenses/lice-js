====
lice-js
====

A javascript port of [lice](https://github.com/licenses/lice-python) originally by [jcarbaugh](https://github.com/jcarbaugh) 

>Lice generates license files. No more hunting down licenses from other projects.


Installation
------------

    npm install licejs

or:

    git clone git@github.com:licenses/lice-js.git
    cd lice-js
    


Overview
--------

Generate a BSD-3 license, the default:

    $ lice
    Copyright (c) 2013, Jeremy Carbaugh

    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification,
    ...

Generate an MIT license:

    $ lice mit
    The MIT License (MIT)
    Copyright (c) 2013 Jeremy Carbaugh

    Permission is hereby granted, free of charge, to any person obtaining a copy
    ...


Generate an apache license header , specifying the year and organization to be used:

```
 $ licejs gpl3 -y 2013 -o "aplomb bomb inc" -p "mySuperProjectName" --header
mySuperProjectName
Copyright (C) 2013  aplomb bomb inc

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
...
```


##Defaults  

If no arguments are provided for available variables, the following will be used:

| Variable      		| Default 				| 
| --------------------	|--------------------:	| 
| owner / organization 	| git user.name || $USER env variable | 
| year     				| current year			| 
| project				| current working directory|
| license type			| bsd3 					|

You can change any of these by using `--config` in the cli:

```
licejs --config.organization "The Interesing Co."
```
then if you want an MIT license for example:

```
$ lice mit
The MIT License (MIT)
Copyright (c) 2013 The Interesing Co.

Permission is hereby granted, free of charge, to any person obtaining a copy
...

```

The Cli will check the config file first. Then if no value is found for a particular key it will get the values specified in table above.  



I want XXXXXXXXX license in here!
---------------------------------

Great! Is it a license that is commonly used? If so, open an issue or, if you are feeling generous, fork and submit a pull request in the [license-templates](https://github.com/licenses/license-templates) repo.


Usage
-----


```
Usage: license [-h]
license [-l]
license [ -o [OWNER] -p [PROJECT] -y [YEAR] ] [license] [--header]
license [--config[.key <VALUE>]]

Options:
  -h, --help          show this help menu                                                                                     
  -l, --list          list all available license templates                                                                    
  -o, --organization  the organisation/owner that holds the copy[right,left]
  -p, --project       the name of the project
  -y, --year          copyright year 
  --config            set default values: usage --config.key value
  	available:[year], [project], [licenseType], [organisation]
  --header            just get the license header
  
```

## TODO:
- Error handling.
- Unit testing.
- Include [license-templates](https://github.com/licenses/license-templates) as submodule.
- suggestions?

Changelog
---------

**0.1**

* Initial release