
### Byte (8 bits):

-  Size: 1 byte
-  Range (unsigned): 0 to 255
-  Range (signed): -128 to 127
-  Assembly directive: db (define byte)
-  Registers: AL, BL, CL, DL, AH, BH, CH, DH


### Word (16 bits):

-  Size: 2 bytes
-  Range (unsigned): 0 to 65,535
-  Range (signed): -32,768 to 32,767
-  Assembly directive: dw (define word)
-  Registers: AX, BX, CX, DX, SI, DI, BP, SP


### Double Word (32 bits)

-  Size: 4 bytes
-  Range (unsigned): 0 to 4,294,967,295
-  Range (signed): -2,147,483,648 to 2,147,483,647
-  Assembly directive: dd (define double word)
-  Registers: EAX, EBX, ECX, EDX, ESI, EDI, EBP, ESP


### Quad Word (64 bits)

-  Size: 8 bytes
-  Assembly directive: dq (define quad word)
-  Used for: Large integers, double-precision floats, pointers in 64-bit mode