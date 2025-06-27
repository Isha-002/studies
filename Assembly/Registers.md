
### General Purpose Registers

- `EAX` (Accumulator) → <i>Used for arithmetic operations and function return values</i>   
  `AX` (lower 16 bits)  
  `AH` (upper 8 bits of AX)  
  `AL` (lower 8 bits of AX)

- `EBX` (Base) → <i>Often used as a base pointer for memory access</i>  
  `BX`  
  `BH`  
  `BL` 

- `ECX` (Counter) → <i>Commonly used for loop counters</i>  
  `CX`  
  `CH`  
  `CL`  

- `EDX` (Data) → <i>Used in arithmetic operations, especially multiplication/division</i>  
  `DX`  
  `DH`  
  `DL`  

- `ESI` (Source Index) → <i>Used for string operations and as a source pointer</i>  
  `SI`

- `EDI` (Destination Index) → <i>Used for string operations and as a destination pointer</i>
  `DI`

- `EBP` (Base Pointer) → <i>Points to the base of the current stack frame</i>  
  `BP`

- `ESP` (Stack Pointer) → <i>Points to the top of the stack</i>  
  `SP`


### Special Purpose Registers

- `EIP` (Instruction Pointer) → <i>Contains the address of the next instruction to execute</i>  
  - Automatically incremented after each instruction fetch
  - Only modified by jumps, calls, returns, and interrupts
  - You can't directly modify EIP


- `EFLAGS` → <i>A 32-bit register where each bit represents a different processor state or condition</i>

  - <b>bit 6 - Zero Flag (ZF):</b> Set to 1 when an operation results in zero - Set to 0 when result is non-zero  

  - <b>bit 0 - Carry Flag (CF): </b> Set when arithmetic operation generates a carry/borrow - Used for unsigned arithmetic overflow

  - <b>bit 7 - Sign Flag (SF): </b> Set to 1 if result is negative (most significant bit = 1) - Set to 0 if result is positive

  - <b>bit 11 - Overflow Flag (OF): </b> Set when signed arithmetic overflows

  - <b>bit 2 - Parity Flag (PF): </b> Set if the low 8 bits of result contain an even number of 1s - Rarely used in modern programming

  - <b>bit 10 - Direction Flag (DF): </b> Controls string operation direction:  
    `DF = 0:` process strings forward (increment)  
    `DF = 1:` process strings backward (decrement)  

  - <b>bit 9 - Interrupt Flag (IF): </b> Controls whether CPU responds to maskable interrupts - Critical for system programming





### Segment Registers

- `CS` (Code Segment) → Points to code segment
- `DS` (Data Segment) → Points to data segment
- `ES`, `FS`, `GS` → Extra segment registers
- `SS` (Stack Segment) → Points to stack segment

→ <i></i>


