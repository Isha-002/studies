<!-- markdownlint-disable -->

Type of functions:  
1. Named functions
2. Anonymous functions / Closures

```rust
fn add(value: u8) -> u8 {
  value + 2
}
```
```rust
let b: fn(u8) -> u8 = add;

let c: fn(u8) -> u8 = |x: u8| x + 2;

let d: impl Fn(&u8) -> u8 = |&x: u8| x + 2;

let mut d: impl FnMut(&mut u8) -> u8 = |&mut x: u8| x + 2;

let d: impl FnOnce(u8) -> u8 = |x: u8| x + 2;
```
`b` and `c` are **function pointers**:
- A function pointer is a type that stores the address of a function so you can call it later
- A function pointer occupies `8 bytes` of memory
- Closures can capture environment, but non-capturing closures can be **coerced** to function pointers

---
### Closure traits: 
Closures implement `Fn`, `FnMut`, `FnOnce` traits depending on how they capture variables
- `Fn` -> Only immutably borrows values
- `FnMut` -> Can mutably borrow values
- `FnOnce` -> Takes ownership of captured values
---
### Higher-Order Functions:
Take or returns a function as an argument 

```rust
fn make_multiplier(multiplier: i32) -> impl Fn(i32) -> i32 {
    move |x| x * multiplier
}

let times_three = make_multiplier(3);
println!("{}", times_three(4));
```

### Returning Closures from Functions:
- `impl Fn...` if returning a single closure
- `Box<dyn Fn...>` if returning different closures  

we do this because closures have anonymous types 