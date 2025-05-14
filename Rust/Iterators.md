<!-- markdownlint-disable -->

An Iterator is something you can loop over, like:

- `Vec`
- `HashMap`
- `HashSet`
- Ranges like `1..5`

<pre>
for x in vec {
  // Do sth
}
</pre>

All iterators implement the Iterator trait:
<pre>
pub trait Iterator {
    // Type of element
    type Item;  
    // Get next element
    fn next(&mut self) -> Option<&#8203;Self::Item>; 
}
</pre>

### How to create iterators from collections:
1. `.iter()` -> Makes an iterator of references `(&T)` -> Does not take ownership
2. `.into_iter()` -> Makes an iterator of values `(T)` -> Takes ownership 
3. `.iter_mut()` -> Gives mutable references `(&mut T)` -> You can change values


### ✅ Iterators Methods:
1. `.map()` -> Transforms each item -> returns a new iterator
2. `.filter()` -> Keeps only items that match a condition -> returns a new iterator
3. `.collect()` -> Turns the iterator into a real collection. **Without `.collect()`, all iterator chains are lazy and don’t run**
4. `.find()` ->  Finds the first item that matches a condition -> returns `Option<T>` — `Some(item)` or `None`
5. `.sum()` ->  Adds up all the values -> returns a number (you must specify the type)
6. `.any()` -> Returns `true` if at least one item matches the condition in the closure
7. `.all()` -> Returns `true` if all items match the condition in the closure
8. `.enumerate()` -> Adds index to each item -> returns `(index, item)` pairs