# Types of Instructions

- Arithmetic and Logical Instructions
- Data Movement Instructions
- Control Transfer Instructions

<br><br><br>

### Arithmetic and Logical Instructions

1. Arguments must have the same size
2. When no register is involved we must explicitly define the size (immediate values must have defined size)
3. <b>You cannot reference a memory address in an instruction more than once</b>  
 
<pre>
ADD [add1], [add2] ; incorrect  

MOV EAX, [add2]  ; correct
ADD [add1], EAX
</pre>


`ADD <d>, <s>`  
`SUB <d>, <s>`  
`INC <d> + 1`