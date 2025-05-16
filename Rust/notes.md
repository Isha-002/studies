<!-- markdownlint-disable -->

### Delayed Assignment:  
Rust also allows you to declare a variable without immediately assigning a value to it:
<pre>
let z;
z = 15;
</pre>
---
### Variable Shadowing:
A new binding can be created in Rust by declaring a new variable with the same name as an existing one.
example of shadowing is changing the mutability of a variable:
<pre>
let mut x = 5;
let x = x; 
</pre>
---
### Constants:
Constants are immutable values that are determined at compile-time and cannot be changed during runtime. This makes them useful for values that remain constant throughout the execution of a program.

- Constants must always be typed because Rust needs to know how much space to allocate for them at compile time
- Constants can be declared in any scope
- `(const)` might use zero memory at runtime, because the compiler can replace them directly with their value in the code (called inlining)
- Constants cannot be declared inside functions

<pre>
const MAX_POINTS: u32 = 100_000;
</pre>
---
