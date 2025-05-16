<!-- markdownlint-disable -->

`Static` and `Dynamic dispatch` are two different ways to decide which function to call when you use a method on a type

### Static Dispatch:
- Function to call is known at compile time
- Monomorphization (Turning a generic into one concrete form)
- No runtime cost (no vtable look up)
- Use generics with **trait bounds** like `T: Trait`, so the compiler monomorphizes the code at compile time

### Dynamic Dispatch:
- Function to call is known at run time
- Smaller code size 
- Run time overhead (vtable look up)
- Use **trait objects** `(dyn Trait)` and store them behind a pointer (`Box`, `&`, or `Rc`)


**Trait Object:** a value that implements a trait but its concrete type is unknown at compile time


```rust
// in static dispatch this code becomes...
fn print<T: Display>(x: T) { println!("{}", x); }

// this. rust copies the function or struct used for each type 
fn print_i32(x: i32) { ... }
fn print_str(x: &str) { ... }
```

```rust
// - we cant store dyn Trait directly
// - You can’t store something with unknown size on the stack
// - Using "dyn Trait" means:
// - Some unknown-sized type that implements this trait
// - Solution?
// - We use 2 pointers (fat pointer): 
// - 1. reference to the value (8 bytes)
// - 2. a pointer to the vtable (8 bytes)
// - With this solution we always have a fat pointer of 16 bytes size
// - No more unknown size. Happy ending!
fn make_speak(animal: &dyn Animal) {
    animal.speak();  
}
```