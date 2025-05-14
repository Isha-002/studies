<!-- markdownlint-disable -->

# My compiler notes

compiler is a program that can read a program in one
language and translate it into an equivalent program in another language

---
### interpreter
Another common kind of language processor.  
Instead of producing a target program as a translation, an interpreter appears to directly execute the operations in the source program

compiled vs interpreted:  
*  program produced by a compiler is usually much faster
*  interpreter can usually give better error diagnostics  
(because it executes the source program statement by statement)

---
### preprocessor
A source program may be divided into modules stored in separate files. The task of collecting the source program is sometimes entrusted to a separate program, called a preprocessor  
The preprocessor can replace shortcuts, called macros, with full code statements before the program is compiled

### compiling process
1. Source program is given to a compiler  

2. The compiler may produce an assembly-language program as its output
3. The assembly language is then processed by a program called an assembler that produces <u>**relocatable**</u> machine code as its output  
4. Large programs are often compiled in pieces, so the relocatable machine code may have to be linked together with other relocatable object files and library files into the code that actually runs on the machine  
5. The linker connects different pieces of code and figures out where everything is in memory
6. The loader then puts together all of the executable
object files into memory for execution

---
* Compiler = translate first, run later  
* Interpreter = translate while running

---
* A compiler that translates a high-level language into
another high-level language is called a source-to-source translato  

# Phases of a compiler
1. Lexical Analysis  
2. Syntax Analysis
3. Semantic Analysis
4. Intermediate Code Generator
5. Machine-Independepnt Code Optimization 
6. Code Generator
7. Machine-Dependent Code Optmization

---
### 1. Lexical Analysis / scanning :
* The first phase of a compiler
* Reads the stream of characters
* Groups the characters into meaningful sequences (lexemes)
* For each lexeme, Lexical Analyzer produces a token  

**<token-name, attribute-value>**  
Example: position = initial + rate * 60  
Tokens:  
* <id, 1>  
* <=>  
* <id, 2>  
* <+>  
* <id, 3>  
* <*>  
* <60>  

These tokens are passed to Syntax Analyzer  

---
### 2. Syntax Analyzer / parser :
The parser takes the beginning parts of the tokens and builds a tree-like structure that shows how the code is represented based on grammar rules.

---
### 3. Semantic Analysis : 
Uses the syntax tree and the information
in the symbol table to check the source program for semantic
consistency with the language definition  
It also gathers type information and saves it in either the syntax tree or the symbol table  
An important part of semantic analysis is **type checking**
* language specification may permit some type conversions (coercions):  
 *A binary arithmetic operator may be applied to either a pair of integers or to a pair of floatingpoint numbers. If the operator is applied to a floating-point number and an integer, the compiler may convert or coerce the integer into a floating-point number*

---
### 4. Intermediate Code Generation :  
In the process of translating a source program into target code, a compiler may construct one or more intermediate representations, which can have a variety of forms  
*Syntax trees are a form of intermediate representation, they are commonly used during syntax and semantic analysis*  

After syntax and semantic analysis of the source program, many compilers generate an explicit low-level or machine-like intermediate representation. This intermediate representation should have two important properties :  
* it should be easy to produce
* it should be easy to translate into the target machine

---
### 5. Code Optimization :  
The machine-independent code-optimization phase attempts to improve the intermediate code

---
### 6. Code Generation : 
The code generator takes as input an intermediate representation and maps it into the target language. If the target language is machine code, **registers** or **memory locations** are selected for each of the variables used by the program. Then, the intermediate instructions are translated into sequences of machine instructions that perform the same task

---
### 7. Symbol-Table Management :
An essential function of a compiler is to record the variable names used in the source program and collect information about various attributes of each name (storage allocated, type, scope, etc)  

The symbol table is a data structure containing a record for
each variable name with fields for the attributes of the name

---
79-1.3






