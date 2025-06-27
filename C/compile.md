<!-- markdownlint-disable -->

### gcc compile:

1. compile: ``gcc file.c``
2. change output name: ``gcc -o file file.c``
4. multiple file compile: ``gcc main.c file.c``
5. compile to object file: ``gcc -c main.c``
6. generate assembly code: ``gcc -S file.c``
7. shows preprocessor output: ``gcc -E file.c``
---
Optimization Flags:  
* No optimization: ``-O0`` 
* Level 1, 2, or 3 optimizations: ``-O1`` / ``-O2`` / ``-O3``
* Optimize for size: ``-Os``
* Aggressive optimizations (may break standards compliance): ``-Ofast``
* Optimize for debugging: ``-Og``
* Enable Link-Time Optimization: ``-flto``
---
Warnings & Errors Flag: 
* Enable most common warnings: ``-Wall``
* Disable all warnings: ``-w``
* Enable additional warnings: ``-Wextra``	
* Warn about implicit type conversions: ``-Wconversion``
* Warn if a variable shadows another: ``-Wshadow``	
---
Debugging & Profiling Flags:
* Generate debug symbols (for GDB): ``-g``
* Include macros in debug info: ``-g3``
* Show enabled optimizations: ``-Q --help=optimizers``
---
Libraries & Linking Flags:
* Link a library: ``-l<library>``
* Link libraries statically: ``-static``
---
Language Standards Flags: 
* Use C11 standard: ``-std=c11``
* Use GNU dialect of C11: ``-std=gnu11``
---
Architecture & Platform Flags: 
* Compile for 32-bit or 64-bit architecture: ``-m32`` / ``-m64``
* Target specific CPU: ``-march=<arch>``
* Optimize for a specific CPU: ``-mtune=<cpu>``	
* Enable CPU-specific instruction sets: ``-maes`` / ``-msse4.2``
---
Other Flags: 
* Save intermediate files: ``-save-temps``
* Verbose output: ``-v``
* Do not use standard system libraries: ``-nostdlib``
