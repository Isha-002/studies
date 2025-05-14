<!-- markdownlint-disable -->

# HashMap<K, V>: 
Stores key-value pairs with O(1) average operations

### ✅ Methods:
- `insert(k, v)` – Add or update a key with value
- `get(k)` – Get value by key. Returns Option<&V>
- `remove(k)` – Delete a key-value
- `contains_key(k)` – Check if key exists
- `entry(k).or_insert(v)` – Insert if key doesn’t exist
- `keys()` – Get iterator over keys
- `values()` – Get iterator over values
- `iter()` – Loop through (key, value) pairs


# HashSet<&#8203;T>:
Stores only unique values  
No order  
Fast for lookup, insert, delete  
Can do set operations  
USE when: 
1. You want unique items
2. You don’t care about order
3. You need fast checking

### ✅ Methods:
- `insert(v)` – Add a value (no duplicates)
- `remove(v)` – Remove a value
- `contains(v)` – Check if value exists
- `is_empty()` – Check if set is empty
- `len()` – Number of values in the set
- `iter()` – Loop through values

### 📍Set Operations (HashSet):
- `union(&other)` All unique values from both sets
- `intersection(&other)` Only values that exist in both sets
- `difference(&other)` Values in this set only, not in the other
- `symmetric_difference(&other)` Everything but the common values between two sets